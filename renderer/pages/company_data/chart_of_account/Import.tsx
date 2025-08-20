import { Box, Button, Divider, Icon, Input, Typography } from "@mui/material";
import FullLayout from "../../../src/layouts/full/FullLayout";
import DashboardCard from "../../../src/components/shared/DashboardCard";
import PageContainer from "../../../src/components/container/PageContainer";
import { baselightTheme } from "../../../src/theme/DefaultColors";
import BasicInput from "../../../components/BasicInput";
import { IconFileDownload } from "@tabler/icons-react";

const ImprortPage = () => {
  return (
    <PageContainer title="Pengaturan">
      <Box sx={{ mb: 1}}>
        <DashboardCard>
          <Box>
            <Typography variant='h4'>
              Unggah dan Impor File
            </Typography>      
          </Box>
        </DashboardCard>
      </Box>
      <DashboardCard>
        <Box
          sx={{
            alignItems: 'start',
            }}>

          <Box>
          <Typography variant='subtitle1' sx={{fontWeight: [600], color: baselightTheme.palette.grey[500], mb:1}}>
              Langkah 1: Download file template
              </Typography>
              <Typography variant='subtitle1' sx={{fontWeight: [600], color: baselightTheme.palette.text.primary}}>
              Mulai dengan men-download template file CSV (Comma Separated Values) kami. File ini memiliki kolom heading sesuai yang diperlukan untuk meng-impor data Anda.          
              </Typography>      
              <Button
                variant="text"
                color="secondary"
                href="/path/to/template.csv" // Ganti dengan path yang sesuai
                download
                startIcon={<IconFileDownload size={28}/>}
              >
              Download File Template
              </Button>
          </Box>
          
          <Divider sx={{ mb: 2, mt: 2}} />

          <Box>
          <Typography variant='subtitle1' sx={{fontWeight: [600], color: baselightTheme.palette.grey[500], mb:1}}>
            Langkah 2: Copy data Anda kedalam template          
            </Typography>
            <Typography variant='subtitle1' sx={{fontWeight: [600], color: baselightTheme.palette.text.primary, mb:1}}>
            Ekspor data  Anda dari sistem yang lama sebagai CSV. Menggunakan Excel atau editor spreadsheet lainnya, copy dan paste data Anda dari file yg di ekspor kedalam template yang disediakan. Pastikan bahwa data Anda sesuai dengan heading kolom yg di sediakan dalam template.          
            </Typography> 
            <Typography variant='subtitle1' sx={{fontWeight: [700], color: '#B80000'}}>
            PENTING :          
            </Typography>
            <Typography variant='subtitle1' sx={{fontWeight: [600], color: '#B80000'}}>
            Jangan rubah heading kolom yang disediakan dalam template Jurnal. Ini harus tetap sama supaya impor bisa jalan pada langkah selanjutnya. Kami mengasumsi bahwa tanggal ada dalam format dd/mm/yyyy.         
            </Typography>
            <Typography variant='subtitle1' sx={{fontWeight: [700], color: '#B80000'}}>
            Contoh: 25/12/2015.         
            </Typography>
          </Box>
            
          <Divider sx={{ mb: 2, mt: 2}} />
          
          <Box>
            <Typography variant='subtitle1' sx={{fontWeight: [600], color: baselightTheme.palette.grey[500], mb:1}}>
            Langkah 3:  Impor file template yg sudah di update
            </Typography>
            <Input
              type="file"
              value={undefined}
              multiline={false}
              sx={{
                borderColor:baselightTheme.palette.grey[100],
                border:1,
                paddingX:2,
                paddingY:1,
                borderRadius:1
              }}
            />
            <Typography variant='subtitle1' sx={{fontWeight: [500], color: baselightTheme.palette.text.primary, fontSize:'0.75rem'}}>
            File yang Anda impor harus dalam bentuk CSV (Comma Separated Values). Nama file anda harus diakhiri dengan .csv atau .txt.          
            </Typography>
          </Box>
        </Box>
      </DashboardCard>
    </PageContainer>
  )
};

export default ImprortPage;

ImprortPage.getLayout = function getLayout(page: React.ReactElement) {
    return <FullLayout>{page}</FullLayout>;
  };