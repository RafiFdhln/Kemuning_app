import { Alert, Box, Button, Link, Snackbar, Typography } from "@mui/material";
import FullLayout from "../../../src/layouts/full/FullLayout";
import DashboardCard from "../../../src/components/shared/DashboardCard";
import PageContainer from "../../../src/components/container/PageContainer";
import { baselightTheme } from "../../../src/theme/DefaultColors";
import DataTable from "../../../components/DataTable";
import { MRT_ColumnDef } from "material-react-table";
import { useMemo, useState, useEffect } from "react";
import { IconCirclePlus } from "@tabler/icons-react";
import AddNewDataDrawer from "../../../components/AddNewDataDrawer";
import * as XLSX from "xlsx";
import InquiryDetailDrawer from "../../../components/InquiryDetailDrawer";

type Inquiry = {
  requestNumber: string;
  requestDate: Date;
  category: "BARANG" | "PROJECT";
  customer: any;
  remarks: string;
  status: "PENDING" | "QUOTED" | "ORDERED" | "DELIVERED";
  items: InquiryItem[];
};

type InquiryItem = {
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

const InquiryPage = () => {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [data, setData] = useState<Inquiry[]>([]);
  const [customers, setCustomers] = useState<{ id: string; name: string }[]>([]);
  const [suppliers, setSuppliers] = useState<{ label: string; value: string }[]>([]);
  const [detailOpen, setDetailOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const formatDateTimeLocal = (d: Date) => {
    const pad = (n: number) => String(n).padStart(2, '0');
    const yyyy = d.getFullYear();
    const mm = pad(d.getMonth() + 1);
    const dd = pad(d.getDate());
    const hh = pad(d.getHours());
    const mi = pad(d.getMinutes());
    return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
  };

  const [formData, setFormData] = useState<
    Omit<Inquiry, "requestDate" | "items" | "customer"> & { requestDate: string; items: InquiryItem[]; customerId: string }
  >({
    requestNumber: "",
    requestDate: formatDateTimeLocal(new Date()),
    category: "BARANG",
    customerId: "",
    remarks: "",
    status: "PENDING",
    items: [],
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch("/api/company/customer");
        const result = await res.json();
        setCustomers(result.data || []);
      } catch (err) {
        setCustomers([]);
      }
    };
    fetchCustomers();
  }, []);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const res = await fetch("/api/transaction/inquiry");
        const result = await res.json();
        setData(result.data || []);
      } catch (err) {
        setData([]);
      }
    };
    fetchInquiries();
  }, []);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await fetch("/api/company/supplier");
        const result = await res.json();
        setSuppliers(
          (result.data || []).map((s: any) => ({ label: s.name, value: s.id }))
        );
      } catch (err) {
        setSuppliers([]);
      }
    };
    fetchSuppliers();
  }, []);

  const generateNextRequestNumber = (requestDateIso: string, existing: Inquiry[]): string => {
    const date = new Date(requestDateIso);
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yy = String(date.getFullYear() % 100).padStart(2, '0');
    const prefix = `INQ-${mm}${yy}`;

    const lastSeq = existing
      .map((d) => d.requestNumber)
      .filter((rn) => typeof rn === 'string' && rn.startsWith(prefix))
      .map((rn) => parseInt(rn.slice(-3), 10))
      .filter((n) => !isNaN(n))
      .reduce((max, n) => (n > max ? n : max), 0);

    const nextSeq = String(lastSeq + 1).padStart(3, '0');
    return `${prefix}${nextSeq}`;
  };

  useEffect(() => {
    if (!open) return;
    setFormData((prev) => ({
      ...prev,
      requestNumber: generateNextRequestNumber(prev.requestDate, data),
      items: (prev.items && prev.items.length > 0) ? prev.items : [{ name: "", qty: 1 } as any],
    }));
  }, [open, formData.requestDate, data]);

  const formFields = [
    { name: "requestDate", label: "Tanggal Permintaan", type: "datetime" },
    { name: "category", label: "Kategori", type: "autocomplete", options: ["BARANG", "PROJECT"] },
    {
      name: "customerId",
      label: "Customer",
      type: "autocomplete",
      options: customers.map((c) => ({ label: c.name, value: c.id })),
    },
    { name: "remarks", label: "Keterangan", type: "textarea" },
    { name: "status", label: "Status", type: "autocomplete", options: ["PENDING", "QUOTED", "ORDERED", "DELIVERED"] },
    { name: "items", label: "Items", type: "items" },
  ];

  const columns = useMemo<MRT_ColumnDef<Inquiry & { customerName?: string }>[]>(() => [
    { accessorKey: "requestNumber", header: "No Permintaan" },
    { accessorKey: "category", header: "Kategori" },
    { accessorKey: "requestDate", header: "Tanggal", Cell: ({ cell }) => new Date(cell.getValue<Date>()).toLocaleDateString() },
    {
      accessorKey: "customerId",
      header: "Customer",
      Cell: ({ cell }) => {
        const cust = customers.find((c) => c.id === cell.getValue<string>());
        return cust ? cust.name : "";
      },
    },
    { accessorKey: "remarks", header: "Keterangan" },
    { accessorKey: "status", header: "Status" },
    {
      header: "Aksi",
      id: "aksi",
      Cell: ({ row }) => (
        <Button size="small" variant="outlined" onClick={() => {
          setSelectedInquiry(row.original);
          setDetailOpen(true);
        }}>
          Detail
        </Button>
      ),
    },
  ], [customers]);

  // handleFormChange dan handleOptionChange tetap
  const handleFormChange = (field: string, value: string | number | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleOptionChange = (field: string, value: string | null) => {
    setFormData({ ...formData, [field]: value || "" });
  };


  const handleSave = async () => {
    try {
      const payload = {
        ...formData,
        requestDate: formData.requestDate,
        items: formData.items,
      };
      const res = await fetch("/api/transaction/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json().catch(() => ({}));
      setData((prev) => [...prev, result.data]);
      setAlertOpen(true);
      toggleDrawer(false)();
    } catch (error) {
      console.error(error.message);
    }
  };


  const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setAlertOpen(false);
  };

  const handleCloseError = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setErrorOpen(false);
  };

  const exportToExcel = () => {
    const exportData = data.map((d) => ({
      ...d,
      requestDate: d.requestDate.toLocaleDateString(),
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Inquiry");
    XLSX.writeFile(workbook, "Inquiry.xlsx");
  };

  const toggleDrawer = (open: boolean) => () => {
    setOpen(open);
  };

  return (
    <PageContainer title="Inquiry">
      <Box sx={{ mb: 2.5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
          <Typography variant="h4">Inquiry</Typography>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Button
              size="medium"
              variant="outlined"
              onClick={exportToExcel}
              sx={{
                fontWeight: 600,
                color: baselightTheme.palette.text.primary,
                borderColor: baselightTheme.palette.grey[400],
              }}
            >
              Export
            </Button>
            <Button
              size="medium"
              variant="contained"
              startIcon={<IconCirclePlus size={20} />}
              onClick={toggleDrawer(true)}
              sx={{
                fontWeight: 500,
                color: "white",
              }}
            >
              Tambah Inquiry
            </Button>
          </Box>
        </Box>
      </Box>

      <DashboardCard>
        <DataTable columns={columns} data={data} pageSize={10} showGlobalFilter={true} />
      </DashboardCard>
      <InquiryDetailDrawer
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        inquiry={selectedInquiry}
      />

      <AddNewDataDrawer
        open={open}
        onClose={setOpen}
        formData={formData}
        handleFormChange={handleFormChange}
        handleOptionChange={handleOptionChange}
        handleSave={handleSave}
        formFields={formFields}
        suppliers={suppliers}
        width={"98%"}
      />

      <Snackbar
        open={alertOpen}
        autoHideDuration={1000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert variant="filled" severity="success" sx={{ color: baselightTheme.palette.success.contrastText, width: "100%" }}>
          Inquiry berhasil disimpan!
        </Alert>
      </Snackbar>

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

export default InquiryPage;

InquiryPage.getLayout = function getLayout(page: React.ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
