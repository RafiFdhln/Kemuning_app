import React from 'react';
import { Drawer, Box, Typography, Button, Divider, TextField } from '@mui/material';
import AutoCompleteInput from './AutoCompleteInput';
import BasicInput from './BasicInput'; 
import { baselightTheme } from '../src/theme/DefaultColors';
import { IconVocabulary } from '@tabler/icons-react';
import ItemsTable from './ItemTable'

const AddNewDataDrawer = ({ 
  open, 
  onClose, 
  formData, 
  handleFormChange, 
  handleSave, 
  formFields,
  width,
  handleOptionChange,
  suppliers = [], // tambahkan default value
}) => {

  const handleCloseDrawer = () => {
    onClose(false); 
  };

  const renderFormField = (field) => {
    switch (field.type) {
      case 'autocomplete':
        return (
          <AutoCompleteInput
            key={field.name}
            label={field.label}
            options={field.options}
            value={field.options && Array.isArray(field.options) && field.options[0] && typeof field.options[0] === 'object'
              ? field.options.find((opt) => opt.value === (formData[field.name] ?? '')) || null
              : (formData[field.name] ?? '')}
            onChange={(event, value) => {
              if (value && typeof value === 'object' && value.value) {
                handleOptionChange(field.name, value.value);
              } else {
                handleOptionChange(field.name, value || '');
              }
            }}
          />
        );
      case 'textarea':
        return (
            <BasicInput
            key={field.name}
            label={field.label}
            value={formData[field.name] || ''} 
            multiline={field.type === 'textarea'} 
            onChange={(event) => handleFormChange(field.name, event.target.value)}
          />
        );
        case 'basictext':
        return (
            <BasicInput
            key={field.name}
            label={field.label}
            value={formData[field.name] || ''} 
            multiline={false} 
            onChange={(event) => handleFormChange(field.name, event.target.value)}
            readOnly={field.name === 'requestNumber'}
          />
        );
        case 'numbertext':
        return (
            <BasicInput
            key={field.name}
            label={field.label}
            value={formData[field.name] || ''} 
            multiline={false} 
            type='number'
            onChange={(event) => handleFormChange(field.name, event.target.value)}
          />
        );
        case 'datetime':
        return (
          <BasicInput
            key={field.name}
            label={field.label}
            value={formData[field.name] || ''}
            onChange={(event) => handleFormChange(field.name, event.target.value)}
            multiline={false} // Set to false for datetime input
            type="datetime-local" // Specify the type as datetime-local
          />
        );
        case "items":
        return (
          <ItemsTable
            key="items"
            items={formData.items}
            onChange={(newItems) => handleFormChange("items", newItems)}
            suppliers={suppliers}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      PaperProps={{
        sx: {
          minWidth: {width},
          flex: 1,
          margin: 2,
          maxHeight: '96%',
          minHeight: '96%',
          borderRadius: '10px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 3,
          height: '100%',
        }}
      >
        {/* Header */}
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
            {/* <IconVocabulary size={28} color={baselightTheme.palette.primary.dark} /> */}
            <Typography variant="h5" mb={3}>Tambah Inquiry</Typography>
          </Box>
          {formData?.requestNumber ? (
            <Typography variant="subtitle2" sx={{ mb: 3, color: baselightTheme.palette.text.secondary }}>
              {formData.requestNumber}
            </Typography>
          ) : null}
        </Box>

        {/* Form Fields */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            height: '100%',
          }}
        >
          <Divider sx={{ mb: 3 }} />
          {formFields.map(field => renderFormField(field))}

        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', gap: 3, mt:3, mb:3}}>
          <Button
            sx={{
              fontWeight: 600,
              color: baselightTheme.palette.text.primary,
              borderColor: baselightTheme.palette.grey[400],
            }}
            variant="outlined"
            onClick={handleCloseDrawer}
          >
            Batal
          </Button>
          
          <Button
            sx={{ fontWeight: 600, color: 'white' }}
            variant="contained"
            onClick={handleSave}
          >
            Simpan
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default AddNewDataDrawer;
