import { useEffect, useMemo, useState } from 'react';
import { Alert, Box, Button, Link, Snackbar, Typography } from '@mui/material';
import { IconCirclePlus } from '@tabler/icons-react';
import * as XLSX from 'xlsx';

import { type MRT_ColumnDef } from 'material-react-table';
import { baselightTheme } from '../../src/theme/DefaultColors';
import PageContainer from '../../src/components/container/PageContainer';
import DashboardCard from '../../src/components/shared/DashboardCard';
import FullLayout from '../../src/layouts/full/FullLayout';
import ReusableTable from '../../components/DataTable';
import AddNewDataDrawer from '../../components/AddNewDataDrawer';

type Supplier = {
  id: string;
  code: string;
  name: string;
  npwp?: string;
  address?: string;
  remarks?: string;
};

const initialFormState: Omit<Supplier, 'id'> = {
  code: '',
  name: '',
  npwp: '',
  address: '',
  remarks: '',
};

const formFields = [
  { name: 'code', label: 'Kode', type: 'basictext' },
  { name: 'name', label: 'Nama Pemasok', type: 'basictext' },
  { name: 'npwp', label: 'NPWP', type: 'basictext' },
  { name: 'address', label: 'Alamat', type: 'textarea' },
  { name: 'remarks', label: 'Keterangan', type: 'textarea' },
];

const SupplierPage = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [data, setData] = useState<Supplier[]>([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch('/api/company/supplier');
        if (!response.ok) throw new Error('Fetch failed');
        const result = await response.json();
        setData(result.data || []);
      } catch (error) {
        console.error('Gagal mengambil data supplier:', error);
      }
    };
    fetchSuppliers();
  }, []);

  const columns = useMemo<MRT_ColumnDef<Supplier>[]>(
    () => [
      { accessorKey: 'code', header: 'Kode', size: 50 },
      { accessorKey: 'name', header: 'Nama Pemasok' },
      { accessorKey: 'npwp', header: 'NPWP' },
      { accessorKey: 'address', header: 'Alamat' },
      { accessorKey: 'remarks', header: 'Keterangan', size: 100 },
    ],
    []
  );

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleOptionChange = (field: string, value: string | null) => {
    setFormData(prev => ({ ...prev, [field]: value || '' }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/company/supplier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Gagal menyimpan pemasok');

      const result = await response.json();
      setData(prev => [...prev, result.data]);
      setAlertOpen(true);
      setOpenDrawer(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Supplier');
    XLSX.writeFile(workbook, 'Supplier.xlsx');
  };

  const handleCloseAlert = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason !== 'clickaway') setAlertOpen(false);
  };

  return (
    <PageContainer title="Daftar Pemasok">
      <Box sx={{ mb: 1 }}>
        <DashboardCard>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h4">Daftar Pemasok</Typography>
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
                onClick={() => setOpenDrawer(true)}
                sx={{ fontWeight: 500, color: 'white' }}
              >
                Tambah Pemasok
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
        open={openDrawer}
        onClose={setOpenDrawer}
        formData={formData}
        formFields={formFields}
        handleFormChange={handleFormChange}
        handleOptionChange={handleOptionChange}
        handleSave={handleSave}
      />

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

SupplierPage.getLayout = function getLayout(page: React.ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};

export default SupplierPage;
