import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, TextField, Button, Paper,
  Autocomplete
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import AutoCompleteInput from "./AutoCompleteInput";
import { baselightTheme } from "../src/theme/DefaultColors";

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
};

interface ItemsTableProps {
  items: InquiryItemForm[];
  onChange: (items: InquiryItemForm[]) => void;
  suppliers?: { label: string; value: string }[];
}

const ItemsTable: React.FC<ItemsTableProps> = ({ items, onChange, suppliers }) => {
  const handleChange = (index: number, field: keyof InquiryItemForm, value: any) => {
    const newItems = [...items];
    (newItems[index] as any)[field] = value;
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
            <TableCell sx={{ minWidth: 240 }}>Supplier</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell sx={{ width: 50 }}>Qty</TableCell>
            <TableCell sx={{ width: 75 }}>Unit</TableCell>
            <TableCell sx={{ width: 50 }}>HPP</TableCell>
            <TableCell sx={{ width: 80 }}>Markup %</TableCell>
            <TableCell sx={{ width: 100 }}>Harga Jual</TableCell>
            <TableCell sx={{ width: 100 }}>Total</TableCell>
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
                    handleChange(index, "supplierId", value ? value.value : "");
                    handleChange(index, "supplierName", value ? value.label : "");
                  }}
                  getOptionLabel={(option) => option.label || ""} // penting biar text muncul
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
                  placeholder="HPP"
                  onChange={(e) => handleChange(index, "hpp", parseFloat(e.target.value))}
                  sx={{ width: 100 }}
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
                  value={item.sellingPrice || ""}
                  placeholder="Harga Jual"
                  onChange={(e) => handleChange(index, "sellingPrice", parseFloat(e.target.value))}
                  sx={{ width: 100 }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  variant="standard"
                  size="small"
                  value={item.totalPrice || ""}
                  placeholder="Total"
                  onChange={(e) => handleChange(index, "totalPrice", parseFloat(e.target.value))}
                  sx={{ width: 100 }}
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
            <TableCell colSpan={11}>
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