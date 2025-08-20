import React from 'react';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';
import { baselightTheme } from '../../../theme/DefaultColors';

const CustomTextField = styled((props: any) => <TextField {...props} />)(({ theme }) => ({
  '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
    color: baselightTheme.palette.text.primary,
    opacity: '0.8',
  },
  '& .MuiOutlinedInput-root.Mui-disabled': {
    color: baselightTheme.palette.text.primary,
  },
  '& .MuiOutlinedInput-notchedOutline': {
      borderColor: baselightTheme.palette.grey[400],
    },
  '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: baselightTheme.palette.success.contrastText,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: baselightTheme.palette.text.primary,
    },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: baselightTheme.palette.primary.light,
  },
}));

export default CustomTextField;
