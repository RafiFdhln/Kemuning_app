import { Box, Typography, Button } from '@mui/material';
import PageContainer from '../../src/components/container/PageContainer';
import DashboardCard from '../../src/components/shared/DashboardCard';
import DisabledInput from '../../components/ProfileFormInput';
import { ReactElement, useState } from 'react';
import { IconEdit, IconDeviceFloppy } from '@tabler/icons-react';
import FullLayout from '../../src/layouts/full/FullLayout';

const CompanyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <PageContainer title="Profil Perusahaan">
      <Box sx={{ mb: 3 }}> {/* Margin bottom for spacing */}
        <DashboardCard>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Typography variant='h4'>
              Profil Perusahaan
            </Typography>
            <Button 
              variant="contained" 
              startIcon={isEditing ? <IconDeviceFloppy/>:<IconEdit />}
              onClick={handleEditClick}
              sx={{
                color: 'white', // Change text color
              }}
            >
              {isEditing ? 'Save' : 'Edit'}
            </Button>
          </Box>
        </DashboardCard>
      </Box>
      <Box> {/* No margin needed here */}
        <DashboardCard>
          <Box
            sx={{
              alignItems: 'center',
            }}>
            <DisabledInput 
              label='Nama Perusahaan'
              value='PT Tri Daya Mekar'
              disabled={!isEditing}
            />
            <DisabledInput 
              label='Kode/Inisial'
              value='TDM'
              disabled={!isEditing}
            />
            <DisabledInput 
              label='NPWP'
              value='315845925408000'
              disabled={!isEditing}
            />
            <DisabledInput 
              label='Bidang Usaha'
              value='TDM'
              disabled={!isEditing}
            />
            <DisabledInput 
              label='No. Telepon'
              value='TDM'
              disabled={!isEditing}
            />
            <DisabledInput 
              label='Email'
              value='tdm@gmai.com'
              disabled={!isEditing}
            />
            <DisabledInput 
              label='Alamat'
              value='Jln Bandung No 24'
              disabled={!isEditing}
            />
            <DisabledInput 
              label='Kabupaten/Kota'
              value='Bandung'
              disabled={!isEditing}
            />
            <DisabledInput 
              label='Kecamatan'
              value='Bojongsoang'
              disabled={!isEditing}
            />
          </Box>
        </DashboardCard>
      </Box>
    </PageContainer>
  );
};

export default CompanyProfile;

CompanyProfile.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};