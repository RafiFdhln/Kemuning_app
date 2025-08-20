import { useMemo, useState } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import { Alert, Box, Button, Snackbar, Stack, Typography } from '@mui/material';
import PageContainer from '../../src/components/container/PageContainer';
import DashboardCard from '../../src/components/shared/DashboardCard';
import FullLayout from '../../src/layouts/full/FullLayout';
import { IconCirclePlus } from '@tabler/icons-react';
import React from 'react';
import * as XLSX from 'xlsx';
import ReusableTable from '../../components/DataTable';
import { baselightTheme } from '../../src/theme/DefaultColors';
import AddNewDataDrawer from '../../components/AddNewDataDrawer';
import Link from "next/link";
import { chartOfAccountData } from '../../src/AccountData';

export type InitialBalance = {
  id: number;
  description: string;
  position: string;
  saldoAwal: number | string;
};

const InitialBalancePage = () => {
  const [data, setData] = useState<InitialBalance[]>(
    chartOfAccountData.map((item) => ({
      id: item.id,
      description: item.description,
      position: item.position,
      saldoAwal: item.saldoAwal || '-',
    }))
  );

  const [alertOpen, setAlertOpen] = useState(false);

  const columns = useMemo<MRT_ColumnDef<InitialBalance>[]>(
    () => [
      { accessorKey: 'id', header: 'No. Akun', size: 1 },
      { accessorKey: 'description', header: 'Deskripsi', flex: 1 },
      { accessorKey: 'position', header: 'Posisi', flex: 1 },
      { accessorKey: 'saldoAwal', header: 'Saldo Awal', size: 1},
    ],
    []
  );

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Saldo Awal');
    XLSX.writeFile(workbook, 'SaldoAwal.xlsx');
  };

  const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setAlertOpen(false);
  };

  return (
    <PageContainer title="Saldo Awal">
      <Box sx={{ mb: 1 }}>
        <DashboardCard>
          <Box sx={{ height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4">Saldo Awal</Typography>
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
          </Box>
        </DashboardCard>
      </Box>

      <Box>
        <DashboardCard>
          <ReusableTable columns={columns} data={data} pageSize={10} showGlobalFilter={true} />
        </DashboardCard>
      </Box>

      <Snackbar
        open={alertOpen}
        autoHideDuration={1000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          variant="filled"
          severity="success"
          sx={{ color: baselightTheme.palette.success.contrastText, width: '100%' }}
        >
          Saldo awal berhasil diekspor!
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default InitialBalancePage;

InitialBalancePage.getLayout = function getLayout(page: React.ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
