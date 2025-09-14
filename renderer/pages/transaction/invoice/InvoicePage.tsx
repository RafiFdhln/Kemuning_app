import { Box, Button, Snackbar, Alert, Typography } from "@mui/material";
// @ts-ignore - pdfmake has mixed module exports
import pdfMake from "pdfmake/build/pdfmake";
// @ts-ignore - virtual font file doesn't ship types and shape varies by version
import pdfFonts from "pdfmake/build/vfs_fonts";

// Handle both shapes: { vfs } or { pdfMake: { vfs } }
// @ts-ignore
const _fonts: any = pdfFonts;
// @ts-ignore
(pdfMake as any).vfs = _fonts?.vfs || _fonts?.pdfMake?.vfs;
import { useEffect, useMemo, useState } from "react";
import FullLayout from "../../../src/layouts/full/FullLayout";
import DashboardCard from "../../../src/components/shared/DashboardCard";
import PageContainer from "../../../src/components/container/PageContainer";
import DataTable from "../../../components/DataTable";
import { MRT_ColumnDef } from "material-react-table";

type RowType = any;

const InvoiceAndDeliveryPage = () => {
  const [data, setData] = useState<RowType[]>([]);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/transaction/invoice-and-delivery");
        if (!res.ok) throw new Error("Gagal mengambil data");
        const result = await res.json();
        setData(result?.data || []);
      } catch (err: any) {
        setErrorMessage(err?.message || "Gagal mengambil data");
        setErrorOpen(true);
        setData([]);
      }
    };
    fetchData();
  }, []);

  const handleDownloadPdf = async (row: RowType) => {
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

    const leftInfo = [
      { text: "Kepada Yth," },
      { text: String(row?.customer?.name || "-") },
      { text: String(row?.customer?.address || "") },
      { text: String(row?.customer?.city || "") },
    ];

    const rightInfo = [
      [{ text: "No." }, { text: String(row?.invoiceNumber || "-") }],
      [{ text: "Tanggal" }, { text: row?.invoiceDate ? new Date(row.invoiceDate).toLocaleDateString() : "-" }],
      [{ text: "No. PO" }, { text: String(row?.poNumber || "-") }],
      [{ text: "No. Surat Jalan" }, { text: String(row?.doNumber || "-") }],
      [{ text: "Cara Pembayaran" }, { text: String(row?.paymentTerm || "-") }],
    ];

    const itemsBody = [
      [
        { text: 'No.', bold: true, alignment: 'center' },
        { text: 'Nama Barang', bold: true, alignment: 'center', verticalAlignment: 'middle' },
        { text: 'Jumlah', bold: true, alignment: 'center', verticalAlignment: 'middle' },
        { text: 'Harga Satuan (IDR)', bold: true, alignment: 'center' },
        { text: 'Total Harga (IDR)', bold: true, alignment: 'center' }
      ],
      [
        { text: '1', alignment: 'center' },
        { text: String(row?.itemName || '-'), verticalAlignment: 'middle' },
        { text: String((row?.poQty ?? '-') + ' ' + (row?.unit || '')), alignment: 'center', verticalAlignment: 'middle' },
        { text: currency(row?.quotationPricePerUnit), alignment: 'right' },
        { text: currency(row?.totalInvoice), alignment: 'right' }
      ],
    ];

    // Ensure item table fills the page by padding with empty rows
    const minimumVisibleItemRows = 7; // excludes header
    const existingItemRows = itemsBody.length - 1; // exclude header index 0
    for (let i = existingItemRows + 1; i <= minimumVisibleItemRows; i++) {
      itemsBody.push([
        { text: String(i), alignment: 'center' },
        { text: '', alignment: 'center' },
        { text: '', alignment: 'center' },
        { text: '', alignment: 'right' },
        { text: '', alignment: 'right' },
      ]);
    }

    const totalsTable = {
      table: {
        widths: [ 90, 100 ],
        body: [
          [
            { text: 'Sub. Total', bold: true },
            { columns: [ { text: 'Rp', alignment: 'left', width: 24 }, { text: currency(row?.subTotal), alignment: 'right' } ] }
          ],
          [
            { text: 'DPP PPN', bold: true },
            { columns: [ { text: 'Rp', alignment: 'left', width: 24 }, { text: currency(row?.dppPpn), alignment: 'right' } ] }
          ],
          [
            { text: 'PPN 12%', bold: true },
            { columns: [ { text: 'Rp', alignment: 'left', width: 24 }, { text: currency(row?.ppn12), alignment: 'right' } ] }
          ],
          [
            { text: 'GRAND TOTAL', bold: true },
            { columns: [ { text: 'Rp', alignment: 'left', width: 24 }, { text: currency(row?.grandTotal), alignment: 'right' } ] }
          ],
        ]
      },
      layout: 'bordered',
    } as const;

    const docDefinition: any = {
      pageSize: 'A4',
      pageMargins: [40, 40, 40, 40],
      content: [
        logoDataUrl ? { image: logoDataUrl, width: 380, margin: [0, 0, 0, 0] } : {},
        { canvas: [ { type: 'line', x1: 0, y1: 0, x2: 555, y2: 0, lineWidth: 2 } ], margin: [0, 4, 0, 0]},
        { canvas: [ { type: 'line', x1: 0, y1: 0, x2: 555, y2: 0, lineWidth: 1 } ], margin: [0, 3, 0, 0] },
        { text: 'FAKTUR PENJUALAN', style: 'title', bold: true, margin: [0, 12, 0, 0] },
        {
          columns: [
            { width: '*', text: '' },
            { width: 280, canvas: [ { type: 'line', x1: 0, y1: 0, x2: 280, y2: 0, lineWidth: 2 } ] },
            { width: '*', text: '' },
          ],
          margin: [0, 0, 0, 16]
        },
        {
          columns: [
            { width: '*', stack: leftInfo },
            { width: 220, table: { widths: [120, '*'], body: rightInfo }, layout: 'noBorders' },
          ],
          margin: [0, 0, 0, 8]
        },
        {
          table: {
            widths: [20, '*', 55, 90, 100],
            body: itemsBody,
            heights: (rowIndex: number) => (rowIndex === 0 ? 22 : 26),
          },
          layout: {
            hLineWidth: (i: number, node: any) => {
              const isTop = i === 0;
              const isHeaderBottom = i === 1; // line after header
              const isBottom = i === node.table.body.length;
              return (isTop || isHeaderBottom || isBottom) ? 1 : 0;
            },
            vLineWidth: () => 1,
          },
          margin: [0, 0, 0, 8]
        },
        {
          columns: [
            { width: '*', stack: [
              { text: 'Pembayaran harap ditransfer ke rekening :', margin: [0, 2, 0, 4] },
              { text: 'CV. KEMUNING LIMA TEKNIK', margin: [0, 2, 0, 4]},
              { text: 'BANK MANDIRI CAB. KARAWANG', margin: [0, 2, 0, 4] },
              { text: 'A/C. 132-00-1419834-6', margin: [0, 2, 0, 4] },
            ]},
            { width: 210, ...totalsTable }
          ]
        },
        {
          columns: [
            { width: '*', text: '' },
            { width: 200, stack: [ { text: 'Hormat kami,', margin: [0, 32, 0, 62], alignment: 'center'}, { text: String(row?.signedBy || 'ROBINSON'), bold: true, alignment: 'center'} ]}
          ],
          margin: [0, 0, 0, 10]
        },
      ],
      footer: (currentPage: number, pageCount: number) => ({
        columns: [
          {
            width: '*',
            stack: [
              { text: 'Ruko Sentraland Business Park Blok KD No.10, RT.001 RW.030, Kel. Sukaluyu, Kec. Telukjambe Timur, Kab. Karawang Jawa Barat', alignment: 'center', fontSize: 8 },
              { text: 'Tel. 0267-8409604, Fax. 0267-8409604', alignment: 'center', fontSize: 8 },
              { text: 'Email. kemuning5t@gmail.com , admin@k5t.co.id', alignment: 'center', fontSize: 8 },
            ],
          },
        ],
        margin: [20, 0, 20, 20]
      }),
      styles: {
        title: { fontSize: 12, bold: true, alignment: 'center' }
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

  const columns = useMemo<MRT_ColumnDef<RowType>[]>(() => [
    { accessorKey: "category", header: "Katagori", Cell: ({ cell }) => cell.getValue<string>() || '-' },
    { accessorKey: "customer.name", header: "Pelanggan", Cell: ({ row }) => row.original.customer?.name || '-' },
    { accessorKey: "itemName", header: "Nama Barang" },
    { accessorKey: "poNumber", header: "No. PO" },
    { accessorKey: "poDate", header: "Tgl. PO", Cell: ({ cell }) => cell.getValue<string>() ? new Date(cell.getValue<string>()).toLocaleDateString() : '-' },
    { accessorKey: "requestedDeliveryDate", header: "Tgl. Permintaan Pengiriman", Cell: ({ cell }) => cell.getValue<string>() ? new Date(cell.getValue<string>()).toLocaleDateString() : '-' },
    { accessorKey: "poReceivedDate", header: "Tgl. PO Diterima", Cell: ({ cell }) => cell.getValue<string>() ? new Date(cell.getValue<string>()).toLocaleDateString() : '-' },
    { accessorKey: "poQty", header: "Jumlah PO" },
    { accessorKey: "deliveredQty", header: "Jumlah Dikirim" },
    { accessorKey: "unit", header: "Satuan" },
    { accessorFn: (row) => (row?.poQty || 0) - (row?.deliveredQty || 0), header: "Sisa Belum Kirim" },
    { accessorKey: "customerDoNumber", header: "No. Surat Jalan dari Pelanggan" },
    { accessorKey: "tempDoNumber", header: "No. Surat Jalan Sementara" },
    { accessorKey: "namePlateKlt", header: "Name Plate KLT" },
    { accessorKey: "quotationNumber", header: "No. Penawaran" },
    { accessorKey: "hppPerUnit", header: "HPP/Satuan" },
    { accessorKey: "quotationPricePerUnit", header: "Harga Penawaran / Satuan" },
    { accessorKey: "poPricePerUnit", header: "Harga PO / Satuan" },
    { accessorKey: "doDate", header: "Tgl Surat Jalan", Cell: ({ cell }) => cell.getValue<string>() ? new Date(cell.getValue<string>()).toLocaleDateString() : '-' },
    { accessorKey: "doNumber", header: "No. Surat Jalan ke Pelanggan" },
    { accessorKey: "invoiceDate", header: "Tgl Faktur Penjualan", Cell: ({ cell }) => cell.getValue<string>() ? new Date(cell.getValue<string>()).toLocaleDateString() : '-' },
    { accessorKey: "invoiceNumber", header: "No. Faktur Penjualan" },
    { accessorKey: "totalInvoice", header: "Total Faktur Penjualan" },
    { accessorKey: "dppPpn", header: "DPP PPN" },
    { accessorKey: "poBalance", header: "Saldo di PO" },
    { accessorKey: "invoiceRemarks", header: "Keterangan Invoice" },
    { accessorKey: "status", header: "Status" },
    {
      header: "Aksi",
      id: "aksi",
      Cell: ({ row }) => (
        <Button size="small" variant="outlined" onClick={() => handleDownloadPdf(row.original)}>
          Download PDF
        </Button>
      )
    }
  ], []);

  const handleCloseError = () => setErrorOpen(false);

  return (
    <PageContainer title="Invoice & Delivery">
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="h4">Invoice & Delivery</Typography>
      </Box>
      <DashboardCard>
        <DataTable columns={columns} data={data} pageSize={10} showGlobalFilter={true} />
      </DashboardCard>
      <Snackbar open={errorOpen} autoHideDuration={2500} onClose={handleCloseError} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert variant="filled" severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

InvoiceAndDeliveryPage.getLayout = function getLayout(page: React.ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};

export default InvoiceAndDeliveryPage;
