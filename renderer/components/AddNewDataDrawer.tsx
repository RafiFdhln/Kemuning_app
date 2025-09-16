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
  title = 'Tambah Data', // tambahkan default title
  variant,
}: {
  open: boolean;
  onClose: (open: boolean) => void;
  formData: any;
  handleFormChange: (field: string, value: any) => void;
  handleSave: () => void;
  formFields: any[];
  width?: string;
  handleOptionChange: (field: string, value: string | null) => void;
  suppliers?: any[];
  title?: string;
  variant?: 'inquiry' | 'quotation';
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
            options={field.options || []}
            value={field.name === 'customerId' 
              ? formData[field.name] 
                ? field.options?.find(opt => opt.value === formData[field.name]) || ''
                : ''
              : formData[field.name] || ''}
            onChange={(event, value) => {
              console.log('AutoComplete onChange:', { field: field.name, value, event });
              // For customer field, we need to extract the value from the option object
              if (field.name === 'customerId' && value && typeof value === 'object' && value.value) {
                handleFormChange(field.name, value.value);
              } else if (field.name === 'category' && typeof value === 'string') {
                handleFormChange(field.name, value);
              } else {
                handleFormChange(field.name, value);
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
            onChange={(event) => handleFormChange(field.name, event.target.value)}
            multiline={true}
          />
        );
        case 'basictext':
        return (
            <BasicInput
            key={field.name}
            label={field.label}
            value={formData[field.name] || ''} 
            onChange={(event) => handleFormChange(field.name, event.target.value)}
            multiline={false}
            disabled={field.name === 'requestNumber'}
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
            variant={variant}
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
          // minWidth: {width},
          flex: 1,
          margin: 2,
          maxHeight: '96%',
          minHeight: '96%',
          maxWidth: '98%',
          minWidth: '98%',
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
            <Typography variant="h5" mb={3}>{title}</Typography>
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
            overflow: 'auto',
            flex: 1,
          }}
        >
          <Divider sx={{ mb: 3 }} />
          
          {/* Regular form fields in 2 columns */}
          <Box 
            sx={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: 3, 
              pb: 2,
              '@media (max-width: 768px)': {
                gridTemplateColumns: '1fr',
              }
            }}
          >
            {formFields.filter(field => field.type !== 'items').map(field => renderFormField(field))}
          </Box>
          
          {/* Items table in full width */}
          {formFields.filter(field => field.type === 'items').map(field => (
            <Box key={field.name} sx={{ pb: 2 }}>
              {renderFormField(field)}
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', gap: 3, mb: 2, pt: 2, borderTop: '1px solid #e0e0e0' }}>
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
