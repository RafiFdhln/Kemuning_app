import { Drawer, Box, Typography, Divider, Table, TableBody, TableCell, TableHead, TableRow, Button, Checkbox, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import { currencyId } from "../lib/quotationCalc";
import { baselightTheme } from "../src/theme/DefaultColors";
import BasicInput from "./BasicInput";

const QuotationDetailDrawer = ({ open, onClose, quotation, handleCreatePo }) => {
  if (!quotation) return null;
  
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState<Set<number>>(new Set());
  const [qtyByIndex, setQtyByIndex] = useState<Record<number, number>>({});
  const [poPriceByIndex, setPoPriceByIndex] = useState<Record<number, number>>({});
  const [poNumber, setPoNumber] = useState("");

  const { totalQuotationPrice } = useMemo(() => {
    const totalQuotation = quotation.items?.reduce((sum: number, item: any) => 
        sum + (Number(item.totalPrice) || 0), 0) || 0;

    return { totalQuotationPrice: totalQuotation };
  }, [quotation.items, selectedIndexes, qtyByIndex, poPriceByIndex]);

  const allItemIndexes: Set<number> = useMemo(() => new Set<number>((quotation.items?.map((_, idx) => idx) || [])), [quotation.items]);
  const allSelected = useMemo(() => quotation.items && quotation.items.length > 0 && selectedIndexes.size === quotation.items.length, [selectedIndexes, quotation.items]);
  const someSelected = useMemo(() => selectedIndexes.size > 0 && !allSelected, [selectedIndexes, allSelected]);

  const enterSelectMode = () => {
    setSelectMode(true);
    // Preselect all items and initialize qty map from current quotation items
    const initialSelected = new Set<number>((quotation.items?.map((_, idx) => idx) || []));
    setSelectedIndexes(initialSelected);
    const initialQty: Record<number, number> = {};
    const initialPoPrice: Record<number, number> = {};
    quotation.items?.forEach((item, idx) => {
      initialQty[idx] = Number(item.qty) || 0;
      initialPoPrice[idx] = Number(item.price) || 0; // Default to quotation price
    });
    setQtyByIndex(initialQty);
    setPoPriceByIndex(initialPoPrice);
  };

  const cancelSelectMode = () => {
    setSelectMode(false);
    setSelectedIndexes(new Set<number>());
    setQtyByIndex({});
    setPoPriceByIndex({});
    setPoNumber("");
  };

  const toggleRow = (idx: number) => {
    setSelectedIndexes(prev => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIndexes(new Set<number>());
    } else {
      setSelectedIndexes(allItemIndexes);
    }
  };

  const handlePoClick = async () => {
    // First click enters select mode
    if (!selectMode) {
      enterSelectMode();
      return;
    }
    
    // Second click creates PO
    try {
      console.log('QuotationDetailDrawer - Creating PO with data:', {
        selectedIndexes: Array.from(selectedIndexes),
        qtyByIndex,
        poPriceByIndex,
        poNumber
      });
      await handleCreatePo(selectedIndexes, qtyByIndex, poPriceByIndex, poNumber);
    } catch (error) {
      console.error('Error in QuotationDetailDrawer handlePoClick:', error);
    }
  };

  const filteredItems = quotation.items?.map((item, idx) => {
    const inquiryItem = item.inquiryItem || {};
    return {
      ...item,
      name: item.name || inquiryItem.name || '-',
      qty: qtyByIndex[idx] ?? item.qty ?? inquiryItem.qty ?? 0,
      poPrice: poPriceByIndex[idx] ?? 0,
      totalPoPrice: (qtyByIndex[idx] ?? item.qty ?? inquiryItem.qty ?? 0) * (poPriceByIndex[idx] ?? 0)
    };
  }) || [];

  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: "84%", p: 4 } }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'text.main' }}>
          Detail Quotation
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: 2,
          bgcolor: 'grey.200',
          p: 3,
          borderRadius: '7px',
          mb: 3
        }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>Nomor Quotation</Typography>
            <Typography variant="body1" fontWeight={500}>{quotation.quotationNumber}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>Nomor Inquiry</Typography>
            <Typography variant="body1" fontWeight={500}>{quotation.inquiry?.requestNumber}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>Customer</Typography>
            <Typography variant="body1" fontWeight={500}>{quotation.customer?.name}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>Status</Typography>
            <Typography variant="body1" fontWeight={500}>{quotation.status}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>Keterangan</Typography>
            <Typography variant="body1" fontWeight={500}>{quotation.remarks || '-'}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>Tanggal</Typography>
            <Typography variant="body1" fontWeight={500}>
              {quotation.createdAt ? new Date(quotation.createdAt).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : '-'}
            </Typography>
          </Box>
        </Box>
        </Box>
        <Divider sx={{ mb: 3 }} />
        
        {selectMode && (
          <Box sx={{ 
            mb: 2,
            bgcolor: 'grey.200',
            p: 2,
            borderRadius: '8px'
          }}>
            <BasicInput
              label="Nomor PO"
              value={poNumber} 
              onChange={(e) => setPoNumber(e.target.value)}
              multiline={false}
              placeholder="Masukkan nomor PO"
            />
          </Box>
        )}
        <Box sx={{ 
          overflowX: 'auto',
          '& .MuiTable-root': {
            minWidth: selectMode ? 1400 : 1200,
            borderCollapse: 'separate',
            borderSpacing: '0 8px',
            table: {
              layout: selectMode ? 'fixed' : 'auto'
            }
          }
        }}>
          <Table>
            <TableHead>
              <TableRow sx={{ 
                '& .MuiTableCell-head': { 
                  fontWeight: 600,
                  bgcolor: 'primary.dark',
                  color: 'grey.100',
                  borderBottom: 'none',
                  fontSize: '12px',
                  whiteSpace: 'nowrap',
                  padding: '12px',
                }
              }}>
                {selectMode && (
                  <TableCell padding="checkbox" sx={{ borderRadius: '8px 0 0 0', py: 0}}>
                    <Checkbox
                      indeterminate={someSelected}
                      checked={allSelected}
                      onChange={toggleSelectAll}
                      sx={{
                        '&.Mui-checked': { color: 'primary.main' },
                        '&.MuiCheckbox-indeterminate': { color: 'primary.main' }
                      }}
                    />
                  </TableCell>
                )}
                <TableCell>Nama</TableCell>
                <TableCell>Waktu Pengiriman</TableCell>
                <TableCell>Catatan</TableCell>
                <TableCell align="right">Qty</TableCell>
                <TableCell>Satuan</TableCell>
                <TableCell align="right">Harga</TableCell>
                <TableCell align="right">Total Harga</TableCell>
                <TableCell align="right">HPP</TableCell>
                <TableCell align="right">UP TO%</TableCell>
                <TableCell align="right">Diskon%</TableCell>
                <TableCell>Via</TableCell>
                {selectMode && (
                  <>
                    <TableCell align="right">Harga PO</TableCell>
                    <TableCell align="right" sx={{ borderRadius: '0 8px 0 0' }}>Total PO</TableCell>
                  </>
                )}
            </TableRow>
          </TableHead>
          <TableBody>
            {quotation.items?.map((item: any, idx: number) => {
              const ii = item.inquiryItem || {};
              const nama = item.name || ii.name || '-';
              const waktuPengiriman = ii.deliveryTime ? new Date(ii.deliveryTime).toLocaleDateString() : '-';
              const catatan = item.remarks || ii.notes || '-';
              const qty = item.qty ?? ii.qty ?? 0;
              const satuan = ii.unit || '-';
              const harga = item.price || 0;
              const discountPercent = Number(item.discountPercent ?? 0) || 0;
              const discountedUnit = harga * (1 - discountPercent / 100);
              const totalHarga = item.totalPrice || (qty * discountedUnit);
              const hpp = ii.hpp || 0;
              const upToPct = ii.markupPercent || 0;
              const via = '-';
              const isSelected = selectedIndexes.has(idx);
              const poPrice = poPriceByIndex[idx] || 0;
              const totalPo = qty * poPrice;
              
              return (
                <TableRow 
                  key={idx}
                  sx={{
                    '& .MuiTableCell-root': {
                      borderBottom: '1px solid',
                      borderColor: 'grey.300',
                      py: 1
                    },
                    '&:hover': {
                      bgcolor: 'primary.light'
                    }
                  }}
                >
                  {selectMode && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => toggleRow(idx)}
                        sx={{
                          '&.Mui-checked': { color: 'primary.main' }
                        }}
                      />
                    </TableCell>
                  )}
                  <TableCell sx={{ 
                    fontWeight: 500,
                    ...(selectMode && {
                      width: 100,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    })
                  }}>{nama}</TableCell>
                  <TableCell sx={{
                    ...(selectMode && {
                      width: 150,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    })
                  }}>{waktuPengiriman}</TableCell>
                  <TableCell sx={{
                    ...(selectMode && {
                      width: 150,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    })
                  }}>{catatan}</TableCell>
                  <TableCell >
                    {selectMode ? (
                      <TextField
                        type="number"
                        size="small"
                        value={qtyByIndex[idx] ?? qty}
                        inputProps={{ 
                          min: 0,
                          style: { textAlign: 'left' }
                        }}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setQtyByIndex(prev => ({ ...prev, [idx]: val }));
                        }}
                        disabled={!isSelected}
                        sx={{
                          width: 60,
                          '& .MuiOutlinedInput-root': {
                            bgcolor: 'grey.100'
                          },
                          '& .Mui-disabled': {
                            bgcolor: 'grey.200'
                          }
                        }}
                      />
                    ) : (
                      qty
                    )}
                  </TableCell>
                  <TableCell>{satuan}</TableCell>
                  <TableCell align="right" width={120}>
                    {harga ? `Rp ${currencyId(discountedUnit)}` : '-'}
                  </TableCell>
                  <TableCell align="right" width={120}>
                    {totalHarga ? `Rp ${Number(totalHarga).toLocaleString('id-ID')}` : '-'}
                  </TableCell>
                  <TableCell align="right" width={60}>{hpp ? `Rp ${Number(hpp).toLocaleString('id-ID')}` : '-'}</TableCell>
                  <TableCell align="right" width={60}>{upToPct ? `${Number(upToPct)}%` : '-'}</TableCell>
                  <TableCell align="right" width={60}>{discountPercent ? `${discountPercent}%` : '-'}</TableCell>
                
                  <TableCell width={80}>{via}</TableCell>
                  {selectMode && (
                    <>
                      <TableCell align="right">
                        <TextField
                          type="number"
                          size="small"
                          value={poPrice}
                          inputProps={{ 
                            min: 0,
                            style: { textAlign: 'right' }
                          }}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setPoPriceByIndex(prev => ({ ...prev, [idx]: val }));
                          }}
                          disabled={!isSelected}
                          sx={{
                            width: 120,
                            '& .MuiOutlinedInput-root': {
                              bgcolor: '#ffffff'
                            },
                            '& .Mui-disabled': {
                              bgcolor: '#f5f5f5'
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell align="right" sx={{ color: baselightTheme.palette.text.primary, width: 120 }}>
                        {(() => {
                          const currentQty = Number(qtyByIndex[idx] ?? qty) || 0;
                          const currentPoPrice = Number(poPriceByIndex[idx] ?? 0) || 0;
                          return `Rp ${(currentQty * currentPoPrice).toLocaleString('id-ID')}`;
                        })()}
                      </TableCell>
                    </>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Typography variant="subtitle1" fontSize={14}>
          <b>Total: </b>
          Rp {totalQuotationPrice.toLocaleString('id-ID')}
        </Typography>
      </Box>
      <Box sx={{ 
          mt: 3,
          pt: 3,
          borderTop: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
          mb: 2
        }}>
          {!selectMode ? (
            <Button 
              variant="contained"
              onClick={handlePoClick}
              sx={{
                bgcolor: 'primary.main',
                color: 'grey.100',
                '&:hover': { 
                  bgcolor: 'primary.dark' 
                },
                px: 3,
                py: 0.875,
                fontWeight: 500,
              }}
            >
              Masukkan Nomor PO
            </Button>
          ) : (
            <>
              <Button 
                variant="contained"
                onClick={cancelSelectMode}
                color="error"
                sx={{
                  px: 3,
                  py: 1,
                  fontWeight: 500,
                  bgcolor: 'red.main',
                  color: 'grey.100',
                  '&:hover': {
                    bgcolor: 'red.dark',
                  }
                }}
              >
                Batal
              </Button>
              <Button 
                variant="contained"
                onClick={handlePoClick}
                disabled={selectedIndexes.size === 0 || !poNumber.trim()}
                sx={{
                  bgcolor: 'primary.main',
                  color: 'grey.100',
                  '&:hover': { bgcolor: 'primary.dark' },
                  '&.Mui-disabled': {
                    bgcolor: 'action.disabledBackground'
                  },
                  px: 3,
                  py: 1,
                  fontWeight: 500,
                }}
              >
                Buat PO
              </Button>
            </>
          )}
          <Button 
            variant="outlined"
            onClick={onClose}
            sx={{
              borderColor: 'grey.400',
              color: 'grey.600',
              '&:hover': {
                borderColor: 'grey.500',
                bgcolor: 'grey.200',
              },
              px: 3,
              py: 1,
              fontWeight: 500,
            }}
            
          >
            Tutup
          </Button>
        </Box>
    </Drawer>
  );
};

export default QuotationDetailDrawer;
