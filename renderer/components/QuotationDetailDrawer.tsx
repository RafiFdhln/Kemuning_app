import { Drawer, Box, Typography, Divider, Table, TableBody, TableCell, TableHead, TableRow, Button, Checkbox, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import { currencyId } from "../lib/quotationCalc";

const QuotationDetailDrawer = ({ open, onClose, quotation, handleCreatePo }) => {
  if (!quotation) return null;
  
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState<Set<number>>(new Set());
  const [qtyByIndex, setQtyByIndex] = useState<Record<number, number>>({});
  const [poPriceByIndex, setPoPriceByIndex] = useState<Record<number, number>>({});
  const [poNumber, setPoNumber] = useState("");

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
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { minWidth: 800, p: 3 } }}>
      <Box>
        <Typography variant="h5" gutterBottom>Detail Quotation</Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Typography><b>No Quotation:</b> {quotation.quotationNumber}</Typography>
        <Typography><b>No Inquiry:</b> {quotation.inquiry?.requestNumber}</Typography>
        <Typography><b>Customer:</b> {quotation.customer?.name}</Typography>
        <Typography><b>Status:</b> {quotation.status}</Typography>
        <Typography><b>Keterangan:</b> {quotation.remarks}</Typography>
        <Typography><b>Tanggal:</b> {quotation.createdAt ? new Date(quotation.createdAt).toLocaleDateString() : '-'}</Typography>
        <Divider sx={{ my: 2 }} />
        
        {selectMode && (
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Nomor PO"
              value={poNumber}
              onChange={(e) => setPoNumber(e.target.value)}
              placeholder="Masukkan nomor PO"
              sx={{ mb: 2 }}
            />
          </Box>
        )}

        <Typography variant="h6" gutterBottom>Daftar Item</Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              {selectMode && (
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={someSelected}
                    checked={allSelected}
                    onChange={toggleSelectAll}
                  />
                </TableCell>
              )}
              <TableCell>Nama</TableCell>
              <TableCell>Waktu Pengiriman</TableCell>
              <TableCell>Catatan</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Satuan</TableCell>
              <TableCell>Harga</TableCell>
              <TableCell>Total Harga</TableCell>
              <TableCell>HPP</TableCell>
              <TableCell>UP TO%</TableCell>
              <TableCell>Diskon%</TableCell>
              <TableCell>Remark</TableCell>
              <TableCell>Via</TableCell>
              {selectMode && (
                <>
                  <TableCell>Harga PO</TableCell>
                  <TableCell>Total PO</TableCell>
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
              const remark = item.remarks || ii.notes || '-';
              const via = '-';
              const isSelected = selectedIndexes.has(idx);
              const poPrice = poPriceByIndex[idx] || 0;
              const totalPo = qty * poPrice;
              
              return (
                <TableRow key={idx}>
                  {selectMode && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => toggleRow(idx)}
                      />
                    </TableCell>
                  )}
                  <TableCell>{nama}</TableCell>
                  <TableCell>{waktuPengiriman}</TableCell>
                  <TableCell>{catatan}</TableCell>
                  <TableCell>
                    {selectMode ? (
                      <TextField
                        type="number"
                        size="small"
                        value={qtyByIndex[idx] ?? qty}
                        inputProps={{ min: 0 }}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setQtyByIndex(prev => ({ ...prev, [idx]: val }));
                        }}
                        disabled={!isSelected}
                        sx={{ width: 90 }}
                      />
                    ) : (
                      qty
                    )}
                  </TableCell>
                  <TableCell>{satuan}</TableCell>
                  <TableCell>{harga ? `Rp ${currencyId(discountedUnit)}` : '-'}</TableCell>
                  <TableCell>{totalHarga ? `Rp ${Number(totalHarga).toLocaleString('id-ID')}` : '-'}</TableCell>
                  <TableCell>{hpp ? `Rp ${Number(hpp).toLocaleString('id-ID')}` : '-'}</TableCell>
                  <TableCell>{upToPct ? `${Number(upToPct)}%` : '-'}</TableCell>
                  <TableCell>{discountPercent ? `${discountPercent}%` : '-'}</TableCell>
                  <TableCell>{remark}</TableCell>
                  <TableCell>{via}</TableCell>
                  {selectMode && (
                    <>
                      <TableCell>
                        <TextField
                          type="number"
                          size="small"
                          value={poPrice}
                          inputProps={{ min: 0 }}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setPoPriceByIndex(prev => ({ ...prev, [idx]: val }));
                          }}
                          disabled={!isSelected}
                          sx={{ width: 120 }}
                        />
                      </TableCell>
                      <TableCell>
                        {(() => {
                          const currentQty = Number(qtyByIndex[idx] ?? qty) || 0;
                          const currentPoPrice = Number(poPriceByIndex[idx] ?? 0) || 0;
                          return currentQty * currentPoPrice;
                        })()}
                      </TableCell>
                    </>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {selectMode && (
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Typography variant="subtitle1">
              <b>Total PO:</b> {(() => {
                return quotation.items?.reduce((sum: number, item: any, idx: number) => {
                  if (!selectedIndexes.has(idx)) return sum;
                  const currentQty = Number(qtyByIndex[idx] ?? item.qty) || 0;
                  const currentPoPrice = Number(poPriceByIndex[idx] ?? 0) || 0;
                  return sum + (currentQty * currentPoPrice);
                }, 0) || 0;
              })()}
            </Typography>
          </Box>
        )}
        
        {!selectMode && (
          <Button 
            sx={{ mt: 3, mr: 2 }} 
            variant="contained" 
            color="secondary" 
            onClick={handlePoClick}
          >
            Masukan Nomor PO
          </Button>
        )}
        {selectMode && (
          <>
            <Button 
              sx={{ mt: 3, mr: 2 }} 
              variant="contained" 
              color="secondary" 
              onClick={handlePoClick}
              disabled={selectedIndexes.size === 0 || !poNumber.trim()}
            >
              Buat PO
            </Button>
            <Button sx={{ mt: 3, mr: 2 }} variant="outlined" color="inherit" onClick={cancelSelectMode}>Batal</Button>
          </>
        )}
        <Button sx={{ mt: 3 }} variant="outlined" onClick={onClose}>Tutup</Button>
      </Box>
    </Drawer>
  );
};

export default QuotationDetailDrawer;
