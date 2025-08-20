import React from 'react';
import { Typography, TextField, Box, Autocomplete } from '@mui/material';
import CustomTextField from '../src/components/forms/theme-elements/CustomTextField';

interface ProfileFieldProps {
  label: string;
  value?: string;
  options?: string[];
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement> | any, value: string | null) => void;
}

const ProfileField: React.FC<ProfileFieldProps> = ({ label, value = '', options, disabled = false, onChange }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 2, // Margin bottom
      }}
    >
      <Typography
        variant="subtitle1"
        fontWeight={500}
        component="label"
        sx={{
          minWidth: '200px',
          mr: 2, 
        }}
      >
        {label}
      </Typography>
      <Typography
        variant="subtitle1"
        fontWeight={500}
        component="label"
        mr="16px"
      >
        :
      </Typography>
        <CustomTextField
          size="small"
          variant="outlined"
          fullWidth
          defaultValue={value}
          disabled={disabled}
        />
    </Box>
  );
};

export default ProfileField;
