import React from 'react';
import { Typography, Box, Autocomplete } from '@mui/material';
import CustomTextField from '../src/components/forms/theme-elements/CustomTextField';

interface AutoCompleteInputProps {
  label: string;
  value?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement> | any, value: any) => void;
  options?: Array<string | { label: string; value: string }>;
}

const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({ label, value = '', onChange, options = [] }) => {
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
        htmlFor="autocomplete-input"
        mb="4px"
      >
        {label}
      </Typography>
      <Autocomplete
        options={options}
        getOptionLabel={(option) => typeof option === 'string' ? option : option.label}
        isOptionEqualToValue={(option, val) => {
          if (typeof option === 'string' || typeof val === 'string') return option === val;
          return option.value === val.value;
        }}
        value={value}
        onChange={onChange}
        renderInput={(params) => (
          <CustomTextField
            {...params}
            variant="outlined"
            fullWidth
            size="small"
            id="autocomplete-input"
            sx={{mb:2}}
          />
        )}
      />
    </Box>
  );
};

export default AutoCompleteInput;
