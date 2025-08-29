import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
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

// Interfaces
interface Inquiry {
  id: string;
  requestNumber: string;
  requestDate: Date;
  category: "BARANG" | "PROJECT";
  customer: Customer;
  remarks: string;
  status: "PENDING" | "QUOTED" | "ORDERED" | "DELIVERED";
  items: InquiryItem[];
}

interface Customer {
  id: string;
  name: string;
}

interface InquiryItem {
  name: string;
  brand?: string;
  status?: string;
  qty: number;
  unit?: string;
  hpp?: number;
  totalHpp?: number;
  markupPercent?: number;
  priceAfterUp?: number;
  sellingPrice?: number;
  totalPrice?: number;
  poPrice?: number;
  notes?: string;
  deliveryTime?: string;
  supplierId?: string;
  supplierName?: string;
}

interface FormData {
  id: string;
  requestNumber: string;
  requestDate: string;
  category: "BARANG" | "PROJECT";
  customerId: string;
  remarks: string;
  status: "PENDING" | "QUOTED" | "ORDERED" | "DELIVERED";
  items: InquiryItem[];
}

// Custom hooks
const useInquiryData = () => {
  const [data, setData] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/transaction/inquiry");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      
      const result = await res.json();
      if (result.success && result.data) {
        setData(result.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const addInquiry = (inquiry: Inquiry) => {
    setData(prev => [...prev, inquiry]);
  };

  const updateInquiryStatus = (requestNumber: string, status: string) => {
    setData(prev => prev.map(d => 
      d.requestNumber === requestNumber ? { ...d, status: status as any } : d
    ));
  };

  return { data, loading, fetchInquiries, addInquiry, updateInquiryStatus };
};

const useCustomerData = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const fetchCustomers = async () => {
    try {
      const res = await fetch("/api/company/customer");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      
      const result = await res.json();
      if (result.success && result.data) {
        setCustomers(result.data);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      setCustomers([]);
    }
  };

  return { customers, fetchCustomers };
};

const useSupplierData = () => {
  const [suppliers, setSuppliers] = useState<{ label: string; value: string }[]>([]);

  const fetchSuppliers = async () => {
    try {
      const res = await fetch("/api/company/supplier");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      
      const result = await res.json();
      if (result.success && result.data) {
        setSuppliers(result.data.map((s: any) => ({ label: s.name, value: s.id })));
      }
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      setSuppliers([]);
    }
  };

  return { suppliers, fetchSuppliers };
};

const useFormData = () => {
  const formatDateTimeLocal = (d: Date) => {
    const pad = (n: number) => String(n).padStart(2, '0');
    const yyyy = d.getFullYear();
    const mm = pad(d.getMonth() + 1);
    const dd = pad(d.getDate());
    const hh = pad(d.getHours());
    const mi = pad(d.getMinutes());
    return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
  };

  const [formData, setFormData] = useState<FormData>({
    id: "",
    requestNumber: "",
    requestDate: formatDateTimeLocal(new Date()),
    category: "BARANG",
    customerId: "",
    remarks: "",
    status: "PENDING",
    items: [],
  });

  const resetFormData = () => {
    setFormData({
      id: "",
      requestNumber: "",
      requestDate: formatDateTimeLocal(new Date()),
      category: "BARANG",
      customerId: "",
      remarks: "",
      status: "PENDING",
      items: [{ name: "", qty: 1 } as any],
    });
  };

  const updateFormData = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateOptionData = (field: string, value: string | null) => {
    setFormData(prev => ({ ...prev, [field]: value || "" }));
  };

  return { formData, setFormData, resetFormData, updateFormData, updateOptionData, formatDateTimeLocal };
};

// Utility functions
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

const exportToExcel = (data: Inquiry[]) => {
  const exportData = data.map((d) => ({
    requestNumber: d.requestNumber || 'N/A',
    requestDate: d.requestDate ? new Date(d.requestDate).toLocaleDateString() : 'N/A',
    category: d.category || 'N/A',
    customer: d.customer?.name || 'N/A',
    status: d.status || 'N/A',
    remarks: d.remarks || 'N/A',
  }));
  
  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data Inquiry");
  XLSX.writeFile(workbook, "Inquiry.xlsx");
};

// Main component
const InquiryPage = () => {
  // State
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  // Custom hooks
  const { data, loading, fetchInquiries, addInquiry, updateInquiryStatus } = useInquiryData();
  const { customers, fetchCustomers } = useCustomerData();
  const { suppliers, fetchSuppliers } = useSupplierData();
  const { formData, setFormData, resetFormData, updateFormData, updateOptionData, formatDateTimeLocal } = useFormData();

  // Effects
  useEffect(() => {
    fetchInquiries();
    fetchCustomers();
    fetchSuppliers();
  }, []);

  useEffect(() => {
    if (!open) return;
    setFormData(prev => ({
      ...prev,
      requestNumber: generateNextRequestNumber(prev.requestDate, data),
      items: (prev.items && prev.items.length > 0) ? prev.items : [{ name: "", qty: 1 } as any],
    }));
  }, [open, formData.requestDate, data]);

  // Event handlers
  const handleSave = async () => {
    try {
      // Validation
      if (!formData.customerId) throw new Error('Customer harus dipilih');
      if (!formData.requestDate) throw new Error('Tanggal permintaan harus diisi');
      if (!formData.items || formData.items.length === 0) throw new Error('Minimal satu item harus ditambahkan');
      
      for (let i = 0; i < formData.items.length; i++) {
        const item = formData.items[i];
        if (!item.name || item.name.trim() === '') throw new Error(`Nama item pada baris ${i + 1} harus diisi`);
        if (!item.qty || item.qty <= 0) throw new Error(`Quantity item pada baris ${i + 1} harus lebih dari 0`);
      }
      
      const payload = { ...formData, requestDate: formData.requestDate };
      
      const res = await fetch("/api/transaction/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP error! status: ${res.status} - ${errorText}`);
      }
      
      const result = await res.json();
      if (!result.success) throw new Error(result.message || 'Failed to save inquiry');
      
      if (result.data) {
        const normalizedInquiry = {
          ...result.data,
          requestNumber: result.data.requestNumber || '',
          requestDate: result.data.requestDate ? new Date(result.data.requestDate) : new Date(),
          category: result.data.category || 'BARANG',
          customer: result.data.customer || { id: '', name: '' },
          remarks: result.data.remarks || '',
          status: result.data.status || 'PENDING',
          items: result.data.items || []
        };
        
        addInquiry(normalizedInquiry);
        setAlertOpen(true);
        toggleDrawer(false)();
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'Terjadi kesalahan saat menyimpan inquiry');
      setErrorOpen(true);
    }
  };

  const handleCreateQuotation = async (inquiry: Inquiry) => {
    if (!inquiry) return;
    try {
      const itemsPayload = (inquiry.items || []).map((item: any) => ({
        inquiryItemId: item.id || null,
        name: item.name,
        qty: Number(item.qty) || 0,
        price: Number(item.sellingPrice) || 0,
        totalPrice: Number(item.totalPrice ?? ((Number(item.qty) || 0) * (Number(item.sellingPrice) || 0))) || 0,
        remarks: item.notes || null,
      }));
      const res = await fetch("/api/transaction/quotation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inquiryId: inquiry.id, items: itemsPayload }),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message || 'Gagal membuat quotation');
      
      updateInquiryStatus(inquiry.requestNumber, "QUOTED");
      setAlertOpen(true);
      setDetailOpen(false);
    } catch (error: any) {
      setErrorMessage(error.message || 'Gagal membuat quotation');
      setErrorOpen(true);
    }
  };

  const handleCloseAlert = () => setAlertOpen(false);
  const handleCloseError = () => setErrorOpen(false);
  const toggleDrawer = (open: boolean) => () => {
    if (open) resetFormData();
    setOpen(open);
  };

  // Table columns
  const columns = useMemo<MRT_ColumnDef<Inquiry>[]>(() => [
    { 
      accessorKey: "requestNumber", 
      header: "No Permintaan",
      Cell: ({ cell }) => cell.getValue<string>() || '-',
      enableColumnFilter: true,
      enableGlobalFilter: true
    },
    { 
      accessorKey: "category", 
      header: "Kategori",
      Cell: ({ cell }) => cell.getValue<string>() || '-',
      enableColumnFilter: true,
      enableGlobalFilter: true
    },
    { 
      accessorKey: "requestDate", 
      header: "Tanggal", 
      Cell: ({ cell }) => {
        const value = cell.getValue<Date>();
        return value ? new Date(value).toLocaleDateString() : '-';
      },
      enableColumnFilter: true,
      enableGlobalFilter: true
    },
    {
      accessorKey: "customer",
      header: "Customer",
      Cell: ({ cell }) => {
        const customer = cell.getValue<Customer>();
        return customer?.name || '-';
      },
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
        <Button 
          size="small" 
          variant="outlined" 
          onClick={() => {
            setSelectedInquiry(row.original);
            setDetailOpen(true);
          }}
        >
          Detail
        </Button>
      ),
    },
  ], []);

  // Form fields
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

  return (
    <PageContainer title="Inquiry">
      <Box sx={{ mb: 2.5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
          <Typography variant="h4">Inquiry</Typography>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Button
              size="medium"
              variant="outlined"
              onClick={() => exportToExcel(data)}
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
              sx={{ fontWeight: 500, color: "white" }}
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
        handleCreateQuotation={handleCreateQuotation}
      />

      <AddNewDataDrawer
        open={open}
        onClose={setOpen}
        formData={formData}
        handleFormChange={updateFormData}
        handleOptionChange={updateOptionData}
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