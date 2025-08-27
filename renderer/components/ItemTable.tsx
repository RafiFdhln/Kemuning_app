import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, TextField, Button, Paper,
  Autocomplete, Box, Typography
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import AutoCompleteInput from "./AutoCompleteInput";
import { baselightTheme } from "../src/theme/DefaultColors";
import { useEffect } from "react";

type InquiryItemForm = {
  name: string;
  brand?: string;
  status?: string;
  qty: number;
  unit?: string;
  hpp?: number;
  markupPercent?: number;
  priceAfterUp?: number;
  sellingPrice?: number;
  totalPrice?: number;
  poPrice?: number;
  notes?: string;
  deliveryTime?: string;
  supplierId?: string;
  supplierName?: string; 
  totalHpp?: number;
};

interface ItemsTableProps {
  items: InquiryItemForm[];
  onChange: (items: InquiryItemForm[]) => void;
  suppliers?: { label: string; value: string }[];
}

const ItemsTable: React.FC<ItemsTableProps> = ({ items, onChange, suppliers }) => {
  const calculateValues = (item: InquiryItemForm) => {
    const qty = item.qty || 0;
    const hpp = item.hpp || 0;
    const markupPercent = item.markupPercent || 0;
    
    const totalHpp = qty * hpp;
    const sellingPrice = totalHpp + (totalHpp * markupPercent / 100);
    const totalPrice = sellingPrice * qty;
    
    return { totalHpp, sellingPrice, totalPrice };
  };

  useEffect(() => {
    const updatedItems = items.map(item => {
      const { totalHpp, sellingPrice, totalPrice } = calculateValues(item);
      return {
        ...item,
        totalHpp,
        sellingPrice: sellingPrice > 0 ? sellingPrice : item.sellingPrice,
        totalPrice: totalPrice > 0 ? totalPrice : item.totalPrice
      };
    });
    
    const hasChanges = updatedItems.some((item, index) => {
      const original = items[index];
      return item.totalHpp !== original.totalHpp || 
             item.sellingPrice !== original.sellingPrice || 
             item.totalPrice !== original.totalPrice;
    });
    
    if (hasChanges) {
      onChange(updatedItems);
    }
  }, [items.map(item => `${item.qty}-${item.hpp}-${item.markupPercent}`).join(',')]);

  const handleChange = (index: number, field: keyof InquiryItemForm, value: any) => {
    const newItems = [...items];
    (newItems[index] as any)[field] = value;
    
    if (field === 'qty' || field === 'hpp' || field === 'markupPercent') {
      const { totalHpp, sellingPrice, totalPrice } = calculateValues(newItems[index]);
      newItems[index].totalHpp = totalHpp;
      newItems[index].sellingPrice = sellingPrice;
      newItems[index].totalPrice = totalPrice;
    }
    
    onChange(newItems);
  };

  const handleDelete = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2, maxHeight: 200}}>
      <Table size="small">
        <TableHead sx={{
          backgroundColor: baselightTheme.palette.primary.dark,
          '& .MuiTableCell-root': {
            color: baselightTheme.palette.primary.light,
            fontWeight: 600,
          },
        }}>
          <TableRow>
            <TableCell sx={{ minWidth: 150 }}>Nama</TableCell>
            <TableCell sx={{ minWidth: 200 }}>Supplier</TableCell>
            <TableCell sx={{ minWidth: 100 }}>Brand</TableCell>
            <TableCell sx={{ width: 50 }}>Qty</TableCell>
            <TableCell sx={{ width: 75 }}>Satuan</TableCell>
            <TableCell sx={{ width: 150 }}>HPP/Satuan</TableCell>
            <TableCell sx={{ width: 100 }}>TOTAL HPP</TableCell>
            <TableCell sx={{ width: 80 }}>Markup %</TableCell>
            <TableCell sx={{ width: 150 }}>Harga Jual</TableCell>
            <TableCell sx={{ width: 150 }}>Total</TableCell>
            <TableCell sx={{ minWidth: 150 }}>Catatan</TableCell>
            <TableCell>Aksi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <TextField
                  variant="standard"
                  size="small"
                  value={item.name}
                  placeholder="Nama barang"
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  sx={{ minWidth: 120 }}
                />
              </TableCell>
              <TableCell>
                <Autocomplete
                  options={suppliers || []}
                  value={(suppliers || []).find((s) => s.value === item.supplierId) || null}
                  onChange={(_e, value) => {
                    if (value) {
                      handleChange(index, "supplierId", value.value);
                      handleChange(index, "supplierName", value.label);
                    } else {
                      handleChange(index, "supplierId", "");
                      handleChange(index, "supplierName", "");
                    }
                  }}
                  getOptionLabel={(option) => option.label || ""}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      size="small"
                      placeholder="Supplier"
                    />
                  )}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="standard"
                  size="small"
                  value={item.brand || ""}
                  placeholder="Brand"
                  onChange={(e) => handleChange(index, "brand", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  variant="standard"
                  size="small"
                  value={item.qty}
                  placeholder="Qty"
                  onChange={(e) => handleChange(index, "qty", parseInt(e.target.value) || 0)}
                  sx={{ width: 60 }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="standard"
                  size="small"
                  value={item.unit || ""}
                  placeholder="Unit"
                  onChange={(e) => handleChange(index, "unit", e.target.value)}
                  sx={{ width: 80 }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  variant="standard"
                  size="small"
                  value={item.hpp || ""}
                  placeholder="HPP/Satuan"
                  onChange={(e) => handleChange(index, "hpp", parseFloat(e.target.value))}
                  sx={{ width: 80 }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  variant="standard"
                  size="small"
                  value={item.totalHpp || 0}
                  placeholder="TOTAL HPP"
                  InputProps={{ readOnly: true }}
                  sx={{ 
                    width: 100, 
                    backgroundColor: '#f8f9fa',
                    '& .MuiInputBase-root': {
                      color: '#6c757d',
                      fontWeight: 500,
                      borderBottom: '2px solid #dee2e6'
                    },
                    '& .MuiInputBase-input': {
                      cursor: 'default'
                    }
                  }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  variant="standard"
                  size="small"
                  value={item.markupPercent || ""}
                  placeholder="%"
                  onChange={(e) => handleChange(index, "markupPercent", parseFloat(e.target.value))}
                  sx={{ width: 80 }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  variant="standard"
                  size="small"
                  value={item.sellingPrice || 0}
                  placeholder="Harga Jual"
                  InputProps={{ readOnly: true }}
                  sx={{ width: 100, backgroundColor: '#f5f5f5' }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  variant="standard"
                  size="small"
                  value={item.totalPrice || 0}
                  placeholder="Total"
                  InputProps={{ readOnly: true }}
                  sx={{ width: 100, backgroundColor: '#f5f5f5' }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="standard"
                  size="small"
                  value={item.notes || ""}
                  placeholder="Catatan"
                  onChange={(e) => handleChange(index, "notes", e.target.value)}
                  sx={{ minWidth: 120 }}
                />
              </TableCell>
              <TableCell>
                <IconButton color="error" onClick={() => handleDelete(index)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={12}>
              <Button
                variant="outlined"
                onClick={() =>
                  onChange([
                    ...items,
                    { name: "", qty: 1 },
                  ])
                }
              >
                + Tambah Item
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemsTable;