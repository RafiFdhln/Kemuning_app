import { Drawer, Box, Typography, Divider, Table, TableBody, TableCell, TableHead, TableRow, Button, Checkbox, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import { baselightTheme } from "../src/theme/DefaultColors";

interface InquiryDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  inquiry: any;
  handleCreateQuotation?: (payload: any) => void;
}

const InquiryDetailDrawer = ({ open, onClose, inquiry, handleCreateQuotation }: InquiryDetailDrawerProps) => {
  if (!inquiry) return null;

  const [selectMode, setSelectMode] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState<Set<number>>(new Set());
  const [qtyByIndex, setQtyByIndex] = useState<Record<number, number>>({});
  const [marginPctByIndex, setMarginPctByIndex] = useState<Record<number, number>>({});

  const allItemIndexes: Set<number> = useMemo(() => new Set<number>((inquiry.items?.map((_, idx) => idx) || [])), [inquiry.items]);
  const allSelected = useMemo(() => inquiry.items && inquiry.items.length > 0 && selectedIndexes.size === inquiry.items.length, [selectedIndexes, inquiry.items]);
  const someSelected = useMemo(() => selectedIndexes.size > 0 && !allSelected, [selectedIndexes, allSelected]);
  
  // Check if all items are ready
  const allItemsReady = useMemo(() => {
    if (!inquiry.items || inquiry.items.length === 0) return false;
    return inquiry.items.every(item => item.status === 'READY');
  }, [inquiry.items]);

  const enterSelectMode = () => {
    setSelectMode(true);
    // Preselect all items and initialize qty map from current inquiry items
    const initialSelected = new Set<number>((inquiry.items?.map((_, idx) => idx) || []));
    setSelectedIndexes(initialSelected);
    const initialQty: Record<number, number> = {};
    inquiry.items?.forEach((item, idx) => {
      initialQty[idx] = Number(item.qty) || 0;
    });
    setQtyByIndex(initialQty);
    const initialMargin: Record<number, number> = {};
    inquiry.items?.forEach((_, idx) => {
      initialMargin[idx] = 0; // default 0% margin
    });
    setMarginPctByIndex(initialMargin);
  };

  const cancelSelectMode = () => {
    setSelectMode(false);
    setSelectedIndexes(new Set<number>());
    setQtyByIndex({});
    setMarginPctByIndex({});
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIndexes(new Set<number>());
    } else {
      setSelectedIndexes(allItemIndexes);
    }
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

  const handleQuotationClick = () => {
    // First click enters select mode
    if (!selectMode) {
      // Check if all items are ready before entering select mode
      if (!allItemsReady) {
        alert('Semua barang harus dalam status READY sebelum dapat dijadikan quotation');
        return;
      }
      enterSelectMode();
      return;
    }
    
    if (handleCreateQuotation && typeof handleCreateQuotation === 'function') {
      const filteredItems = (inquiry.items || [])
        .map((item, idx) => ({ item, idx }))
        .filter(({ idx }) => selectedIndexes.has(idx))
        .map(({ item, idx }) => {
          const newQty = Number(qtyByIndex[idx] ?? item.qty) || 0;
          const hpp = Number(item.hpp) || 0;
          const marginPct = Number(marginPctByIndex[idx] ?? 0) || 0;
          const sellingPrice = hpp * (1 + marginPct / 100);
          return {
            ...item,
            qty: newQty,
            totalHpp: newQty * hpp,
            price: sellingPrice,
            totalPrice: newQty * sellingPrice,
            marginPct,
          };
        });
      const payload = { ...inquiry, items: filteredItems };
      handleCreateQuotation(payload);
    } else {
      console.error('handleCreateQuotation is not a function or not provided');
    }
  };

  const totalInquiryPrice = useMemo(() => {
    const total = selectMode
      ? Array.from(selectedIndexes).reduce((sum, idx) => {
          const item = inquiry.items?.[idx];
          if (!item) return sum;
          const qty = Number(qtyByIndex[idx] ?? item.qty) || 0;
          const hpp = Number(item.hpp) || 0;
          return sum + qty * hpp;
        }, 0)
      : (inquiry.items || []).reduce((sum: number, item: any) => 
          sum + (Number(item.totalHpp) || (Number(item.qty) * Number(item.hpp)) || 0), 0);
    return total;
  }, [inquiry.items, selectMode, selectedIndexes, qtyByIndex]);

  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { minWidth: "84%", p: 4 } }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'text.main' }}>
          Detail Inquiry
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
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>Nomor Permintaan</Typography>
            <Typography variant="body1" fontWeight={500}>{inquiry.requestNumber}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>Kategori</Typography>
            <Typography variant="body1" fontWeight={500}>{inquiry.category}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>Customer</Typography>
            <Typography variant="body1" fontWeight={500}>{inquiry.customer?.name || inquiry.customerId}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>Status</Typography>
            <Typography variant="body1" fontWeight={500}>{inquiry.status}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>Keterangan</Typography>
            <Typography variant="body1" fontWeight={500}>{inquiry.remarks || '-'}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>Tanggal</Typography>
            <Typography variant="body1" fontWeight={500}>
              {inquiry.requestDate ? new Date(inquiry.requestDate).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : '-'}
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ 
          overflowX: 'auto',
          '& .MuiTable-root': {
            minWidth: selectMode ? '100%' : 1200,
            borderCollapse: 'separate',
            borderSpacing: '0 8px',
            table: {
              layout: selectMode ? 'fixed' : 'auto'
            }
          }
        }}>
          <Table width="100%">
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
                  <TableCell padding="checkbox" sx={{ borderRadius: '8px 0 0 8px', py: 0 }}>
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
                <TableCell sx={{ borderRadius: selectMode ? '0' : '8px 0 0 8px ' }}>Nama</TableCell>
                <TableCell>Supplier</TableCell>
                <TableCell>Detail</TableCell>
                <TableCell align="right">Qty</TableCell>
                <TableCell>Satuan</TableCell>
                <TableCell align="right">HPP/Satuan</TableCell>
                <TableCell align="right">TOTAL HPP</TableCell>
                {selectMode && (
                  <>
                    <TableCell align="right">Margin %</TableCell>
                    <TableCell align="right">Total Jual</TableCell>
                  </>
                )}
                <TableCell sx={{ borderRadius: selectMode ? '0 8px 8px 0' : '0 8px 8px 0' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inquiry.items?.map((item, idx) => (
                <TableRow key={idx} sx={{
                  '& .MuiTableCell-root': {
                    borderBottom: '1px solid',
                    borderColor: 'grey.300',
                    py: 1
                  },
                  '&:hover': {
                    bgcolor: 'primary.light'
                  }
                }}>
                  {selectMode && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedIndexes.has(idx)}
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
                      maxWidth: 0,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    })
                  }}>{item.name}</TableCell>
                  <TableCell sx={{
                    ...(selectMode && {
                      maxWidth: 0,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    })
                  }}>{item.supplierName || (item.supplier?.name) || '-'}</TableCell>
                  <TableCell sx={{
                    ...(selectMode && {
                      maxWidth: 0,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    })
                  }}>{item.detail}</TableCell>
                  <TableCell align="right" sx={{ minWidth: selectMode ? '80px' : 'auto' }}>
                    {selectMode ? (
                      <TextField
                        type="number"
                        size="small"
                        value={qtyByIndex[idx] ?? item.qty}
                        inputProps={{ 
                          min: 0,
                          style: { textAlign: 'right' }
                        }}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setQtyByIndex(prev => ({ ...prev, [idx]: val }));
                        }}
                        disabled={!selectedIndexes.has(idx)}
                        sx={{
                          width: 90,
                          '& .MuiOutlinedInput-root': {
                            bgcolor: 'grey.100'
                          },
                          '& .Mui-disabled': {
                            bgcolor: 'grey.200'
                          }
                        }}
                      />
                    ) : (
                      item.qty
                    )}
                  </TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell align="right">
                    {item.hpp ? `Rp ${Number(item.hpp).toLocaleString('id-ID')}` : '-'}
                  </TableCell>
                  <TableCell align="right">
                    {selectMode
                      ? `Rp ${((Number(qtyByIndex[idx] ?? item.qty) || 0) * (Number(item.hpp) || 0)).toLocaleString('id-ID')}`
                      : `Rp ${(item.totalHpp || (item.qty * item.hpp)).toLocaleString('id-ID')}`}
                  </TableCell>
                  {selectMode && (
                    <>
                      <TableCell align="right">
                        <TextField
                          type="number"
                          size="small"
                          value={marginPctByIndex[idx] ?? 0}
                          inputProps={{ 
                            min: 0,
                            style: { textAlign: 'right' }
                          }}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setMarginPctByIndex(prev => ({ ...prev, [idx]: val }));
                          }}
                          disabled={!selectedIndexes.has(idx)}
                          sx={{
                            width: 90,
                            '& .MuiOutlinedInput-root': {
                              bgcolor: '#ffffff'
                            },
                            '& .Mui-disabled': {
                              bgcolor: '#f5f5f5'
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        {(() => {
                          const qty = Number(qtyByIndex[idx] ?? item.qty) || 0;
                          const hpp = Number(item.hpp) || 0;
                          const marginPct = Number(marginPctByIndex[idx] ?? 0) || 0;
                          const price = hpp * (1 + marginPct / 100);
                          return `Rp ${(qty * price).toLocaleString('id-ID')}`;
                        })()}
                      </TableCell>
                    </>
                  )}
                  <TableCell>{item.status || '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Typography variant="subtitle1" fontSize={14}>
            <b>Total: </b>
            Rp {totalInquiryPrice.toLocaleString('id-ID')}
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
            inquiry.status !== 'QUOTED' && (
              <Button 
                variant="contained"
                onClick={handleQuotationClick}
                disabled={!handleCreateQuotation || !allItemsReady}
                title={!allItemsReady ? "Semua barang harus dalam status READY" : ""}
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
                Jadikan Quotation
              </Button>
            )
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
                onClick={handleQuotationClick}
                disabled={!handleCreateQuotation || selectedIndexes.size === 0}
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
                Buat Quotation
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
      </Box>
    </Drawer>
  );
};

export default InquiryDetailDrawer;