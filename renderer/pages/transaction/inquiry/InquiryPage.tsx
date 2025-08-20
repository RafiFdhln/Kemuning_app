import { Alert, Box, Button, Link, Snackbar, Typography } from "@mui/material";
import FullLayout from "../../../src/layouts/full/FullLayout";
import DashboardCard from "../../../src/components/shared/DashboardCard";
import PageContainer from "../../../src/components/container/PageContainer";
import { baselightTheme } from "../../../src/theme/DefaultColors";
import DataTable from "../../../components/DataTable";
import { MRT_ColumnDef } from "material-react-table";
import { useMemo, useState, useEffect } from "react";
import { IconCirclePlus, IconFileInvoice } from "@tabler/icons-react";
import AddNewDataDrawer from "../../../components/AddNewDataDrawer";
import * as XLSX from "xlsx";

type Inquiry = {
  requestNumber: string;
  requestDate: Date;
  customer: string;
  remarks: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  noQuotation: boolean;
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
};

const InquiryPage = () => {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [data, setData] = useState<Inquiry[]>([]);
  const [customers, setCustomers] = useState<{ id: string; name: string }[]>([]);

  const [formData, setFormData] = useState<
    Omit<Inquiry, "requestDate" | "items" | "customer"> & { requestDate: string; items: InquiryItem[]; customerId: string }
  >({
    requestNumber: "",
    requestDate: new Date().toISOString(),
    customerId: "",
    remarks: "",
    status: "PENDING",
    noQuotation: false,
    items: [],
  });

  // Fetch customer list
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

  // Fetch inquiry list dari API
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

  // Update formFields: customerId autocomplete
  const formFields = [
    { name: "requestNumber", label: "Nomor Permintaan", type: "text" },
    { name: "requestDate", label: "Tanggal Permintaan", type: "datetime" },
    {
      name: "customerId",
      label: "Customer",
      type: "autocomplete",
      options: customers.map((c) => ({ label: c.name, value: c.id })),
    },
    { name: "remarks", label: "Keterangan", type: "textarea" },
    { name: "status", label: "Status", type: "autocomplete", options: ["PENDING", "APPROVED", "REJECTED"] },
    { name: "noQuotation", label: "Tanpa Quotation", type: "autocomplete", options: [true, false] },
    { name: "items", label: "Items", type: "items" },
  ];

  // Tampilkan nama customer di tabel
  const columns = useMemo<MRT_ColumnDef<Inquiry & { customerName?: string }>[]>(() => [
    { accessorKey: "requestNumber", header: "No Permintaan" },
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
    { accessorKey: "noQuotation", header: "Tanpa Quotation", Cell: ({ cell }) => (cell.getValue<boolean>() ? "Ya" : "Tidak") },
    {
      header: "Aksi",
      id: "aksi",
      Cell: ({ row }) => (
        <Button size="small" variant="outlined" onClick={() => alert(JSON.stringify(row.original, null, 2))}>
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

  // const handleSave = () => {
  //   const newInquiry: Inquiry = {
  //     ...formData,
  //     requestDate: new Date(formData.requestDate),
  //     // noQuotation: formData.noQuotation === true || formData.noQuotation === "true",
  //   };

  //   setData((prev) => [...prev, newInquiry]);
  //   setAlertOpen(true);
  //   toggleDrawer(false)();
  // };
  // const handleSave = async () => {
  //   try {
  //     const response = await fetch('/api/transaction/inquiry', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(formData),
  //     });

  //     if (!response.ok) throw new Error('Gagal menyimpan pemasok');

  //     const result = await response.json();
  //     setData((prev) => [...prev, result.data]);
  //     setAlertOpen(true);
  //     toggleDrawer(false)();
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };
  const handleSave = async () => {
  try {
    const payload = {
      ...formData,
      requestDate: formData.requestDate,
      noQuotation: Boolean(formData.noQuotation),
      items: formData.items,
    };
    const res = await fetch("/api/transaction/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Gagal menyimpan Inquiry");
    const result = await res.json();
    setData((prev) => [...prev, result.data]);
    setAlertOpen(true);
    toggleDrawer(false)();
  } catch (err: any) {
    console.error("Error saving inquiry:", err.message);
  }
};


  const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setAlertOpen(false);
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

      <AddNewDataDrawer
        open={open}
        onClose={setOpen}
        formData={formData}
        handleFormChange={handleFormChange}
        handleOptionChange={handleOptionChange}
        handleSave={handleSave}
        formFields={formFields}
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
    </PageContainer>
  );
};

export default InquiryPage;

InquiryPage.getLayout = function getLayout(page: React.ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
