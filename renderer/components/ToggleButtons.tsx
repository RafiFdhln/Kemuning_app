import React from 'react';
import { ToggleButton, ToggleButtonGroup, Typography, Box } from '@mui/material';

const ToggleButtons = ({ label, value, onChange, options }) => {
  return (
    <Box>
      <Typography
        fontSize="0.75rem"
        fontWeight={600}
        component="label"
        mb="6px"
      >
        {label}
      </Typography>
      <ToggleButtonGroup
        fullWidth
        color="primary"
        value={value}
        exclusive
        onChange={onChange}
        aria-label={label}
      >
        {options.map((option) => (
          <ToggleButton key={option.value} value={option.value}>
            {option.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default ToggleButtons;
