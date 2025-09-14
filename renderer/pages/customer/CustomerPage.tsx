import { useEffect, useMemo, useState } from 'react';
import { Alert, Box, Button, Link, Snackbar, Typography, Drawer, Divider, IconButton } from '@mui/material';
import { IconCirclePlus, IconPencil } from '@tabler/icons-react';
import * as XLSX from 'xlsx';

import { type MRT_ColumnDef } from 'material-react-table';
import { baselightTheme } from '../../src/theme/DefaultColors';
import PageContainer from '../../src/components/container/PageContainer';
import DashboardCard from '../../src/components/shared/DashboardCard';
import FullLayout from '../../src/layouts/full/FullLayout';
import ReusableTable from '../../components/DataTable';
import AddNewDataDrawer from '../../components/AddNewDataDrawer';

type Customer = {
  id: string;
  code: string;
  name: string;
  address1?: string;
  address2?: string;
  address3?: string;
  address4?: string;
  address5?: string;
  address6?: string;
  attnInv?: string;
  attnSj?: string;
};

const initialFormState: Customer = {
  id: '',
  code: '',
  name: '',
  address1: '',
  address2: '',
  address3: '',
  address4: '',
  address5: '',
  address6: '',
  attnInv: '',
  attnSj: '',
};

const formFields = [
  { 
    name: 'code', 
    label: 'Kode', 
    type: 'basictext', 
    required: true,
    placeholder: 'Masukkan kode pelanggan'
  },
  { 
    name: 'name', 
    label: 'Nama Pelanggan', 
    type: 'basictext', 
    required: true,
    placeholder: 'Masukkan nama lengkap pelanggan'
  },
  { 
    name: 'address1', 
    label: 'Alamat 1', 
    type: 'basictext',
    placeholder: 'Jl. Nama Jalan No. XX'
  },
  { 
    name: 'address2', 
    label: 'Alamat 2', 
    type: 'basictext',
    placeholder: 'Kelurahan/Kecamatan'
  },
  { 
    name: 'address3', 
    label: 'Alamat 3', 
    type: 'basictext',
    placeholder: 'Kota/Kabupaten'
  },
  { 
    name: 'address4', 
    label: 'Alamat 4', 
    type: 'basictext',
    placeholder: 'Provinsi'
  },
  { 
    name: 'address5', 
    label: 'Alamat 5', 
    type: 'basictext',
    placeholder: 'Kode Pos'
  },
  { 
    name: 'address6', 
    label: 'Alamat 6', 
    type: 'basictext',
    placeholder: 'Negara'
  },
  { 
    name: 'attnInv', 
    label: 'Attention Invoice', 
    type: 'basictext',
    placeholder: 'Nama yang dituju untuk invoice'
  },
  { 
    name: 'attnSj', 
    label: 'Attention Surat Jalan', 
    type: 'basictext',
    placeholder: 'Nama yang dituju untuk surat jalan'
  },
];

const CustomerPage = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [data, setData] = useState<Customer[]>([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('/api/company/customer');
        if (!response.ok) throw new Error('Fetch failed');
        const result = await response.json();
        setData(result.data || []);
      } catch (error) {
        console.error('Gagal mengambil data customer:', error);
      }
    };
    fetchCustomers();
  }, []);

  const handleViewDetail = (customer: Customer) => {
    setSelectedCustomer(customer);
    setDetailOpen(true);
  };

  const handleEdit = (customer: Customer) => {
    setFormData({
      id: customer.id,
      code: customer.code,
      name: customer.name,
      address1: customer.address1 || '',
      address2: customer.address2 || '',
      address3: customer.address3 || '',
      address4: customer.address4 || '',
      address5: customer.address5 || '',
      address6: customer.address6 || '',
      attnInv: customer.attnInv || '',
      attnSj: customer.attnSj || '',
    });
    setIsEditMode(true);
    setOpenDrawer(true);
  };

  const columns = useMemo<MRT_ColumnDef<Customer>[]>(
    () => [
      { 
        accessorKey: 'code', 
        header: 'Kode', 
        size: 100,
        Cell: ({ cell, row }) => (
          <Button
            variant="text"
            onClick={() => handleViewDetail(row.original)}
            sx={{
              textTransform: 'none',
              color: '#0A8DD0',
              fontWeight: 500,
              textAlign: 'left',
              justifyContent: 'flex-start',
              '&:hover': {
                backgroundColor: '#E6F7F9',
                textDecoration: 'underline'
              }
            }}
          >
            {cell.getValue<string>() || '-'}
          </Button>
        ),
        enableColumnFilter: true,
        enableGlobalFilter: true
      },
      { 
        accessorKey: 'name', 
        header: 'Nama Pelanggan', 
        size: 200,
        enableColumnFilter: true,
        enableGlobalFilter: true
      },
      { 
        accessorKey: 'attnInv', 
        header: 'ATTN INV', 
        size: 150,
        Cell: ({ cell }) => cell.getValue<string>() || '-',
        enableColumnFilter: true,
        enableGlobalFilter: true
      },
      { 
        accessorKey: 'attnSj', 
        header: 'ATTN SJ', 
        size: 150,
        Cell: ({ cell }) => cell.getValue<string>() || '-',
        enableColumnFilter: true,
        enableGlobalFilter: true
      },
      {
        header: "Aksi",
        id: "aksi",
        size: 100,
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'start' }}>
            <IconButton
              size="small"
              sx={{
                color: "#0A8DD0",
                border: "2px solid #0A8DD0", // warna biru border
                backgroundColor: "#E6F7F9",   // biru muda background
                borderRadius: "8px",         // biar agak rounded
                "&:hover": {
                  backgroundColor: "#bbdefb", // warna saat hover
                }
              }}
              onClick={() => handleEdit(row.original)}
            >
              <IconPencil fontSize="small" />
            </IconButton>
          </Box>
        ),
      },
    ],
    [handleViewDetail, handleEdit]
  );

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleOptionChange = (field: string, value: string | null) => {
    setFormData(prev => ({ ...prev, [field]: value || '' }));
  };

  const handleSave = async () => {
    try {
      // Validasi field wajib
      if (!formData.code.trim()) {
        alert('Kode pelanggan harus diisi');
        return;
      }
      if (!formData.name.trim()) {
        alert('Nama pelanggan harus diisi');
        return;
      }

      const isEdit = isEditMode && formData.id;
      const url = isEdit ? `/api/company/customer/${formData.id}` : '/api/company/customer';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Gagal menyimpan pelanggan');

      const result = await response.json();
      
      if (isEdit) {
        setData(prev => prev.map(item => item.id === formData.id ? result.data : item));
      } else {
        setData(prev => [...prev, result.data]);
      }
      
      setAlertOpen(true);
      setOpenDrawer(false);
      setFormData(initialFormState);
      setIsEditMode(false);
    } catch (error) {
      console.error(error.message);
      alert('Terjadi kesalahan saat menyimpan data');
    }
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Customer');
    XLSX.writeFile(workbook, 'Customer.xlsx');
  };

  const handleCloseAlert = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason !== 'clickaway') setAlertOpen(false);
  };

  const handleOpenDrawer = () => {
    setFormData(initialFormState);
    setIsEditMode(false);
    setOpenDrawer(true);
  };

  const handleCloseDetail = () => {
    setDetailOpen(false);
    setSelectedCustomer(null);
  };

  return (
    <PageContainer title="Daftar Pelanggan">
      <Box sx={{ mb: 1 }}>
        <DashboardCard>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h4">Daftar Pelanggan</Typography>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <Button
                variant="outlined"
                onClick={handleExport}
                sx={{
                  fontWeight: 600,
                  color: baselightTheme.palette.text.primary,
                  borderColor: baselightTheme.palette.grey[400],
                }}
              >
                Export
              </Button>
              <Button
                variant="outlined"
                component={Link}
                href="/company_data/chart_of_account/Import"
                sx={{
                  fontWeight: 600,
                  color: baselightTheme.palette.text.primary,
                  borderColor: baselightTheme.palette.grey[400],
                }}
              >
                Import
              </Button>
              <Button
                variant="contained"
                startIcon={<IconCirclePlus size={20} />}
                onClick={handleOpenDrawer}
                sx={{ fontWeight: 500, color: 'white' }}
              >
                Tambah Pelanggan
              </Button>
            </Box>
          </Box>
        </DashboardCard>
      </Box>

      <DashboardCard>
        <ReusableTable
          columns={columns}
          data={data}
          pageSize={10}
          showGlobalFilter={true}
        />
      </DashboardCard>

      <AddNewDataDrawer
        width={600}
        open={openDrawer}
        onClose={setOpenDrawer}
        formData={formData}
        formFields={formFields}
        handleFormChange={handleFormChange}
        handleOptionChange={handleOptionChange}
        handleSave={handleSave}
        title={isEditMode ? 'Edit Pelanggan' : 'Tambah Pelanggan'}
      />

      {/* Detail Drawer */}
      {selectedCustomer && (
        <Drawer
          anchor="right"
          open={detailOpen}
          onClose={handleCloseDetail}
          PaperProps={{
            sx: {
              minWidth: 500,
              p: 3,
              borderRadius: '10px',
              margin: 2,
              maxHeight: '96%',
              minHeight: '96%',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Detail Pelanggan</Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Kode</Typography>
                <Typography variant="body1">{selectedCustomer.code}</Typography>
              </Box>
              
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Nama Pelanggan</Typography>
                <Typography variant="body1">{selectedCustomer.name}</Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">Alamat Lengkap</Typography>
                <Box sx={{ mt: 1 }}>
                  {[selectedCustomer.address1, selectedCustomer.address2, selectedCustomer.address3, 
                    selectedCustomer.address4, selectedCustomer.address5, selectedCustomer.address6]
                    .filter(addr => addr && addr.trim() !== '')
                    .map((addr, index) => (
                      <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                        {addr}
                      </Typography>
                    ))}
                  {![selectedCustomer.address1, selectedCustomer.address2, selectedCustomer.address3, 
                    selectedCustomer.address4, selectedCustomer.address5, selectedCustomer.address6]
                    .some(addr => addr && addr.trim() !== '') && (
                    <Typography variant="body2" color="text.secondary">-</Typography>
                  )}
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">Attention Invoice</Typography>
                <Typography variant="body1">{selectedCustomer.attnInv || '-'}</Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">Attention Surat Jalan</Typography>
                <Typography variant="body1">{selectedCustomer.attnSj || '-'}</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
              <Button
                variant="outlined"
                onClick={handleCloseDetail}
                sx={{
                  fontWeight: 600,
                  color: baselightTheme.palette.text.primary,
                  borderColor: baselightTheme.palette.grey[400],
                }}
              >
                Tutup
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  handleEdit(selectedCustomer);
                  handleCloseDetail();
                }}
                sx={{ fontWeight: 600, color: 'white' }}
              >
                Edit
              </Button>
            </Box>
          </Box>
        </Drawer>
      )}

      <Snackbar
        open={alertOpen}
        autoHideDuration={1000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          variant="filled"
          severity="success"
          sx={{
            color: baselightTheme.palette.success.contrastText,
            width: '100%',
          }}
        >
          Data berhasil disimpan!
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

CustomerPage.getLayout = function getLayout(page: React.ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};

export default CustomerPage;
