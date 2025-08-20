import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, TextField, Button, Paper
} from "@mui/material";
import { Delete } from "@mui/icons-material";

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
};

interface ItemsTableProps {
  items: InquiryItemForm[];
  onChange: (items: InquiryItemForm[]) => void;
}

const ItemsTable: React.FC<ItemsTableProps> = ({ items, onChange }) => {
  const handleChange = (index: number, field: keyof InquiryItemForm, value: any) => {
    const newItems = [...items];
    (newItems[index] as any)[field] = value;
    onChange(newItems);
  };

  const handleDelete = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nama</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>Unit</TableCell>
            <TableCell>HPP</TableCell>
            <TableCell>Markup %</TableCell>
            <TableCell>Harga Jual</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Catatan</TableCell>
            <TableCell>Aksi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <TextField
                  variant="standard"
                  value={item.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="standard"
                  value={item.brand || ""}
                  onChange={(e) => handleChange(index, "brand", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  variant="standard"
                  value={item.qty}
                  onChange={(e) => handleChange(index, "qty", parseInt(e.target.value) || 0)}
                  sx={{ width: 60 }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="standard"
                  value={item.unit || ""}
                  onChange={(e) => handleChange(index, "unit", e.target.value)}
                  sx={{ width: 80 }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  variant="standard"
                  value={item.hpp || ""}
                  onChange={(e) => handleChange(index, "hpp", parseFloat(e.target.value))}
                  sx={{ width: 100 }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  variant="standard"
                  value={item.markupPercent || ""}
                  onChange={(e) => handleChange(index, "markupPercent", parseFloat(e.target.value))}
                  sx={{ width: 80 }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  variant="standard"
                  value={item.sellingPrice || ""}
                  onChange={(e) => handleChange(index, "sellingPrice", parseFloat(e.target.value))}
                  sx={{ width: 100 }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  variant="standard"
                  value={item.totalPrice || ""}
                  onChange={(e) => handleChange(index, "totalPrice", parseFloat(e.target.value))}
                  sx={{ width: 100 }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="standard"
                  value={item.notes || ""}
                  onChange={(e) => handleChange(index, "notes", e.target.value)}
                  sx={{ width: 150 }}
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
            <TableCell colSpan={10}>
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