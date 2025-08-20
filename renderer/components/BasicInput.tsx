import React from 'react';
import { Typography, Box } from '@mui/material';
import CustomTextField from '../src/components/forms/theme-elements/CustomTextField';

interface BasicInputProps {
  label: string;
  value?: string | null;
  multiline: boolean;
  type?: string; // Add type prop
  onChange?: (event: React.ChangeEvent<HTMLInputElement> | any, value: string | null) => void;
  disabled?: boolean;
  readOnly?: boolean;
}

const BasicInput: React.FC<BasicInputProps> = ({ label, value, onChange, multiline, type = "text", disabled = false, readOnly = false }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        fontSize="0.75rem"
        fontWeight={600}
        component="label"
        htmlFor="description"
        mb="4px"
      >
        {label}
      </Typography>
      {multiline ? 
        <CustomTextField 
          minRows={2} 
          value={value ?? ''}
          onChange={onChange} 
          variant="outlined" 
          multiline 
          fullWidth 
          size="small" 
          disabled={disabled}
          InputProps={{ readOnly }}
          sx={{ mb: 2 }} 
        /> 
        : 
        <CustomTextField 
          type={type} // Use the type prop here
          value={value ?? ''}
          onChange={onChange} 
          variant="outlined" 
          fullWidth 
          size="small" 
          disabled={disabled}
          InputProps={{ readOnly }}
          sx={{ mb: 2 }} 
        />
      }
    </Box>
  );
};

export default BasicInput;
