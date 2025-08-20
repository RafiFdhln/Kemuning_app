import React from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { baselightTheme } from '../src/theme/DefaultColors';
import { colors } from '@mui/material';

type DataTableProps<TData> = {
  columns: MRT_ColumnDef<TData>[];  
  data: TData[];                     
  pageSize?: number;                 
  showGlobalFilter?: boolean;    
};

const DataTable = <TData,>({
  columns,
  data,
  pageSize,            
  showGlobalFilter,
}: DataTableProps<TData>) => (
  <MaterialReactTable
    columns={columns}
    data={data}
    enablePagination
    muiTablePaperProps={{
      elevation: 0,
    }}
    muiTableSortLabel-root={{
      sx: {
        backgroundColor: baselightTheme.palette.success.contrastText,
      },
    }}
    muiFilterTextFieldProps-input={{
      sx: {
        color: baselightTheme.palette.success.contrastText,
      },
    }}
    muiTableHeadCellProps={{
      sx: {
        backgroundColor: baselightTheme.palette.primary.dark,
        color: baselightTheme.palette.success.contrastText,
      },
    }}
    muiColumnActionsButtonProps={{
      sx: {
        color: baselightTheme.palette.success.contrastText,
      },
    }}
    positionGlobalFilter="left"
    initialState={{
      pagination: {
        pageSize: pageSize,
        pageIndex: 0,
      },
      showGlobalFilter: showGlobalFilter,
    }}
    muiTableBodyRowProps={({ row }) => ({
      hover: false,
      sx: {
        backgroundColor: row.index % 2 === 0
          ? baselightTheme.palette.grey[100]
          : baselightTheme.palette.grey[200], // Warna berbeda untuk genap dan ganjil
      },
    })} />
);

export default DataTable;
