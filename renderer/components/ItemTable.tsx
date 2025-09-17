import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, TextField, Button, Paper,
  Autocomplete
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { baselightTheme } from "../src/theme/DefaultColors";
import { useEffect } from "react";
import { calculateItemTotals } from "../lib/quotationCalc";

type ItemData = {
  name: string;
  detail?: string;
  status?: string;
  qty: number;
  unit?: string;
  hpp?: number;
  totalHpp?: number;
  price?: number;
  totalPrice?: number;
  markupPercent?: number;
  discountPercent?: number;
  deliveryTime?: string;
  supplierId?: string;
  supplierName?: string;
  remarks?: string;
};

interface ItemsTableProps {
  items: ItemData[];
  onChange: (items: ItemData[]) => void;
  suppliers?: { label: string; value: string }[];
  variant?: 'inquiry' | 'quotation';
}

const ItemsTable: React.FC<ItemsTableProps> = ({ items, onChange, suppliers, variant = 'inquiry' }) => {
  const calculateValues = (item: ItemData) => {
    const qty = item.qty || 0;
    const hpp = item.hpp || 0;
    const markupPercent = item.markupPercent || 0;
    const discountPercent = item.discountPercent || 0;

    const totalHpp = qty * hpp;
    const { unitPrice, totalPrice } = calculateItemTotals({ qty, hpp, markupPercent, discountPercent });

    return { totalHpp, totalPrice, unitPrice };
  };

  useEffect(() => {
    const updatedItems = items.map(item => {
      const { totalHpp, totalPrice, unitPrice } = calculateValues(item);
      return {
        ...item,
        totalHpp,
        totalPrice,
        price: unitPrice,
      };
    });
    
    const hasChanges = updatedItems.some((item, index) => {
      const original = items[index];
      return item.totalHpp !== original.totalHpp || item.totalPrice !== original.totalPrice;
    });
    
    if (hasChanges) {
      onChange(updatedItems);
    }
  }, [items.map(item => `${item.qty}-${item.hpp}-${item.markupPercent}-${item.discountPercent}`).join(',')]);

  const handleChange = (index: number, field: keyof ItemData, value: any) => {
    const newItems = [...items];
    (newItems[index] as any)[field] = value;
    
    if (field === 'qty' || field === 'hpp' || field === 'markupPercent' || field === 'discountPercent') {
      const { totalHpp, totalPrice, unitPrice } = calculateValues(newItems[index]);
      newItems[index].totalHpp = totalHpp;
      newItems[index].totalPrice = totalPrice;
      newItems[index].price = unitPrice;
    }
    
    onChange(newItems);
  };

  const handleDelete = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const renderInquiryColumns = () => (
    <TableRow>
      <TableCell sx={{ minWidth: 150 }}>Nama</TableCell>
      <TableCell sx={{ minWidth: 200 }}>Supplier</TableCell>
      <TableCell sx={{ minWidth: 100 }}>Detail</TableCell>
      <TableCell sx={{ width: 50 }}>Qty</TableCell>
      <TableCell sx={{ width: 75 }}>Satuan</TableCell>
      <TableCell sx={{ width: 150 }}>HPP/Satuan</TableCell>
      <TableCell sx={{ width: 100 }}>TOTAL HPP</TableCell>
      <TableCell sx={{ minWidth: 150 }}>Status</TableCell>
      <TableCell>Aksi</TableCell>
    </TableRow>
  );

  const renderQuotationColumns = () => (
    <TableRow>
      <TableCell sx={{ minWidth: 150 }}>Nama</TableCell>
      <TableCell sx={{ minWidth: 150 }}>Supplier</TableCell>
      <TableCell sx={{ minWidth: 100 }}>Detail</TableCell>
      <TableCell sx={{ width: 50 }}>Qty</TableCell>
      <TableCell sx={{ width: 75 }}>Satuan</TableCell>
      <TableCell sx={{ minWidth: 150 }}>Waktu Pengiriman</TableCell>
      <TableCell sx={{ minWidth: 110 }}>Via</TableCell>
      <TableCell sx={{ width: 150 }}>Harga</TableCell>
      <TableCell sx={{ width: 100 }}>Total Harga</TableCell>
      <TableCell sx={{ width: 150 }}>HPP</TableCell>
      <TableCell sx={{ width: 100 }}>UP TO %</TableCell>
      <TableCell sx={{ width: 110 }}>Diskon %</TableCell>
      <TableCell sx={{ minWidth: 150 }}>Remark</TableCell>
      <TableCell>Aksi</TableCell>
    </TableRow>
  );

  const renderInquiryRow = (item: ItemData, index: number) => (
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
          size="small"
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
          value={item.detail || ""}
          placeholder="Brand"
          onChange={(e) => handleChange(index, "detail", e.target.value)}
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
        <Autocomplete
          size="small"
          options={["READY", "UNREADY"]}
          value={item.status || ""}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              size="small"
              placeholder="Status"
            />
          )}
          onChange={(event, newValue) => {
            handleChange(index, "status", newValue || "");
          }}
          sx={{ minWidth: 120 }}
        />
      </TableCell>
      <TableCell>
        <IconButton color="error" onClick={() => handleDelete(index)}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  const renderQuotationRow = (item: ItemData, index: number) => (
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
        <TextField
          variant="standard"
          size="small"
          value={item.supplierName || ""}
          placeholder="Supplier"
          onChange={(e) => handleChange(index, "supplierName", e.target.value)}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          size="small"
          value={item.detail || ""}
          placeholder="Detail"
          onChange={(e) => handleChange(index, "detail", e.target.value)}
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
          variant="standard"
          size="small"
          value={item.deliveryTime || ""}
          placeholder="Waktu Pengiriman"
          onChange={(e) => handleChange(index, "deliveryTime", e.target.value)}
          sx={{ minWidth: 150 }}
        />
      </TableCell>
      <TableCell>
        <Autocomplete
          size="small"
          options={["EMAIL","WA","REPEAT"]}
          value={(item as any).via || ""}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              size="small"
              placeholder="Via"
            />
          )}
          onChange={(event, newValue) => {
            handleChange(index, "via" as any, newValue || "");
          }}
          sx={{ minWidth: 120 }}
        />
      </TableCell>
      <TableCell>
        <TextField
          type="number"
          variant="standard"
          size="small"
          value={item.price || 0}
          placeholder="Harga"
          InputProps={{ readOnly: true }}
          sx={{ 
            width: 100,
            backgroundColor: '#f8f9fa',
            '& .MuiInputBase-root': { color: '#6c757d', fontWeight: 500, borderBottom: '2px solid #dee2e6' },
            '& .MuiInputBase-input': { cursor: 'default' }
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          type="number"
          variant="standard"
          size="small"
          value={item.totalPrice || 0}
          placeholder="Total Harga"
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
          value={item.hpp || ""}
          placeholder="HPP"
          onChange={(e) => handleChange(index, "hpp", parseFloat(e.target.value))}
          sx={{ width: 80 }}
        />
      </TableCell>
      <TableCell>
        <TextField
          type="number"
          variant="standard"
          size="small"
          value={item.markupPercent || ""}
          placeholder="UP TO %"
          onChange={(e) => handleChange(index, "markupPercent", parseFloat(e.target.value))}
          sx={{ width: 80 }}
        />
      </TableCell>
      <TableCell>
        <TextField
          type="number"
          variant="standard"
          size="small"
          value={item.discountPercent || 0}
          placeholder="Diskon %"
          onChange={(e) => handleChange(index, "discountPercent" as any, parseFloat(e.target.value))}
          sx={{ width: 90 }}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          size="small"
          value={item.remarks || ""}
          placeholder="Remark"
          onChange={(e) => handleChange(index, "remarks", e.target.value)}
        />
      </TableCell>
      <TableCell>
        <IconButton color="error" onClick={() => handleDelete(index)}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );

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
          {variant === 'inquiry' ? renderInquiryColumns() : renderQuotationColumns()}
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            variant === 'inquiry' ? renderInquiryRow(item, index) : renderQuotationRow(item, index)
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
