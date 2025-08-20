import { ReactElement } from "react";
import FullLayout from "../../src/layouts/full/FullLayout";
import PageContainer from "../../src/components/container/PageContainer";
import { Box, Typography, Button, Divider } from "@mui/material";
import { IconDeviceFloppy, IconEdit } from "@tabler/icons-react";
import DashboardCard from "../../src/components/shared/DashboardCard";
import { baselightTheme } from "../../src/theme/DefaultColors";
import AutoCompleteInput from "../../components/AutoCompleteInput";

const SettingPage = () => {  
    const contra = ['Ya', 'Tidak'];
    function value(event: any, value: string): void {
        throw new Error("Function not implemented.");
    }

    return (
        <PageContainer title="Pengaturan">
            <Box sx={{ mb: 3 }}>
                <DashboardCard>
                <Box
                    sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    }}>
                <Typography variant='h4'>
                    Pengaturan
                </Typography>
                </Box>
                </DashboardCard>
            </Box>
            <Box sx={{ mb: 3 }}>
                <DashboardCard>
                <Box
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    }}>
                <Typography variant='h5' sx={{ mb: 1.5}}>
                    Pengaturan Akun
                </Typography>
                <Divider sx={{ mb: 1.5, width: '100%', height: 1, backgroundColor:baselightTheme.palette.grey[400] }} />
                    
        
                        <Typography variant="subtitle1" fontWeight={600} component="label">Akun yang digunakan sebagai Pembayaran Utama (Bank)?</Typography>
                            <AutoCompleteInput
                                key=''
                                label=''
                                options= {contra}
                                value=''
                                onChange={(value)}
                        />
                        <Typography variant="subtitle1" fontWeight={600} component="label" mt={3}>Akun yang digunakan sebagai Pembayaran Utama (Bank)?</Typography>
                            <AutoCompleteInput
                                key=''
                                label=''
                                options= {contra}
                                value=''
                                onChange={(value)}
                        />
                   
                    {/* <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start',
                        width: '90%',
                        justifyContent: 'space-between'
                        }}>
                        <Typography variant="subtitle1" fontWeight={600} component="label">1. Akun yang digunakan sebagai Pembayaran Utama (Bank)?</Typography>
                            <AutoCompleteInput
                                key=''
                                label=''
                                options= {contra}
                                value=''
                                onChange={(value)}
                        />
                    </Box> */}
                </Box>
                </DashboardCard>
            </Box>
        </PageContainer>
    );
};
export default SettingPage;

SettingPage.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};