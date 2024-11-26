import React, { useState } from 'react';
import { Box, Button, Grid, MenuItem, Typography, InputAdornment, TableHead, TableRow, TableCell, TableSortLabel, IconButton, Stack, Table, TableBody, TableContainer, TablePagination, useTheme } from '@mui/material';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField'
import CustomSelect from '@/app/components/forms/theme-elements/CustomSelect';
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';
import ParentCard from '@/app/components/shared/ParentCard';
import ChildCard from '@/app/components/shared/ChildCard';
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Autocomplete from '@mui/material/Autocomplete';
import { IconPlus, IconSearch, IconTrash } from '@tabler/icons-react';
import { visuallyHidden } from '@mui/utils';
import { useDispatch } from '@/store/hooks';

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
        align: 'center',
        disablePadding: false,
        label: 'Description',
    },
    {
        id: 'category',
        align: 'center',
        disablePadding: false,
        label: 'Category',
    },
    {
        id: 'quantity',
        align: 'center',
        disablePadding: false,
        label: 'Quantity',
    },
    {
        id: 'unitOfMeasurement',
        align: 'center',
        disablePadding: false,
        label: 'Unit Of Measurement',
    },
    {
        id: 'spare',
        align: 'center',
        disablePadding: false,
        label: 'Spare',
    },
    {
        id: 'reserve',
        align: 'center',
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
        align: 'center',
        disablePadding: false,
        label: 'Description',
    },
    {
        id: 'item',
        align: 'center',
        disablePadding: false,
        label: 'Item',
    },
    {
        id: 'aircraftType',
        align: 'center',
        disablePadding: false,
        label: 'Aircraft Type',
    },
    {
        id: 'aircraftSeries',
        align: 'center',
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
        align: 'center',
        disablePadding: false,
        label: 'Description',
    },
    {
        id: 'item',
        align: 'center',
        disablePadding: false,
        label: 'Item',
    },
    {
        id: 'aircraftType',
        align: 'center',
        disablePadding: false,
        label: 'Aircraft Type',
    },
    {
        id: 'aircraftSeries',
        align: 'center',
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

type Order = 'asc' | 'desc';

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

    function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }

        return 0;
    }

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

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: any) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const [rows, setRows] = React.useState<any>([data.items]);

    React.useEffect(() => {
        setRows(data.items);
    }, [data.items]);

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n: any) => n.id);
            setSelected(newSelecteds);

            return;
        }
        setSelected([]);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
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
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={labelId}
                                    >
                                        {data.for === 'part-number' && (
                                            <React.Fragment>
                                                <TableCell align='center'>
                                                    <Typography >{row.partNumber}</Typography>
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <Typography variant="subtitle2">
                                                        {row.description}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <Typography variant="subtitle2">
                                                        {row.category}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <Typography variant="subtitle2">
                                                        {row.quantity}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <Typography fontWeight={400} variant="subtitle2">
                                                        {row.unitOfMeasurement}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <Typography fontWeight={400} variant="subtitle2">
                                                        {row.spare}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <Typography fontWeight={400} variant="subtitle2" color={row.reserve === 'Booked' ? 'primary': 'error'}>
                                                        {row.reserve}
                                                    </Typography>
                                                </TableCell>
                                            </React.Fragment>)}

                                        {data.for === 'zones' && (
                                            <React.Fragment>
                                                <TableCell align='center'>
                                                    <Typography >{row.zone}</Typography>
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <Typography variant="subtitle2">
                                                        {row.description}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <Typography variant="subtitle2">
                                                        {row.item}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <Typography fontWeight={400} variant="subtitle2">
                                                        {row.aircraft_type}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <Typography fontWeight={400} variant="subtitle2">
                                                        {row.aircraft_series}
                                                    </Typography>
                                                </TableCell>
                                            </React.Fragment>)}

                                        {data.for === 'panels' && (
                                            <React.Fragment>
                                                <TableCell align='center'>
                                                    <Typography >{row.panel}</Typography>
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <Typography variant="subtitle2">
                                                        {row.description}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <Typography variant="subtitle2">
                                                        {row.item}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <Typography fontWeight={400} variant="subtitle2">
                                                        {row.aircraft_type}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <Typography fontWeight={400} variant="subtitle2">
                                                        {row.aircraft_series}
                                                    </Typography>
                                                </TableCell>
                                            </React.Fragment>)}

                                        <TableCell align='center'>
                                            <IconButton color="error">
                                                <IconTrash width={25} height={25} />
                                            </IconButton>
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
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [detailId, setDetailId] = useState(0);
    const [value, setValue] = React.useState("1");
    const [formValues, setFormValues] = useState({
        createdBy: 'ACTYPSERMS',
        createdDate: '2024-11-15T01:23',
        lastEditedBy: 'GEVERFOREVER',
        lastEditedDate: '2024-11-15T01:23',
    });


    const initialGeneral = {
        taskCard: '',
        type: '',
        category: '',
        description: '',
        ata: '',
        aircraft_effectivity: '',
        status: '',
    }
    const [general, setGeneral] = React.useState({ ...initialGeneral })

    const initialPartNumber = {
        partNumber: '',
        description: '',
        category: '',
        quantity: 0,
        unitOfMeasurement: '',
        spare: '',
        reserve: '',
    }

    const initialZone = {
        zone: '',
        description: '',
        item: '',
        aircraft_type: '',
        aircraft_series: '',
    }

    const initialPanel = {
        panel: '',
        description: '',
        item: '',
        aircraft_type: '',
        aircraft_series: '',
    }

    const initialMaterial = {
        partNumbers: [],
        zones: [],
        panels: [],
    }
    const [material, setMaterial] = React.useState({ ...initialMaterial })

    const initialInformational = {
        createdBy: '',
        createdDate: '',
        lastEditedBy: '',
        lastEditedDate: '',
    }
    const [informational, setInformational] = React.useState({ ...initialInformational })

    interface typeTaskCards {
        id: number;
        general?: {
            taskCard: string;
            type: string;
            category: string;
            description: string;
            ata: string;
            aircraft_effectivity: string;
            status: string;
        },
        material?: {
            partNumbers: [];
            zones: [];
            panels: [];
        };
        informational?: {
            createdBy: string;
            createdDate: string;
            lastEditedBy: string;
            lastEditedDate: string;
        }
    }


    React.useEffect(() => {
        const cachedData = localStorage.getItem('taskCardData');
        const currentUrl = window.location.href;
        const match = currentUrl.match(/\/task-card\/(\d+)/);
        const id = match ? parseInt(match[1], 10) : 0
        setDetailId(id)

        if (cachedData && match) {
            const parsedData: typeTaskCards[] = JSON.parse(cachedData);
            const obj = parsedData.find(x => x.id === id)
            if (obj && obj.general) {
                setGeneral(obj.general)
            }

            if (obj && obj.material) {
                setMaterial(obj.material)
            }
        }
    }, []);

    const handleChange = (_: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log(e.target)
        const { name, value } = e.target;
        setGeneral((prevState) => ({
            ...prevState,
            [name]: value,
        }));
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
                                        <CustomTextField disabled
                                            id="fname-text"
                                            variant="outlined"
                                            fullWidth
                                            name="taskCard"
                                            value={general.taskCard}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Type</CustomFormLabel>
                                        <CustomTextField
                                            id="fname-text"
                                            variant="outlined"
                                            fullWidth
                                            name="type"
                                            value={general.type}
                                            onChange={handleGeneralChange}
                                        />
                                    </Grid>

                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Category</CustomFormLabel>
                                        <CustomTextField
                                            id="fname-text"
                                            variant="outlined"
                                            fullWidth
                                            name="category"
                                            value={general.category}
                                            onChange={handleGeneralChange}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={12} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Task Description</CustomFormLabel>
                                        <CustomTextField
                                            id="fname-text"
                                            variant="outlined"
                                            fullWidth
                                            name="description"
                                            value={general.description}
                                            onChange={handleGeneralChange}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">ATA Numbering</CustomFormLabel>
                                        <CustomSelect
                                            id="general-ata"
                                            name="ata"
                                            value={general.ata}
                                            onChange={handleGeneralChange}
                                            fullWidth
                                            required
                                            variant="outlined"
                                        >
                                            {attaNumbering.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </CustomSelect>
                                    </Grid>

                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Aircraft Effectivity</CustomFormLabel>
                                        <CustomTextField
                                            id="fname-text"
                                            variant="outlined"
                                            fullWidth
                                            name="aircraft_effectivity"
                                            value={general.aircraft_effectivity}
                                            onChange={handleGeneralChange}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Status</CustomFormLabel>
                                        <CustomSelect
                                            id="general-status"
                                            name="status"
                                            value={general.status}
                                            onChange={handleGeneralChange}
                                            fullWidth
                                            required
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
                                    <EnhancedTableList headCells={headPartNumberCells} items={material.partNumbers} for="part-number" />
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
                                    <EnhancedTableList headCells={headZonesCells} items={material.zones} for="zones" />
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
                                    <EnhancedTableList headCells={headPanelCells} items={material.panels} for="panels" />
                                </Box>
                            </form>
                        </TabPanel>

                        {/* ### tab Informational ###*/}
                        <TabPanel value="3">
                            <form>
                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Created By</CustomFormLabel>
                                        <CustomTextField value={formValues.createdBy} disabled id="fname-text" variant="outlined" fullWidth />
                                    </Grid>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Created Date</CustomFormLabel>
                                        <CustomTextField
                                            id="date"
                                            type="datetime-local"
                                            disabled
                                            variant="outlined"
                                            fullWidth
                                            value={formValues.createdDate}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormValues({ ...formValues, createdDate: e.target.value })}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Last Edited By</CustomFormLabel>
                                        <CustomTextField disabled id="fname-text" value={formValues.lastEditedBy} variant="outlined" fullWidth />
                                    </Grid>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Last Edited Date</CustomFormLabel>
                                        <CustomTextField
                                            id="date"
                                            type="datetime-local"
                                            variant="outlined"
                                            fullWidth
                                            disabled
                                            value={formValues.lastEditedDate}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                setFormValues({ ...formValues, lastEditedDate: e.target.value });
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
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