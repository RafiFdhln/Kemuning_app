import { Box, Typography, Button } from '@mui/material';
import PageContainer from '../../src/components/container/PageContainer';
import DashboardCard from '../../src/components/shared/DashboardCard';
import DisabledInput from '../../components/ProfileFormInput';
import { ReactElement, useState } from 'react';
import { IconEdit, IconDeviceFloppy } from '@tabler/icons-react';
import FullLayout from '../../src/layouts/full/FullLayout';
import ProfileField from '../../components/ProfileFormInput';

const OfficialProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <PageContainer title="Profil Pengurus">
      <Box sx={{ mb: 3 }}>
        <DashboardCard>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Typography variant='h4'>
              Profil Pengurus
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
            <ProfileField 
              label='Nama Pengurus'
              value='Endang Mahpudin'
              disabled={!isEditing}
            />
            <ProfileField 
              label='NIK'
              value='32111XXXXX'
              disabled={!isEditing}
            />
            <ProfileField 
              label='NPWP'
              value='315845925408000'
              disabled={!isEditing}
            />
            <ProfileField 
              label='No. Handphone'
              value= '08877878XXXX'
              disabled={!isEditing}
            />
            <ProfileField 
              label='Telepon'
              value= '-'
              disabled={!isEditing}
            />
            <ProfileField 
              label='Email'
              value= 'endang@gmail.com'
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

export default OfficialProfile;

OfficialProfile.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};