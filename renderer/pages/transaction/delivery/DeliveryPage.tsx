import { Alert, Box, Button, Snackbar, Typography, Divider, Drawer, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import FullLayout from "../../../src/layouts/full/FullLayout";
import DashboardCard from "../../../src/components/shared/DashboardCard";
import PageContainer from "../../../src/components/container/PageContainer";
import DataTable from "../../../components/DataTable";
import { IconPencil, IconFileDownload } from "@tabler/icons-react";
import { MRT_ColumnDef } from "material-react-table";

const DeliveryPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<any | null>(null);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const res = await fetch("/api/transaction/po");
        const result = await res.json();
        if (result.success && result.data) {
          setData(result.data);
        } else {
          setData([]);
          console.warn('No data received from API');
        }
      } catch (err: any) {
        console.error('Error fetching deliveries:', err);
        setData([]);
        setErrorMessage("Gagal mengambil data delivery");
        setErrorOpen(true);
      }
    };
    fetchDeliveries();
  }, []);

  const columns = useMemo<MRT_ColumnDef<any>[]>(() => [
    {
      accessorKey: "poNumber",
      header: "No PO",
      Cell: ({ cell, row }) => (
        <Button
          variant="text"
          onClick={() => {
            setSelectedDelivery(row.original);
            setDetailOpen(true);
          }}
          sx={{
            textTransform: 'none',
            color: '#0A8DD0',
            fontWeight: 500,
            textAlign: 'left',
            justifyContent: 'flex-start',
            '&:hover': { backgroundColor: '#E6F7F9', textDecoration: 'underline' }
          }}
        >
          {cell.getValue<string>() || '-'}
        </Button>
      ),
      enableColumnFilter: true,
      enableGlobalFilter: true
    },
    {
      accessorKey: "quotationNumber",
      header: "No Quotation",
      Cell: ({ cell }) => cell.getValue<string>() || '-',
      enableColumnFilter: true,
      enableGlobalFilter: true
    },
    {
      accessorKey: "customerName",
      header: "Customer",
      Cell: ({ cell }) => cell.getValue<string>() || '-',
      enableColumnFilter: true,
      enableGlobalFilter: true
    },
    {
      accessorKey: "createdAt",
      header: "Tanggal",
      Cell: ({ cell }) => cell.getValue<string>() ? new Date(cell.getValue<string>()).toLocaleDateString() : '-',
      enableColumnFilter: true,
      enableGlobalFilter: true
    },
    {
      accessorKey: "status",
      header: "Status",
      Cell: ({ cell }) => cell.getValue<string>() || '-',
      enableColumnFilter: true,
      enableGlobalFilter: true
    },
    {
      header: "Aksi",
      id: "aksi",
      Cell: ({ row }) => (
        <Box sx={{ display: 'flex', gap: 1, justifyContent:'start' }}>
          <IconButton
            size="small"
            sx={{
              color: "#0A8DD0",
              border: "2px solid #0A8DD0",
              backgroundColor: "#E6F7F9",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#bbdefb",
              }
            }}
            onClick={() => {
              setSelectedDelivery(row.original);
              setDetailOpen(true);
            }}
          >
            <IconPencil fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ], []);

  const handleCloseError = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setErrorOpen(false);
  };

  const handleCloseSuccess = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setSuccessOpen(false);
  };

  return (
    <PageContainer title="Delivery">
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="h4">Delivery</Typography>
      </Box>
      <DashboardCard>
        <DataTable columns={columns} data={data} pageSize={10} showGlobalFilter={true} />
      </DashboardCard>
      
      {/* Detail Drawer */}
      <Drawer anchor="right" open={detailOpen} onClose={() => setDetailOpen(false)} PaperProps={{ sx: { minWidth: 800, p: 3 } }}>
        {selectedDelivery && (
          <Box>
            <Typography variant="h5" gutterBottom>Detail Delivery</Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Typography><b>No PO:</b> {selectedDelivery.poNumber}</Typography>
            <Typography><b>No Quotation:</b> {selectedDelivery.quotationNumber}</Typography>
            <Typography><b>Customer:</b> {selectedDelivery.customerName}</Typography>
            <Typography><b>Status:</b> {selectedDelivery.status}</Typography>
            <Typography><b>Tanggal:</b> {selectedDelivery.createdAt ? new Date(selectedDelivery.createdAt).toLocaleDateString() : '-'}</Typography>
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="h6" gutterBottom>Daftar Item</Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Nama</TableCell>
                  <TableCell>Qty</TableCell>
                  <TableCell>Satuan</TableCell>
                  <TableCell>Harga PO</TableCell>
                  <TableCell>Total PO</TableCell>
                  <TableCell>Remark</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedDelivery.items?.map((item: any, idx: number) => (
                  <TableRow key={idx}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.qty}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>{item.poPrice ? `Rp ${Number(item.poPrice).toLocaleString('id-ID')}` : '-'}</TableCell>
                    <TableCell>{item.totalPoPrice ? `Rp ${Number(item.totalPoPrice).toLocaleString('id-ID')}` : '-'}</TableCell>
                    <TableCell>{item.remarks || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Typography variant="subtitle1">
                <b>Total PO:</b> {(() => {
                  return selectedDelivery.items?.reduce((sum: number, item: any) => 
                    sum + (Number(item.totalPoPrice) || 0), 0) || 0;
                })()}
              </Typography>
            </Box>
            
            <Button sx={{ mt: 3 }} variant="outlined" onClick={() => setDetailOpen(false)}>Tutup</Button>
          </Box>
        )}
      </Drawer>
      
      <Snackbar
        open={errorOpen}
        autoHideDuration={2000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert variant="filled" severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

DeliveryPage.getLayout = function getLayout(page: React.ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};

export default DeliveryPage;
