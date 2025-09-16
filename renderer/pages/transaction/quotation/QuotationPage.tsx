import { Alert, Box, Button, Snackbar, Typography, IconButton } from "@mui/material";
import { useState, useEffect, useMemo } from "react";
// @ts-ignore - pdfmake has mixed module exports
import pdfMake from "pdfmake/build/pdfmake";
// @ts-ignore - virtual font file doesn't ship types and shape varies by version
import pdfFonts from "pdfmake/build/vfs_fonts";

// Handle both shapes: { vfs } or { pdfMake: { vfs } }
// @ts-ignore
const _fonts: any = pdfFonts;
// @ts-ignore
(pdfMake as any).vfs = _fonts?.vfs || _fonts?.pdfMake?.vfs;

import FullLayout from "../../../src/layouts/full/FullLayout";
import DashboardCard from "../../../src/components/shared/DashboardCard";
import PageContainer from "../../../src/components/container/PageContainer";
import { baselightTheme } from "../../../src/theme/DefaultColors";
import DataTable from "../../../components/DataTable";
import QuotationDetailDrawer from "../../../components/QuotationDetailDrawer";
import AddNewDataDrawer from "../../../components/AddNewDataDrawer";
import { IconPencil, IconFileDownload } from "@tabler/icons-react";
import { MRT_ColumnDef } from "material-react-table";

interface Customer {
  id: string;
  name: string;
  address1?: string;
  address2?: string;
  attnSj?: string;
  phone?: string;
  fax?: string;
}

interface QuotationItemForm {
  id: string;
  name: string;
  qty: number;
  price: number;
  totalPrice?: number;
  remarks: string | null;
  unit?: string;
  detail?: string;
  hpp?: number;
  deliveryTime?: string;
  supplierName?: string;
  markupPercent?: number;
  inquiryItemId?: string;
}

interface QuotationFormData {
  id: string;
  quotationNumber: string;
  createdAt: string;
  customerId: string;
  category?: string;
  remarks: string | null;
  items: QuotationItemForm[];
}

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

const useQuotationFormData = () => {
  const formatDateTimeLocal = (d: Date) => {
    const pad = (n: number) => String(n).padStart(2, '0');
    const yyyy = d.getFullYear();
    const mm = pad(d.getMonth() + 1);
    const dd = pad(d.getDate());
    const hh = pad(d.getHours());
    const mi = pad(d.getMinutes());
    return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
  };

  const [formData, setFormData] = useState<QuotationFormData>({ id: "", quotationNumber: "", createdAt: "", customerId: "", category: undefined, remarks: "", items: []});

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateOptionData = (field: string, value: string | null) => {
    setFormData(prev => ({ ...prev, [field]: value || "" }));
  };

  return { formData, setFormData, updateFormData, updateOptionData, formatDateTimeLocal };
};

const QuotationPage = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState<any | null>(null);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { formData, setFormData, updateFormData, updateOptionData, formatDateTimeLocal } = useQuotationFormData();
  const { customers, fetchCustomers } = useCustomerData();


  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const res = await fetch("/api/transaction/quotation");
        const result = await res.json();
        if (result.success && result.data) {
          setData(result.data);
        } else {
          setData([]);
          console.warn('No data received from API');
        }
      } catch (err: any) {
        console.error('Error fetching quotations:', err);
        setData([]);
        setErrorMessage("Gagal mengambil data quotation");
        setErrorOpen(true);
      }
    };
    fetchQuotations();
    fetchCustomers();
  }, []);

  const handleSave = async () => {
    try {
      const payload = {
        quotationId: formData.id,
        quotationNumber: formData.quotationNumber,
        customerId: formData.customerId,
        createdAt: formData.createdAt,
        category: formData.category,
        remarks: formData.remarks,
        items: formData.items.map(item => ({
          id: item.id,
          name: item.name,
          qty: Number(item.qty),
          price: Number(item.price),
          remarks: item.remarks,
          hpp: Number(item.hpp),
          markupPercent: Number(item.markupPercent),
          inquiryItemId: item.inquiryItemId,
          unit: item.unit,
          detail: item.detail,
          deliveryTime: item.deliveryTime,
          supplierName: item.supplierName,
          via: (item as any).via,
          totalPrice: Number(item.totalPrice ?? (Number(item.qty) * Number(item.price)))
        }))
      };

      const res = await fetch('/api/transaction/quotation', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP error! status: ${res.status} - ${errorText}`);
      }

      const result = await res.json();
      if (!result.success) {
        throw new Error(result.message || 'Gagal memperbarui quotation');
      }

      setData(prevData => prevData.map(q => q.id === result.data.id ? result.data : q));
      if (selectedQuotation && selectedQuotation.id === result.data.id) {
        setSelectedQuotation(result.data);
      }
      setSuccessMessage('Quotation berhasil diperbarui!');
      setSuccessOpen(true);
      setOpen(false);
    } catch (error: any) {
      setErrorMessage(error.message || 'Terjadi kesalahan saat menyimpan quotation');
      setErrorOpen(true);
    }
  };

  const columns = useMemo<MRT_ColumnDef<any>[]>(() => [
    {
      accessorKey: "quotationNumber",
      header: "No Quotation",
      Cell: ({ cell, row }) => (
        <Button
          variant="text"
          onClick={() => {
            setSelectedQuotation(row.original);
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
      accessorKey: "inquiry.category",
      header: "Kategori",
      Cell: ({ row }) => row.original.inquiry?.category || '-',
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
      accessorKey: "customer",
      header: "Customer",
      Cell: ({ row }) => row.original.customer?.name || '-',
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
      Cell: ({ cell, row }) => {
        const status = cell.getValue<string>() || "-";
        const hasPo =
          row.original.purchaseOrders && row.original.purchaseOrders.length > 0;
    
        const getStatusStyle = (hasPo: boolean) => {
          if (hasPo) {
            return {
              border: "2px solid #9E9E9E",
              backgroundColor: "#F5F5F5",
              color: "#9E9E9E",
              fontWeight: 400,
            };
          }
          return {
            border: "2px solid #F44336",
            backgroundColor: "#FFEAEA",
            color: "#F44336",
            fontWeight: 400,
          };
        };
    
        return (
          <Box
            sx={{
              display: "inline-block",
              padding: "4px 12px",
              borderRadius: "16px",
              fontSize: "0.875rem",
              textAlign: "center",
              minWidth: "80px",
              ...getStatusStyle(hasPo),
            }}
          >
            {hasPo ? "PO" : "NO PO"}
          </Box>
        );
      },
      enableColumnFilter: true,
      enableGlobalFilter: true,
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
                setSelectedQuotation(row.original);
                setFormData({
                  id: row.original.id,
                  quotationNumber: row.original.quotationNumber,
                  createdAt: formatDateTimeLocal(new Date(row.original.createdAt)),
                  customerId: row.original.customer?.id || '',
                  category: row.original.inquiry?.category || undefined,
                  remarks: row.original.remarks,
                  items: row.original.items?.map((item: any) => {
                    const hpp = Number(item.inquiryItem?.hpp) || 0;
                    const markupPercent = Number(item.inquiryItem?.markupPercent) || 0;
                    const price = hpp + (hpp * markupPercent / 100);
                    const qty = Number(item.qty);
                    const totalPrice = qty * price;

                    return {
                      id: item.id,
                      name: item.name,
                      qty: qty,
                      price: price,
                      remarks: item.remarks,
                      totalPrice: totalPrice,
                      unit: item.inquiryItem?.unit || '',
                      detail: item.inquiryItem?.detail || '',
                      hpp: hpp,
                      deliveryTime: item.inquiryItem?.deliveryTime ? new Date(item.inquiryItem.deliveryTime).toISOString().slice(0,10) : '-',
                      supplierName: item.inquiryItem?.supplier?.name || '',
                      markupPercent: markupPercent,
                      inquiryItemId: item.inquiryItemId,
                    };
                  }) || []
                });
                setOpen(true);
              }}
            >
            <IconPencil fontSize="small" />
          </IconButton>
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
                handleDownloadPdf(row.original);
            }}
          >
            <IconFileDownload fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ], [formatDateTimeLocal, setFormData]);

  const formFields = [
    { name: "quotationNumber", label: "No Quotation", type: "basictext" },
    { name: "createdAt", label: "Tanggal", type: "datetime" },
    { name: "category", label: "Kategori", type: "autocomplete", options: ["BARANG", "PROJECT"] },
    {
      name: "customerId",
      label: "Customer",
      type: "autocomplete",
      options: customers.map((c) => ({ label: c.name, value: c.id })),
    },
    { name: "remarks", label: "Keterangan", type: "basictext" },
    { 
      name: "items", 
      label: "Items", 
      type: "items",
      itemFields: [
        { name: 'supplierName', label: 'Supplier', type: 'text' },
        { name: 'name', label: 'Nama', type: 'text' },
        { name: 'detail', label: 'Detail', type: 'text' },
        { name: 'deliveryTime', label: 'Waktu Pengiriman', type: 'text'  },
        { name: 'remarks', label: 'Catatan', type: 'text' },
        { name: 'qty', label: 'Qty', type: 'number' },
        { name: 'unit', label: 'Satuan', type: 'text'},
        { name: 'price', label: 'Harga', type: 'number' },
        { name: 'totalPrice', label: 'Total Harga', type: 'number', readOnly: true, isCalculated: true, calculation: (item: QuotationItemForm) => (item.qty || 0) * (item.price || 0) },
        { name: 'hpp', label: 'HPP/Satuan', type: 'number' },
        { name: 'markupPercent', label: 'UP TO %', type: 'number' },
        { name: 'category', label: 'Kategori', type: 'text' },
      ]
    },
  ];


  const handleCloseError = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setErrorOpen(false);
  };

  const handleCloseSuccess = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setSuccessOpen(false);
  };

  const handleCreatePo = async (selectedIndexes: Set<number>, qtyByIndex: Record<number, number>, poPriceByIndex: Record<number, number>, poNumber: string) => {
    try {
      console.log('QuotationPage - Creating PO with:', {
        selectedQuotation,
        selectedIndexes: Array.from(selectedIndexes),
        qtyByIndex,
        poPriceByIndex,
        poNumber
      });

      if (!poNumber.trim()) {
        throw new Error('Nomor PO harus diisi');
      }

      if (selectedIndexes.size === 0) {
        throw new Error('Minimal pilih satu item');
      }

      if (!selectedQuotation) {
        throw new Error('Quotation tidak ditemukan');
      }

      // Validate selected items
      for (const idx of Array.from(selectedIndexes)) {
        const qty = qtyByIndex[idx] || 0;
        const poPrice = poPriceByIndex[idx] || 0;
        
        if (qty <= 0) {
          throw new Error(`Quantity item ${idx + 1} harus lebih dari 0`);
        }
        
        if (poPrice <= 0) {
          throw new Error(`Harga PO item ${idx + 1} harus lebih dari 0`);
        }
      }

      // Create PO data
      const poData = {
        quotationId: selectedQuotation.id,
        quotationNumber: selectedQuotation.quotationNumber,
        poNumber: poNumber.trim(),
        customerId: selectedQuotation.customerId,
        customerName: selectedQuotation.customer?.name,
        items: Array.from(selectedIndexes).map((idx: number) => {
          const item = selectedQuotation.items[idx];
          return {
            name: item.name,
            qty: qtyByIndex[idx],
            unit: item.inquiryItem?.unit || '-',
            poPrice: poPriceByIndex[idx],
            totalPoPrice: qtyByIndex[idx] * poPriceByIndex[idx]
          };
        }),
        status: 'DRAFT'
      };

      console.log('QuotationPage - PO data to send:', poData);

      // Test with simple endpoint first
      const testRes = await fetch("/api/test-po", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(poData),
      });
      
      console.log('Test PO response:', await testRes.json());
      
      const res = await fetch("/api/transaction/po", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(poData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP error! status: ${res.status} - ${errorText}`);
      }

      const result = await res.json();
      if (!result.success) throw new Error(result.message || 'Failed to create PO');
      
      setSuccessMessage(`PO ${poNumber} berhasil dibuat`);
      setSuccessOpen(true);
      setDetailOpen(false);
      
    } catch (error: any) {
      console.error('Error creating PO:', error);
      setErrorMessage(error.message || 'Gagal membuat PO');
      setErrorOpen(true);
    }
  };

  const handleDownloadPdf = async (quotation: any) => {
    try {
      const currency = (v: any) => {
        const n = Number(v ?? 0);
        if (!isFinite(n)) return "-";
        return n.toLocaleString("id-ID");
      };

      const logoDataUrl = await (async () => {
        try {
          const res = await fetch("/images/logos/logo.png");
          const blob = await res.blob();
          return await new Promise<string | undefined>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(typeof reader.result === 'string' ? reader.result : undefined);
            reader.readAsDataURL(blob);
          });
        } catch {
          return undefined;
        }
      })();

      const signatureDataUrl = await (async () => {
        try {
          const res = await fetch("/images/logos/ttd.jpg");
          const blob = await res.blob();
          return await new Promise<string | undefined>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(typeof reader.result === 'string' ? reader.result : undefined);
            reader.readAsDataURL(blob);
          });
        } catch {
          return undefined;
        }
      })();

      const leftInfo = [
        {
          table: {
            widths: [30, 10, '*'],
            body: [
              [
              { text: "No.", bold: true, fontSize: 10 },
              { text: ":", alignment: 'center', fontSize: 10 },
              { text: String(quotation?.quotationNumber || ""), fontSize: 10 }
              ]
            ],
            heights: [12]
          },
          layout: 'noBorders'
        },
        { text: "Kepada Yth,", fontSize: 10 },
        { text: String(quotation?.customer?.name || "-"), bold: true, fontSize: 10},
        { text: String(quotation?.customer?.address1 || ""), fontSize: 10 },
        { text: String(quotation?.customer?.address2 || ""), fontSize: 10 },
        {
          table: {
            widths: [30, 10, '*'],
            body: [
              [
                { text: "UP", fontSize: 10 },
                { text: ":", alignment: 'center', fontSize: 10 },
                { text: String(quotation?.customer?.attnSj || ""), fontSize: 10 }
              ],
              [
                { text: "Telp", fontSize: 10 },
                { text: ":", alignment: 'center', fontSize: 10 },
                { text: String(quotation?.customer?.phone || "0267-645404/021-8900240,8900843-44"), fontSize: 10 }
              ],
              [
                { text: "Fax", fontSize: 10 },
                { text: ":", alignment: 'center', fontSize: 10 },
                { text: String(quotation?.customer?.fax || "0267-646124"), fontSize: 10 }
              ]
            ],
            heights: [8, 8, 8]
          },
          layout: 'noBorders'
        },{
          text: " ", fontSize: 5
        },
        { text: "Dengan hormat,", fontSize: 10 },
        { text: "Dibawah ini kami kirimkan Penawaran Harga sebagai berikut :", fontSize: 10 },
        
      ];
      const rightInfo = [
        { text: new Date().toLocaleDateString('id-ID'), fontSize: 10, alignment: 'right' }
      ];


      const itemsBody = [
        [
          { text: 'No.', bold: true, alignment: 'center', fontSize: 10},
          { text: 'Keterangan', bold: true, alignment: 'center', verticalAlignment: 'middle', fontSize: 10 },
          { text: 'Jumlah', bold: true, alignment: 'center', verticalAlignment: 'middle', fontSize: 10 },
          { text: 'Harga Satuan (IDR)', bold: true, alignment: 'center', fontSize: 10 },
          { text: 'Total Harga'+' '+' '+'(IDR)', bold: true, alignment: 'center', fontSize: 10 }
        ],
      ];

      const maxItems = 10;
      for (let index = 0; index < maxItems; index++) {
        if (quotation.items && quotation.items[index]) {
          const item = quotation.items[index];
          const inquiryItem = item.inquiryItem || {};
          const nama = item.name || inquiryItem.name || '-';
          const qty = item.qty || inquiryItem.qty || 0;
          const satuan = inquiryItem.unit || '-';
          const harga = item.price || 0;
          const totalHarga = item.totalPrice || (qty * harga);
          
          itemsBody.push([
            { text: String(index + 1), alignment: 'center', fontSize: 10 } as any,
            { text: String(nama), verticalAlignment: 'middle', fontSize: 10 } as any,
            { text: String(qty + ' ' + satuan), alignment: 'center', verticalAlignment: 'middle', fontSize: 10 } as any,
            { text: currency(harga), alignment: 'right', fontSize: 10 } as any,
            { text: currency(totalHarga), alignment: 'right', fontSize: 10 } as any
          ]);
        } else {
          // Add empty row for remaining items without number
          itemsBody.push([
            { text: '', alignment: 'center', fontSize: 10 } as any,
            { text: '', verticalAlignment: 'middle', fontSize: 10 } as any,
            { text: '', alignment: 'center', verticalAlignment: 'middle', fontSize: 10 } as any,
            { text: '', alignment: 'right', fontSize: 10 } as any,
            { text: '', alignment: 'right', fontSize: 10 } as any
        ]);
        }
      }
      const subtotal = quotation.items?.reduce((sum: number, item: any) => 
        sum + (Number(item.totalPrice) || 0), 0) || 0;

      const docDefinition: any = {
        pageSize: 'A4',
        pageMargins: [30, 30, 30, 30],
        content: [
          logoDataUrl ? { image: logoDataUrl, width: 380, margin: [0, 0, 0, 0] } : {},
          { canvas: [ { type: 'line', x1: 0, y1: 0, x2: 535, y2: 0, lineWidth: 2 } ], margin: [0, 4, 0, 0]},
          { canvas: [ { type: 'line', x1: 0, y1: 0, x2: 535, y2: 0, lineWidth: 1 } ], margin: [0, 3, 0, 0] },
          { text: 'PENAWARAN HARGA', style: 'title', bold: true, margin: [0, 10, 0, 0], fontSize: 11 },
          {
            columns: [
              { width: '*', text: '' },
              { width: 140, canvas: [ { type: 'line', x1: 0, y1: 0, x2: 140, y2: 0, lineWidth: 1 } ] },
              { width: '*', text: '' },
            ],
            margin: [0, 0, 0, 8]
          },
          {
            columns: [
              { stack: leftInfo, width: '70%' },
              { stack: rightInfo, width: '30%' }
            ],
            margin: [0, 0, 0, 8]
          },
          {
            table: {
              widths: [20, '*', 50, 80, 80],
              body: [
                ...itemsBody,
                [
                  { text: '', colSpan: 3, border: [false, false, false, false] },
                  { text: '' },
                  { text: '' },
                  { text: 'Sub.Total:', fontSize: 10, alignment: 'left', border: [true, true, false, true] },
                  { text: `Rp ${currency(subtotal)}`, fontSize: 10, alignment: 'right', border: [false, true, true, true] }
                ],
                [
                  { text: '', colSpan: 3, border: [false, false, false, false] },
                  { text: '' },
                  { text: '' },
                  { text: 'DPP PPN', fontSize: 10, alignment: 'left', border: [true, true, false, true] },
                  { text: `Rp ${currency(subtotal)}`, fontSize: 10, alignment: 'right', border: [false, false, true, true] }
                ],
                [
                  { text: '', colSpan: 3, border: [false, false, false, false] },
                  { text: '' },
                  { text: '' },
                  { text: 'PPN 12%', fontSize: 10, alignment: 'left', border: [true, true, false, true] },
                  { text: `Rp ${currency(subtotal * 0.12)}`, fontSize: 10, alignment: 'right', border: [false, false, true, true] }
                ],
                [
                  { text: '', colSpan: 3, border: [false, false, false, false] },
                  { text: '' },
                  { text: '' },
                  { text: 'Grand Total', fontSize: 10, alignment: 'left', bold: true, border: [true, true, false, true] },
                  { text: `Rp ${currency(subtotal * 1.12)}`, fontSize: 10, alignment: 'right', bold: true, border: [false, false, true, true] }
                ]
              ],
              fontSize: 10,
              heights: (rowIndex: number) => {
                if (rowIndex === 0) return 20; // Header
                if (rowIndex <= itemsBody.length - 1) return 16; // Data rows
                return 14; // Summary rows
              },
            },
            layout: {
              hLineWidth: (i: number, node: any) => {
                const isTop = i === 0;
                const isHeaderBottom = i === 1;
                const isDataEnd = i === itemsBody.length;
                const isBottom = i === node.table.body.length;
                return (isTop || isHeaderBottom || isDataEnd || isBottom) ? 1 : 0;
              },
              vLineWidth: () => 1,
            },
            margin: [0, 0, 0, 8]
          },
          {
            columns: [
              {
                width: '*',
                stack: [
                  { text: 'Keterangan:', bold: true, fontSize: 11, margin: [0, 0, 0, 4] },
                  {
                    table: {
                      widths: [100, 5, 200],
                      body: [
                        [
                          { text: 'Tempat Pengiriman', fontSize: 11, border: [false, false, false, false] },
                          { text: ':', fontSize: 11, alignment: 'center', border: [false, false, false, false] },
                          { text: String(quotation?.customer?.name || '-'), fontSize: 11, border: [false, false, false, false] }
                        ],
                        [
                          { text: 'Waktu Pengiriman', fontSize: 11, border: [false, false, false, false] },
                          { text: ':', fontSize: 11, alignment: 'center', border: [false, false, false, false] },
                          { text: String(quotation?.items?.[0]?.inquiryItem?.deliveryTime ? new Date(quotation.items[0].inquiryItem.deliveryTime).toLocaleDateString() : '-'), fontSize: 11, border: [false, false, false, false] }
                        ],
                        [
                          { text: 'Syarat Pembayaran', fontSize: 11, border: [false, false, false, false] },
                          { text: ':', fontSize: 11, alignment: 'center', border: [false, false, false, false] },
                          { text: '30 hari setelah invoice diterima', fontSize: 11, border: [false, false, false, false] }
                        ],
                        [
                          { text: 'Batas Penawaran', fontSize: 11, border: [false, false, false, false] },
                          { text: ':', fontSize: 11, alignment: 'center', border: [false, false, false, false] },
                          { text: '7 hari setelah tanggal penawaran', fontSize: 11, border: [false, false, false, false] }
                        ],
                        [
                          { text: 'Catatan', fontSize: 11, border: [false, false, false, false] },
                          { text: ':', fontSize: 11, alignment: 'center', border: [false, false, false, false] },
                          { text: String(quotation?.remarks || '-'), fontSize: 11, border: [false, false, false, false] }
                        ]
                      ],
                      layout: 'noBorders'
                    }
                  }
                ]
              },
              {
                
                text: ''  
              }
            ]
          },
          {
            columns: [
              { 
                width: 200, 
                stack: [
                  { text: 'Hormat kami,', fontSize: 10, margin: [0, 16, 0, 0] },
                  signatureDataUrl ? { image: signatureDataUrl, width: 80, height: 40 } : {},
                  { text: 'ROBINSON', fontSize: 10, margin: [0, 0, 0, 0] }
                ]
              },
              { width: '*', text: '' }
            ],
            margin: [0, 16, 0, 0]
          }

        ],
        styles: {
          title: { fontSize: 11, extraBold: true, alignment: 'center' }
        }
      };

      // Preview: open in new window. User can print or save.
      pdfMake.createPdf(docDefinition).open();
    } catch (error) {
      console.error('Error generating PDF:', error);
      setErrorMessage('Gagal membuat PDF. Silakan coba lagi.');
      setErrorOpen(true);
    }
  };


  return (
    <PageContainer title="Quotation">
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="h4">Quotation</Typography>
      </Box>
      <DashboardCard>
        <DataTable columns={columns} data={data} pageSize={10} showGlobalFilter={true} />
      </DashboardCard>
      <QuotationDetailDrawer
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        quotation={selectedQuotation}
        handleCreatePo={handleCreatePo}
      />
      <AddNewDataDrawer
        open={open}
        onClose={() => setOpen(false)}
        formData={formData}
        handleFormChange={updateFormData}
        handleOptionChange={updateOptionData}
        handleSave={handleSave}
        formFields={formFields}
        width={"98%"}
        variant="quotation"
      />
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
 
 QuotationPage.getLayout = function getLayout(page: React.ReactElement) {
   return <FullLayout>{page}</FullLayout>;
 };
 
 export default QuotationPage;
