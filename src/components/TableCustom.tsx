import { ColorCommon } from "@/constants/color-common";
import { Box, Typography } from "@mui/material";
import {
  DataGrid,
  DataGridProps,
  GridCallbackDetails,
  GridColDef,
  GridEditMode,
  GridEventListener,
  GridRowHeightParams,
  GridRowHeightReturnValue,
  GridRowModel,
  GridRowModesModel,
  GridRowSelectionModel,
  GridValidRowModel,
} from "@mui/x-data-grid";
interface ITableCustomProps {
  rows: any[];
  columns: GridColDef[];
  bgHeader?: string;
  colorTextHeader?: string;
  checkboxSelection?: boolean;
  txtEmpty?: string;
  getRowId?: (row: any) => string | number;
  hasBoldRowLast?: boolean;
  height?: string;
  hideHeader?: boolean;
  isLoading?: boolean;
  isRowSelectable?: DataGridProps["isRowSelectable"];
  processRowUpdate: (
    newRow: GridRowModel,
    oldRow: GridRowModel
  ) => Promise<
    | GridValidRowModel
    | {
        data: any;
      }
    | undefined
  >;
  onRowSelectionModelChange?: (
    rowSelectionModel: GridRowSelectionModel,
    details: GridCallbackDetails
  ) => void;
  editMode?: GridEditMode;
  rowModesModel?: GridRowModesModel | undefined;
  rowSelectionModel?: GridRowSelectionModel;
  onProcessRowUpdateError?: ((error: any) => void) | undefined;
  onRowEditStop?: GridEventListener<"rowEditStop"> | undefined;
  onRowModesModelChange?:
    | ((rowModesModel: GridRowModesModel, details: GridCallbackDetails) => void)
    | undefined;
  rowHeight?: number;
  getRowHeight?:
    | ((params: GridRowHeightParams) => GridRowHeightReturnValue)
    | undefined;
}
export default function TableCustom(props: ITableCustomProps) {
  const {
    rows,
    columns,
    bgHeader,
    colorTextHeader,
    checkboxSelection = true,
    txtEmpty = "No data",
    getRowId = (row) => row.id,
    hasBoldRowLast = false,
    height = "auto",
    hideHeader = false,
    isLoading = false,
    isRowSelectable,
    onRowSelectionModelChange,
    processRowUpdate,
    editMode = "row",
    rowModesModel,
    onRowModesModelChange,
    rowSelectionModel,
    rowHeight,
    getRowHeight,
    onRowEditStop,
    onProcessRowUpdateError,
  } = props;
  const getCellClassName: DataGridProps["getCellClassName"] = ({ row }) => {
    if (row.id === "total") {
      return "bold";
    }
    return "";
  };
  return (
    <Box
      className='w-full'
      sx={{
        "& .bold": {
          fontWeight: 400,
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection={checkboxSelection}
        disableColumnMenu
        disableRowSelectionOnClick
        pageSizeOptions={[rows.length]}
        hideFooter
        loading={isLoading}
        getRowId={getRowId}
        editMode={editMode}
        rowModesModel={rowModesModel}
        autoHeight
        getRowHeight={getRowHeight ? getRowHeight : () => "auto"}
        rowHeight={rowHeight}
        sx={{
          height,
          ".MuiDataGrid-columnHeader": {
            backgroundColor: bgHeader,
            width: "100%",
            color: colorTextHeader,
            fontSize: "16px",
            display: hideHeader ? "none" : undefined,
          },
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: `2px solid ${ColorCommon.grayMiddle}`,
          },
          ".MuiDataGrid-columnHeaderTitle": {
            fontWeight: 600,
          },
          "&.MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-row--lastVisible > .MuiDataGrid-cell": {
            fontWeight: hasBoldRowLast ? 600 : 400,
          },
          "& .MuiDataGrid-viewport": {
            overflow: "hidden !important",
          },
          "& .MuiDataGrid-cell": {
            fontSize: "16px",
            minHeight: "52px",
            whiteSpace: "break-spaces",
            lineHeight: "18px",
            display: "flex",
            alignItems: "center",
          },
          ".MuiDataGrid-cell": {},
        }}
        onRowEditStop={onRowEditStop}
        rowSelectionModel={rowSelectionModel}
        onRowModesModelChange={onRowModesModelChange}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={onProcessRowUpdateError}
        isRowSelectable={isRowSelectable}
        onRowSelectionModelChange={onRowSelectionModelChange}
        getCellClassName={getCellClassName}
        slots={{
          noRowsOverlay: () => (
            <Box className='flex items-center justify-center h-full'>
              <Typography className='!font-manrope'>{txtEmpty}</Typography>
            </Box>
          ),
        }}
      />
    </Box>
  );
}
