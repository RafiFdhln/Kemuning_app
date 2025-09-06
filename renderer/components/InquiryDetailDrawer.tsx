import { Drawer, Box, Typography, Divider, Table, TableBody, TableCell, TableHead, TableRow, Button, Checkbox, TextField } from "@mui/material";
import { useMemo, useState } from "react";

const InquiryDetailDrawer = ({ open, onClose, inquiry, handleCreateQuotation }) => {
  if (!inquiry) return null;
  
  // Debug: Log inquiry data to see supplier information
  console.log('InquiryDetailDrawer - inquiry data:', inquiry);
  console.log('InquiryDetailDrawer - items with supplier:', inquiry.items?.map(item => ({
    name: item.name,
    supplierId: item.supplierId,
    supplierName: item.supplierName,
    supplier: item.supplier
  })));

  const [selectMode, setSelectMode] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState<Set<number>>(new Set());
  const [qtyByIndex, setQtyByIndex] = useState<Record<number, number>>({});

  const allItemIndexes: Set<number> = useMemo(() => new Set<number>((inquiry.items?.map((_, idx) => idx) || [])), [inquiry.items]);
  const allSelected = useMemo(() => inquiry.items && inquiry.items.length > 0 && selectedIndexes.size === inquiry.items.length, [selectedIndexes, inquiry.items]);
  const someSelected = useMemo(() => selectedIndexes.size > 0 && !allSelected, [selectedIndexes, allSelected]);

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
  };

  const cancelSelectMode = () => {
    setSelectMode(false);
    setSelectedIndexes(new Set<number>());
    setQtyByIndex({});
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIndexes(new Set<number>());
    } else {
      setSelectedIndexes(new Set<number>(Array.from(allItemIndexes)));
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
          const sellingPrice = Number(item.sellingPrice) || 0;
          return {
            ...item,
            qty: newQty,
            totalHpp: newQty * hpp,
            totalPrice: newQty * sellingPrice,
          };
        });
      const payload = { ...inquiry, items: filteredItems };
      handleCreateQuotation(payload);
    } else {
      console.error('handleCreateQuotation is not a function or not provided');
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { minWidth: 500, p: 3 } }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>Detail Inquiry</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography><b>No Permintaan:</b> {inquiry.requestNumber}</Typography>
        <Typography><b>Tanggal:</b> {inquiry.requestDate ? new Date(inquiry.requestDate).toLocaleDateString() : '-'}</Typography>
        <Typography><b>Kategori:</b> {inquiry.category}</Typography>
        <Typography><b>Customer:</b> {inquiry.customer?.name || inquiry.customerId}</Typography>
        <Typography><b>Status:</b> {inquiry.status}</Typography>
        <Typography><b>Keterangan:</b> {inquiry.remarks}</Typography>
        <Divider sx={{ my: 2 }} />
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
              <TableCell>Supplier</TableCell>
              <TableCell>Detail</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Satuan</TableCell>
              <TableCell>HPP/Satuan</TableCell>
              <TableCell>TOTAL HPP</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inquiry.items?.map((item, idx) => (
              <TableRow key={idx}>
                {selectMode && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedIndexes.has(idx)}
                      onChange={() => toggleRow(idx)}
                    />
                  </TableCell>
                )}
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.supplierName || (item.supplier?.name) || '-'}</TableCell>
                <TableCell>{item.detail}</TableCell>
                <TableCell>
                  {selectMode ? (
                    <TextField
                      type="number"
                      size="small"
                      value={qtyByIndex[idx] ?? item.qty}
                      inputProps={{ min: 0 }}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setQtyByIndex(prev => ({ ...prev, [idx]: val }));
                      }}
                      disabled={!selectedIndexes.has(idx)}
                      sx={{ width: 90 }}
                    />
                  ) : (
                    item.qty
                  )}
                </TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell>{item.hpp}</TableCell>
                <TableCell>
                  {selectMode
                    ? ((Number(qtyByIndex[idx] ?? item.qty) || 0) * (Number(item.hpp) || 0))
                    : (item.totalHpp || (item.qty * item.hpp))}
                </TableCell>
                <TableCell>{item.status || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {inquiry.status !== 'QUOTED' && !selectMode && (
          <Button 
            sx={{ mt: 3, mr: 2 }} 
            variant="contained" 
            color="secondary" 
            onClick={handleQuotationClick}
            disabled={!handleCreateQuotation}
          >
            Jadikan Quotation
          </Button>
        )}
        {inquiry.status !== 'QUOTED' && selectMode && (
          <>
            <Button 
              sx={{ mt: 3, mr: 2 }} 
              variant="contained" 
              color="secondary" 
              onClick={handleQuotationClick}
              disabled={!handleCreateQuotation || selectedIndexes.size === 0}
            >
              Buat Quotation
            </Button>
            <Button sx={{ mt: 3, mr: 2 }} variant="outlined" color="inherit" onClick={cancelSelectMode}>Batal</Button>
          </>
        )}
        <Button sx={{ mt: 3 }} variant="outlined" onClick={onClose}>Tutup</Button>
      </Box>
    </Drawer>
  );
};

export default InquiryDetailDrawer;
