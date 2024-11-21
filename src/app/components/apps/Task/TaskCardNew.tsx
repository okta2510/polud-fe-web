import React from 'react';
import { Box, FormControlLabel, Button, Grid, MenuItem, FormControl, Alert, RadioGroup, Typography, InputAdornment, TableHead, TableRow, TableCell, TableSortLabel, IconButton, Stack, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
import Divider from '@mui/material/Divider';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField'
import CustomSelect from '@/app/components/forms/theme-elements/CustomSelect';
import CustomRadio from '@/app/components/forms/theme-elements/CustomRadio';
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';
import CustomCheckbox from '@/app/components/forms/theme-elements/CustomCheckbox';
import ParentCard from '@/app/components/shared/ParentCard';
import ChildCard from '@/app/components/shared/ChildCard';
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Autocomplete from '@mui/material/Autocomplete';
import { IconEye, IconPlus, IconPrinter, IconSearch, IconTrash } from '@tabler/icons-react';
import { visuallyHidden } from '@mui/utils';
import { alpha, useTheme, styled } from '@mui/material/styles';
import data from '../../forms/form-elements/autoComplete/data';
import { head } from 'lodash';

const taskCardStatus = [
    {
        value: 'open',
        label: 'OPEN',
    },
    {
        value: 'cancel',
        label: 'CANCEL',
    },
    {
        value: 'applicable',
        label: 'APPLICABLE',
    },
    {
        value: 'not effective',
        label: 'NOT EFFECTIVE',
    },
    {
        value: 'pending',
        label: 'PENDING',
    },
    {
        value: 'rejected',
        label: 'REJECTED',
    },
    {
        value: 'terminated',
        label: 'TERMINATED',
    },
];

const attaNumbering = [
    { label: '001 Engine', value: '001' },
    { label: '002 Engine', value: '002' },
    { label: '003 Engine', value: '003' },
    { label: '004 Engine', value: '004' },
    { label: '005 Engine', value: '005' },
];

const headPartNumberCells: HeadCell[] = [
    {
        id: 'partNumber',
        align: 'center',
        disablePadding: false,
        label: 'Part Number',
    },
    {
        id: 'description',
        align: 'left',
        disablePadding: false,
        label: 'Description',
    },
    {
        id: 'category',
        align: 'left',
        disablePadding: false,
        label: 'Category',
    },
    {
        id: 'quantity',
        align: 'left',
        disablePadding: false,
        label: 'Quantity',
    },
    {
        id: 'unitOfMeasurement',
        align: 'left',
        disablePadding: false,
        label: 'Unit Of Measurement',
    },
    {
        id: 'spare',
        align: 'left',
        disablePadding: false,
        label: 'Spare',
    },
    {
        id: 'reserve',
        align: 'left',
        disablePadding: false,
        label: 'Reserve',
    },
    {
        id: 'actions',
        align: 'center',
        disablePadding: false,
        label: 'Actions',
    },
];

const headZonesCells: HeadCell[] = [
    {
        id: 'zone',
        align: 'center',
        disablePadding: false,
        label: 'Zone',
    },
    {
        id: 'description',
        align: 'left',
        disablePadding: false,
        label: 'Description',
    },
    {
        id: 'item',
        align: 'left',
        disablePadding: false,
        label: 'Item',
    },
    {
        id: 'aircraftType',
        align: 'left',
        disablePadding: false,
        label: 'Aircraft Type',
    },
    {
        id: 'aircraftSeries',
        align: 'left',
        disablePadding: false,
        label: 'Aircraft Series',
    },
    {
        id: 'actions',
        align: 'center',
        disablePadding: false,
        label: 'Actions',
    },
];


const headPanelCells: HeadCell[] = [
    {
        id: 'panel',
        align: 'center',
        disablePadding: false,
        label: 'Panel',
    },
    {
        id: 'description',
        align: 'left',
        disablePadding: false,
        label: 'Description',
    },
    {
        id: 'item',
        align: 'left',
        disablePadding: false,
        label: 'Item',
    },
    {
        id: 'aircraftType',
        align: 'left',
        disablePadding: false,
        label: 'Aircraft Type',
    },
    {
        id: 'aircraftSeries',
        align: 'left',
        disablePadding: false,
        label: 'Aircraft Series',
    },
    {
        id: 'actions',
        align: 'center',
        disablePadding: false,
        label: 'Actions',
    },
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }

    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }

        return a[1] - b[1];
    });

    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    id: string;
    label: string;
    disablePadding: boolean;
    align: 'left' | 'right' | 'center' | 'justify' | 'inherit' | undefined;
}

interface EnhancedTableProps {
    headCells: HeadCell[];
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property: any) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {/* <TableCell padding="checkbox">
            <CustomCheckbox
              color="primary"
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell> */}
                {props.headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const EnhancedTableList = (data: any) => {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<any>('');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [search, setSearch] = React.useState('');

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: any) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const [rows, setRows] = React.useState<any>([]);

    // This is for select all the row
    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n: any) => n.id);
            setSelected(newSelecteds);

            return;
        }
        setSelected([]);
    };

    // This is for the single row sleect
    /*  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
         event.stopPropagation();
         const selectedIndex = selected.indexOf(name);
         let newSelected: readonly string[] = [];
 
         if (selectedIndex === -1) {
             newSelected = newSelected.concat(selected, name);
         } else if (selectedIndex === 0) {
             newSelected = newSelected.concat(selected.slice(1));
         } else if (selectedIndex === selected.length - 1) {
             newSelected = newSelected.concat(selected.slice(0, -1));
         } else if (selectedIndex > 0) {
             newSelected = newSelected.concat(
                 selected.slice(0, selectedIndex),
                 selected.slice(selectedIndex + 1),
             );
         }
 
         setSelected(newSelected);
     }; */

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const theme = useTheme();
    const borderColor = theme.palette.divider;
    return (
        <>
            <TableContainer>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                >
                    <EnhancedTableHead
                        headCells={data.headCells}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                    />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row: any, index) => {
                                const isItemSelected = isSelected(row.taskId);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                    >
                                        {/* <TableCell padding="checkbox">
                                                        <CustomCheckbox
                                                            onClick={(event) => handleClick(event, row.title)}
                                                            color="primary"
                                                            checked={isItemSelected}
                                                            inputProps={{
                                                                'aria-labelledby': labelId,
                                                            }}
                                                        />
                                                    </TableCell> */}
                                        <TableCell>
                                            <Box>
                                                <Typography >{row.id}</Typography>
                                            </Box>
                                        </TableCell>
                                        {/* task card */}
                                        <TableCell>
                                            <Box display="flex" alignItems="center">
                                                <Typography variant="subtitle2">
                                                    {row.taskCard}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        {/* type */}
                                        <TableCell>
                                            <Box display="flex" alignItems="center">
                                                <Typography
                                                    color="textSecondary"
                                                    variant="subtitle2"
                                                >
                                                    {row.type}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        {/* category */}
                                        <TableCell>
                                            <Box display="flex" alignItems="center">
                                                <Typography variant="subtitle2">
                                                    {row.category}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        {/* task description */}
                                        <TableCell>
                                            <Typography fontWeight={400} variant="subtitle2">
                                                {row.description}
                                            </Typography>
                                        </TableCell>
                                        {/* status */}
                                        <TableCell>
                                            <Typography fontWeight={400} variant="subtitle2">
                                                {row.status}
                                            </Typography>
                                        </TableCell>
                                        {/* action */}
                                        <TableCell>
                                            <Stack
                                                direction="row"
                                                spacing={1}
                                            >
                                                <IconButton color="error">
                                                    <IconTrash width={25} height={25} />
                                                </IconButton>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow
                            >
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}

const TaskCardAddNew = () => {
    const [value, setValue] = React.useState("1");
    const [status, setStatus] = React.useState('');

    const handleChange = (_: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const handleChangeStatus = (event: any) => {
        setStatus(event.target.value);
    };

    return (
        <div>
            <ParentCard
                title=""
                footer={
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                variant="contained"
                                color="error"
                                sx={{
                                    mr: 1,
                                }}
                            >
                                Cancel
                            </Button>
                            <Button variant="contained" color="primary">
                                Save
                            </Button>
                        </Box>
                    </>
                }
            >
                <>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', borderRadius: '0px 0px 0px 0px' }}>
                            <TabList
                                onChange={handleChange}
                                aria-label="lab API tabs example"
                                variant="scrollable"
                                sx={{ borderRadius: '0px 0px 0px 0px' }}
                                scrollButtons={false}
                            >
                                <Tab sx={{ width: "auto", px: '20px' }} label="General" value="1" />
                                <Tab sx={{ width: "auto", px: '20px' }} label="Material" value="2" />
                                <Tab sx={{ width: "auto", px: '20px' }} label="Informational" value="3" />
                            </TabList>
                        </Box>

                        {/* ### tab General ###*/}
                        <TabPanel value="1">
                            <form>
                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Task Card</CustomFormLabel>
                                        <CustomTextField disabled id="fname-text" variant="outlined" fullWidth />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Type</CustomFormLabel>
                                        <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                    </Grid>

                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Category</CustomFormLabel>
                                        <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={12} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Task Description</CustomFormLabel>
                                        <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">ATA Numbering</CustomFormLabel>
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-search-task"
                                            options={attaNumbering}
                                            fullWidth
                                            sx={{
                                                "& .MuiInputBase-root": { padding: "5px" },
                                            }}
                                            renderInput={(params) => (
                                                <CustomTextField {...params} placeholder="Select ATA Number" aria-label="Select ATA Number" />
                                            )}
                                        />
                                    </Grid>

                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Aircraft Effectivity</CustomFormLabel>
                                        <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Status</CustomFormLabel>
                                        <CustomSelect
                                            id="standard-select-status"
                                            value={status}
                                            onChange={handleChangeStatus}
                                            fullWidth
                                            variant="outlined"
                                        >
                                            {taskCardStatus.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </CustomSelect>
                                    </Grid>
                                </Grid>
                            </form>
                        </TabPanel>

                        {/* ### tab Material ###*/}
                        <TabPanel value="2">
                            <form>
                                {/* ### Part Number ###*/}
                                <ChildCard title=''>
                                    <Grid container spacing={3} mb={3}>
                                        <Grid item lg={12} md={12} sm={12}>
                                            <CustomFormLabel htmlFor="fname-text">Part Number</CustomFormLabel>
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-search-task"
                                                options={attaNumbering}
                                                fullWidth
                                                sx={{
                                                    "& .MuiInputBase-root": { paddingTop: "6px", paddingBottom: "6px", paddingLeft: "16px" },
                                                }}
                                                renderInput={(params) => (
                                                    <CustomTextField
                                                        {...params}
                                                        placeholder="Search or Select Part Number"
                                                        aria-label="Search or Select Part Number"
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <IconSearch size="1.1rem" />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={3} mb={3}>
                                        <Grid item lg={3} md={12} sm={12}>
                                            <CustomFormLabel htmlFor="fname-text">Description</CustomFormLabel>
                                            <CustomTextField disabled id="fname-text" variant="outlined" fullWidth />
                                        </Grid>
                                        <Grid item lg={3} md={12} sm={12}>
                                            <CustomFormLabel htmlFor="fname-text">Item</CustomFormLabel>
                                            <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                        </Grid>
                                        <Grid item lg={3} md={12} sm={12}>
                                            <CustomFormLabel htmlFor="fname-text">Category</CustomFormLabel>
                                            <CustomTextField disabled id="fname-text" variant="outlined" fullWidth />
                                        </Grid>
                                        <Grid item lg={3} md={12} sm={12}>
                                            <CustomFormLabel htmlFor="fname-text">Quantity</CustomFormLabel>
                                            <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={3} mb={3}>
                                        <Grid item lg={6} md={12} sm={12}>
                                            <CustomFormLabel htmlFor="fname-text">Spare</CustomFormLabel>
                                            <Autocomplete
                                                id="combo-box-search-task"
                                                options={attaNumbering}
                                                fullWidth
                                                sx={{
                                                    "& .MuiInputBase-root": { padding: "6px" },
                                                }}
                                                renderInput={(params) => (
                                                    <CustomTextField {...params} placeholder="Select" aria-label="Select" />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item lg={6} md={12} sm={12}>
                                            <CustomFormLabel htmlFor="fname-text">Reserve</CustomFormLabel>
                                            <Autocomplete
                                                id="combo-box-search-task"
                                                options={attaNumbering}
                                                fullWidth
                                                sx={{
                                                    "& .MuiInputBase-root": { padding: "6px" },
                                                }}
                                                renderInput={(params) => (
                                                    <CustomTextField {...params} placeholder="Select" aria-label="Select" />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                    <>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                sx={{
                                                    mr: 1,
                                                }}
                                            >
                                                Delete
                                            </Button>
                                            <Button sx={{
                                                "& .MuiButton-startIcon": { marginRight: "1px" },
                                            }} variant="contained" color="primary" startIcon={<IconPlus size={16} />}>
                                                Add
                                            </Button>
                                        </Box>
                                    </>
                                </ChildCard>
                                <Box sx={{ marginTop: '24px', marginBottom: '60px' }}>
                                    <EnhancedTableList headCells={headPartNumberCells}/>
                                </Box>
                                {/* ### Zones ###*/}
                                <ChildCard title=''>
                                    <Grid container spacing={3} mb={3}>
                                        <Grid item lg={12} md={12} sm={12}>
                                            <CustomFormLabel htmlFor="fname-text">Zones</CustomFormLabel>
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-search-task"
                                                options={attaNumbering}
                                                fullWidth
                                                sx={{
                                                    "& .MuiInputBase-root": { paddingTop: "6px", paddingBottom: "6px", paddingLeft: "16px" },
                                                }}
                                                renderInput={(params) => (
                                                    <CustomTextField
                                                        {...params}
                                                        placeholder="Search or Select Zones"
                                                        aria-label="Search or Select Zones"
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <IconSearch size="1.1rem" />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={3} mb={3}>
                                        <Grid item lg={6} md={12} sm={12}>
                                            <CustomFormLabel htmlFor="fname-text">Description</CustomFormLabel>
                                            <CustomTextField disabled id="fname-text" variant="outlined" fullWidth />
                                        </Grid>
                                        <Grid item lg={6} md={12} sm={12}>
                                            <CustomFormLabel htmlFor="fname-text">Item</CustomFormLabel>
                                            <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={3} mb={3}>
                                        <Grid item lg={6} md={12} sm={12}>
                                            <CustomFormLabel htmlFor="fname-text">Aircraft Type</CustomFormLabel>
                                            <Autocomplete
                                                id="combo-box-search-task"
                                                options={attaNumbering}
                                                fullWidth
                                                sx={{
                                                    "& .MuiInputBase-root": { padding: "6px" },
                                                }}
                                                renderInput={(params) => (
                                                    <CustomTextField {...params} placeholder="Select" aria-label="Select" />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item lg={6} md={12} sm={12}>
                                            <CustomFormLabel htmlFor="fname-text">Aircraft Series</CustomFormLabel>
                                            <Autocomplete
                                                id="combo-box-search-task"
                                                options={attaNumbering}
                                                fullWidth
                                                sx={{
                                                    "& .MuiInputBase-root": { padding: "6px" },
                                                }}
                                                renderInput={(params) => (
                                                    <CustomTextField {...params} placeholder="Select" aria-label="Select" />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                    <>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                sx={{
                                                    mr: 1,
                                                }}
                                            >
                                                Delete
                                            </Button>
                                            <Button sx={{
                                                "& .MuiButton-startIcon": { marginRight: "1px" },
                                            }} variant="contained" color="primary" startIcon={<IconPlus size={16} />}>
                                                Add
                                            </Button>
                                        </Box>
                                    </>
                                </ChildCard>
                                <Box sx={{ marginTop: '24px', marginBottom: '60px' }}>
                                    <EnhancedTableList headCells={headZonesCells} />
                                </Box>
                                {/* ### Panels ###*/}
                                <ChildCard title=''>
                                    <Grid container spacing={3} mb={3}>
                                        <Grid item lg={12} md={12} sm={12}>
                                            <CustomFormLabel htmlFor="fname-text">Panels</CustomFormLabel>
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-search-task"
                                                options={attaNumbering}
                                                fullWidth
                                                sx={{
                                                    "& .MuiInputBase-root": { paddingTop: "6px", paddingBottom: "6px", paddingLeft: "16px" },
                                                }}
                                                renderInput={(params) => (
                                                    <CustomTextField
                                                        {...params}
                                                        placeholder="Search or Select Panels"
                                                        aria-label="Search or Select Panels"
                                                        InputProps={{
                                                            ...params.InputProps,
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <IconSearch size="1.1rem" />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={3} mb={3}>
                                        <Grid item lg={6} md={12} sm={12}>
                                            <CustomFormLabel htmlFor="fname-text">Description</CustomFormLabel>
                                            <CustomTextField disabled id="fname-text" variant="outlined" fullWidth />
                                        </Grid>
                                        <Grid item lg={6} md={12} sm={12}>
                                            <CustomFormLabel htmlFor="fname-text">Item</CustomFormLabel>
                                            <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={3} mb={3}>
                                        <Grid item lg={6} md={12} sm={12}>
                                            <CustomFormLabel htmlFor="fname-text">Aircraft Type</CustomFormLabel>
                                            <Autocomplete
                                                id="combo-box-search-task"
                                                options={attaNumbering}
                                                fullWidth
                                                sx={{
                                                    "& .MuiInputBase-root": { padding: "6px" },
                                                }}
                                                renderInput={(params) => (
                                                    <CustomTextField {...params} placeholder="Select" aria-label="Select" />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item lg={6} md={12} sm={12}>
                                            <CustomFormLabel htmlFor="fname-text">Aircraft Series</CustomFormLabel>
                                            <Autocomplete
                                                id="combo-box-search-task"
                                                options={attaNumbering}
                                                fullWidth
                                                sx={{
                                                    "& .MuiInputBase-root": { padding: "6px" },
                                                }}
                                                renderInput={(params) => (
                                                    <CustomTextField {...params} placeholder="Select" aria-label="Select" />
                                                )}
                                            />
                                        </Grid>
                                    </Grid>
                                    <>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                sx={{
                                                    mr: 1,
                                                }}
                                            >
                                                Delete
                                            </Button>
                                            <Button sx={{
                                                "& .MuiButton-startIcon": { marginRight: "1px" },
                                            }} variant="contained" color="primary" startIcon={<IconPlus size={16} />}>
                                                Add
                                            </Button>
                                        </Box>
                                    </>
                                </ChildCard>
                                <Box sx={{ marginTop: '24px' }}>
                                    <EnhancedTableList headCells={headPanelCells} />
                                </Box>
                            </form>
                        </TabPanel>

                        {/* ### tab Informational ###*/}
                        <TabPanel value="3">
                            <form>
                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Created By</CustomFormLabel>
                                        <CustomTextField disabled id="fname-text" variant="outlined" fullWidth />
                                    </Grid>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Created Date</CustomFormLabel>
                                        <CustomTextField disabled type="date" id="fs-date" placeholder="dd/mm/yyyy" fullWidth />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Last Edited By</CustomFormLabel>
                                        <CustomTextField disabled id="fname-text" variant="outlined" fullWidth />
                                    </Grid>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Last Edited Date</CustomFormLabel>
                                        <CustomTextField disabled type="date" id="fs-date" placeholder="dd/mm/yyyy" fullWidth />
                                    </Grid>
                                </Grid>
                            </form>
                        </TabPanel>
                    </TabContext>
                </>
            </ParentCard>
        </div>
    );
}

export default TaskCardAddNew;