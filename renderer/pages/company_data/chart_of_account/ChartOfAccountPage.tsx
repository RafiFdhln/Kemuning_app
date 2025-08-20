import { useMemo, useState } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import { Alert, Box, Button, Snackbar, Stack, Typography } from '@mui/material';
import PageContainer from '../../../src/components/container/PageContainer';
import DashboardCard from '../../../src/components/shared/DashboardCard';
import FullLayout from '../../../src/layouts/full/FullLayout';
import { IconCirclePlus } from '@tabler/icons-react';
import React from 'react';
import * as XLSX from 'xlsx';
import ReusableTable from '../../../components/DataTable';
import { baselightTheme } from '../../../src/theme/DefaultColors';
import AddNewDataDrawer from '../../../components/AddNewDataDrawer';
import Link from "next/link";
import { chartOfAccountData } from "../../../src/AccountData";

type Account = {
  id: number;
  type: string;
  criteria: string;
  description: string;
  contra: string;
  position: string;
  report: string;
  saldoAwal: number | string;
};

const ChartOfAccountPage = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    criteria: '',
    description: '',
    contra: '',
    position: '',
    report: ''
  });

  const [data, setData] = useState<Account[]>(chartOfAccountData);
  const [alertOpen, setAlertOpen] = useState(false);

  const type = ['Harta', 'Hutang', 'Modal', 'Pendapatan', 'Biaya', 'Pendapatan Lain', 'Biaya Lain'];
  const criteria = ['Harta Lancar', 'Harta Tetap', 'Harta Lainnya', 'Utang Lancar', 'Utang Tidak Lancar', 'Modal', 'Pendapatan', 'Biaya Pokok', 'Biaya Lainnya', 'Lainnya'];
  const contra = ['Ya', 'Tidak'];
  const position = ['Debit', 'Kredit'];
  const report = ['Laba Rugi', 'Posisi Keuangan'];

  const formFields = [
    { name: 'type', label: 'Jenis', type: 'autocomplete', options: type },
    { name: 'criteria', label: 'Kriteria', type: 'autocomplete', options: criteria },
    { name: 'description', label: 'Deskripsi', type: 'textarea' },
    { name: 'contra', label: 'Kontra', type: 'autocomplete', options: contra },
    { name: 'position', label: 'Posisi', type: 'autocomplete', options: position },
    { name: 'report', label: 'Laporan', type: 'autocomplete', options: report },
  ];

  const handleOptionChange = (field: string, value: string | null) => {
    setFormData({ ...formData, [field]: value || '' });
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    const nextId = Math.max(...data.map(d => d.id)) + 1;

    const newAccount: Account = {
      id: nextId,
      ...formData,
      saldoAwal: ''
    };

    setData([...data, newAccount]);
    setAlertOpen(true);
    toggleDrawer(false)();
  };

  const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setAlertOpen(false);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Akun');
    XLSX.writeFile(workbook, 'ChartOfAccount.xlsx');
  };

  const toggleDrawer = (open: boolean) => () => {
    setOpen(open);
  };

  const columns = useMemo<MRT_ColumnDef<Account>[]>(() => [
    { accessorKey: 'id', header: 'No. Akun', size: 100 },
    { accessorKey: 'type', header: 'Jenis', size: 100 },
    { accessorKey: 'criteria', header: 'Kriteria', size: 150 },
    { accessorKey: 'description', header: 'Deskripsi', flex: 1 },
    { accessorKey: 'contra', header: 'Kontra', size: 100 },
    { accessorKey: 'position', header: 'Posisi', size: 100 },
    { accessorKey: 'report', header: 'Laporan', size: 150 },
  ], []);

  return (
    <PageContainer title="Daftar Akun">
      <Box sx={{ mb: 1 }}>
        <DashboardCard>
          <Box sx={{ height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4">Daftar Akun</Typography>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
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
                component={Link}
                variant="outlined"
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
                size="medium"
                variant="contained"
                startIcon={<IconCirclePlus size={20} />}
                onClick={toggleDrawer(true)}
                sx={{
                  fontWeight: 500,
                  color: 'white',
                }}
              >
                Tambah Akun
              </Button>
            </Box>
          </Box>
        </DashboardCard>
      </Box>

      <Box>
        <DashboardCard>
          <ReusableTable columns={columns} data={data} pageSize={10} showGlobalFilter={true} />
        </DashboardCard>
      </Box>

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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert variant="filled" severity="success" sx={{ color: baselightTheme.palette.success.contrastText, width: '100%' }}>
          Data berhasil disimpan!
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default ChartOfAccountPage;

ChartOfAccountPage.getLayout = function getLayout(page: React.ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
