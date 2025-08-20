import { Drawer, Box, Typography, Divider, Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";

const InquiryDetailDrawer = ({ open, onClose, inquiry }) => {
  if (!inquiry) return null;

  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { minWidth: 500, p: 3 } }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>Detail Inquiry</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography><b>No Permintaan:</b> {inquiry.requestNumber}</Typography>
        <Typography><b>Tanggal:</b> {new Date(inquiry.requestDate).toLocaleDateString()}</Typography>
        <Typography><b>Kategori:</b> {inquiry.category}</Typography>
        <Typography><b>Customer:</b> {inquiry.customer?.name || inquiry.customerId}</Typography>
        <Typography><b>Status:</b> {inquiry.status}</Typography>
        <Typography><b>Keterangan:</b> {inquiry.remarks}</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>Daftar Item</Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Nama</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Harga Jual</TableCell>
              <TableCell>Supplier</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inquiry.items?.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.brand}</TableCell>
                <TableCell>{item.qty}</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell>{item.sellingPrice}</TableCell>
                <TableCell>{item.supplierName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button sx={{ mt: 3 }} variant="outlined" onClick={onClose}>Tutup</Button>
      </Box>
    </Drawer>
  );
};

export default InquiryDetailDrawer;
