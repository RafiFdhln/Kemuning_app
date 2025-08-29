import { Alert, Box, Button, Snackbar, Typography, Divider, Drawer } from "@mui/material";
import FullLayout from "../../../src/layouts/full/FullLayout";
import DashboardCard from "../../../src/components/shared/DashboardCard";
import PageContainer from "../../../src/components/container/PageContainer";
import { baselightTheme } from "../../../src/theme/DefaultColors";
import DataTable from "../../../components/DataTable";
import { MRT_ColumnDef } from "material-react-table";
import { useMemo, useState, useEffect } from "react";

const QuotationPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState<any | null>(null);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const res = await fetch("/api/transaction/quotation");
        const result = await res.json();
        if (result.success && result.data) {
          setData(result.data);
        } else {
          setData([]);
        }
      } catch (err: any) {
        setData([]);
        setErrorMessage("Gagal mengambil data quotation");
        setErrorOpen(true);
      }
    };
    fetchQuotations();
  }, []);

  const columns = useMemo<MRT_ColumnDef<any>[]>(() => [
    {
      accessorKey: "quotationNumber",
      header: "No Quotation",
      Cell: ({ cell }) => cell.getValue<string>() || '-',
      enableColumnFilter: true,
      enableGlobalFilter: true
    },
    {
      accessorKey: "inquiry.requestNumber",
      header: "No Inquiry",
      Cell: ({ row }) => row.original.inquiry?.requestNumber || '-',
      enableColumnFilter: true,
      enableGlobalFilter: true
    },
    {
      accessorKey: "customer",
      header: "Customer",
      Cell: ({ row }) => row.original.customer?.name || '-',
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
      accessorKey: "remarks",
      header: "Keterangan",
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
      header: "Aksi",
      id: "aksi",
      Cell: ({ row }) => (
        <Button size="small" variant="outlined" onClick={() => {
          setSelectedQuotation(row.original);
          setDetailOpen(true);
        }}>
          Detail
        </Button>
      ),
    },
  ], []);

  const handleCloseError = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setErrorOpen(false);
  };

  return (
    <PageContainer title="Quotation">
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="h4">Quotation</Typography>
      </Box>
      <DashboardCard>
        <DataTable columns={columns} data={data} pageSize={10} showGlobalFilter={true} />
      </DashboardCard>
      {/* Detail Drawer pakai MUI Drawer agar sidebar tetap muncul */}
      <Drawer anchor="right" open={detailOpen} onClose={() => setDetailOpen(false)} PaperProps={{ sx: { minWidth: 500, p: 3 } }}>
        {selectedQuotation && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Detail Quotation</Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography><b>No Quotation:</b> {selectedQuotation.quotationNumber}</Typography>
            <Typography><b>No Inquiry:</b> {selectedQuotation.inquiry?.requestNumber}</Typography>
            <Typography><b>Customer:</b> {selectedQuotation.customer?.name}</Typography>
            <Typography><b>Status:</b> {selectedQuotation.status}</Typography>
            <Typography><b>Keterangan:</b> {selectedQuotation.remarks}</Typography>
            <Typography><b>Tanggal:</b> {selectedQuotation.createdAt ? new Date(selectedQuotation.createdAt).toLocaleDateString() : '-'}</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>Daftar Item</Typography>
            <Box>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Qty</th>
                    <th>Harga</th>
                    <th>Total</th>
                    <th>Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedQuotation.items?.map((item: any, idx: number) => (
                    <tr key={idx}>
                      <td>{item.name}</td>
                      <td>{item.qty}</td>
                      <td>{item.price}</td>
                      <td>{item.totalPrice}</td>
                      <td>{item.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
    </PageContainer>
  );
};

QuotationPage.getLayout = function getLayout(page: React.ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};

export default QuotationPage;
