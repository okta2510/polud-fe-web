import React, { useState } from 'react';
import { Box, FormControlLabel, Button, Grid, MenuItem, FormControl, Alert, RadioGroup, Typography, InputAdornment, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Select, Radio, Collapse, TablePagination, TableSortLabel } from '@mui/material';
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
import { IconPlus, IconSearch, IconTrash } from '@tabler/icons-react';
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { visuallyHidden } from '@mui/utils';
import { useSelector, useDispatch } from '@/store/hooks';
import { fetchTaskCards } from '@/store/apps/Task/TaskCardSlice';
import { TaskCardType } from '@/app/(DashboardLayout)/types/apps/task';

const taskStatus = [
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

const choices = [
    {
        value: 'yes',
        label: 'YES',
    },
    {
        value: 'no',
        label: 'NO',
    },
];

const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
    {
        label: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { label: 'The Good, the Bad and the Ugly', year: 1966 },
    { label: 'Fight Club', year: 1999 },
    {
        label: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        label: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    { label: 'Forrest Gump', year: 1994 },
    { label: 'Inception', year: 2010 },
    {
        label: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { label: 'Goodfellas', year: 1990 },
    { label: 'The Matrix', year: 1999 },
    { label: 'Seven Samurai', year: 1954 },
];

const sampleData = [
    {
        id: 1,
        type: "600",
        series: "555",
        aircraft: "QV-KKK",
        status: "No AC Under Type",
        options: { applicable: false, notApplicable: true },
        children: [],
    },
    {
        id: 2,
        type: "800",
        series: "737",
        aircraft: "PK-CGK",
        status: "No AC Under Type",
        options: { applicable: true, notApplicable: false },
        children: [
            {
                id: 21,
                type: "800",
                series: "738",
                aircraft: "PK-DPS",
                status: "No AC Under Type",
                options: { applicable: true, notApplicable: false },
            },
            {
                id: 22,
                type: "800",
                series: "739",
                aircraft: "PK-BLJ",
                status: "No AC Under Type",
                options: { applicable: false, notApplicable: true },
            },
        ],
    },
    {
        id: 3,
        type: "550",
        series: "668",
        aircraft: "QM-DPS",
        status: "No AC Under Type",
        options: { applicable: false, notApplicable: true },
    },
];

const headTaskCardCells: HeadCell[] = [
    {
        id: 'taskCard',
        align: 'center',
        disablePadding: false,
        label: 'Task Card',
    },
    {
        id: 'type',
        align: 'center',
        disablePadding: false,
        label: 'Type',
    },
    {
        id: 'category',
        align: 'center',
        disablePadding: false,
        label: 'Category',
    },
    {
        id: 'description',
        align: 'center',
        disablePadding: false,
        label: 'Task Description',
    },
    {
        id: 'status',
        align: 'center',
        disablePadding: false,
        label: 'Status',
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
                                        <TableCell align='center'>
                                            <Typography >{row.taskCard}</Typography>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Typography variant="subtitle2">
                                                {row.type}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Typography variant="subtitle2">
                                                {row.category}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Typography variant="subtitle2">
                                                {row.description}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Typography fontWeight={400} variant="subtitle2">
                                                {row.status}
                                            </Typography>
                                        </TableCell>

                                        <TableCell align='center'>
                                            <IconButton color="error">
                                                <IconTrash width={25} height={25} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow>
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

const AircraftTable = () => {
    const [expandedRows, setExpandedRows] = useState<number[]>([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);

    const handleRowClick = (id: number) => {
        setExpandedRows((prev) =>
            prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        );
    };

    const handlePageChange = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead
                        sx={{
                            "& .MuiTableCell-root": { padding: "4px" }
                        }}>
                        <TableRow sx={{
                            "&:not(:last-child) td, &:not(:last-child) th": {
                                borderBottom: "none",
                            },
                        }}>
                            <TableCell padding="checkbox" />
                            <TableCell>Aircraft Type</TableCell>
                            <TableCell>Aircraft Series</TableCell>
                            <TableCell>Aircraft</TableCell>
                            <TableCell
                                align="center"
                                rowSpan={2}
                            >
                                Status
                            </TableCell>
                            <TableCell align="center">Option</TableCell>
                        </TableRow>
                        <TableRow sx={{
                            "& .MuiTableCell-root": { padding: "4px" }
                        }}>
                            <TableCell padding="checkbox" />
                            <TableCell>
                                <Autocomplete
                                    id="combo-box-search-task"
                                    options={top100Films}
                                    fullWidth
                                    sx={{
                                        "& .MuiInputBase-root": { padding: "2px" },
                                    }}
                                    renderInput={(params) => (
                                        <CustomTextField {...params} placeholder="Select" aria-label="Select" />
                                    )}
                                />
                            </TableCell>
                            <TableCell>
                                <Autocomplete
                                    id="combo-box-search-task"
                                    options={top100Films}
                                    fullWidth
                                    sx={{
                                        "& .MuiInputBase-root": { padding: "2px" },
                                    }}
                                    renderInput={(params) => (
                                        <CustomTextField {...params} placeholder="Select" aria-label="Select" />
                                    )}
                                />
                            </TableCell>
                            <TableCell>
                                <Autocomplete
                                    id="combo-box-search-task"
                                    options={top100Films}
                                    fullWidth
                                    sx={{
                                        "& .MuiInputBase-root": { padding: "2px" },
                                    }}
                                    renderInput={(params) => (
                                        <CustomTextField {...params} placeholder="Select" aria-label="Select" />
                                    )}
                                />
                            </TableCell>
                            <TableCell align="center">
                                <RadioGroup row name="radio-buttons-group" sx={{ display: "flex", justifyContent: "space-around" }}>
                                    <FormControl component="fieldset" >
                                        <FormControlLabel value="radio1" control={<CustomRadio />} label="" />
                                    </FormControl>
                                    <FormControl component="fieldset">
                                        <FormControlLabel value="radio2" control={<CustomRadio />} label="" />
                                    </FormControl>
                                </RadioGroup>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sampleData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <React.Fragment key={row.id}>
                                    <TableRow>
                                        <TableCell>
                                            {row.children && row.children?.length > 0 && (
                                                <IconButton onClick={() => handleRowClick(row.id)}>
                                                    {expandedRows.includes(row.id) ? (
                                                        <KeyboardArrowDownIcon />
                                                    ) : (
                                                        <KeyboardArrowRightIcon />
                                                    )}
                                                </IconButton>
                                            )}
                                        </TableCell>
                                        <TableCell>{row.type}</TableCell>
                                        <TableCell>{row.series}</TableCell>
                                        <TableCell>{row.aircraft}</TableCell>
                                        <TableCell align="center">{row.status}</TableCell>
                                        <TableCell align="center">
                                            <RadioGroup row name="radio-buttons-group" sx={{ display: "flex", justifyContent: "space-around" }}>
                                                <FormControl component="fieldset">
                                                    <FormControlLabel value="radio1" control={<CustomRadio />} label="Applicable" checked={row.options.applicable} />
                                                </FormControl>
                                                <FormControl component="fieldset">
                                                    <FormControlLabel value="radio2" control={<CustomRadio />} label="Not Applicable" checked={row.options.notApplicable} />
                                                </FormControl>
                                            </RadioGroup>
                                        </TableCell>
                                    </TableRow>
                                    {row.children && row.children?.length > 0 && (
                                        <TableRow>
                                            <TableCell
                                                colSpan={7}
                                                style={{
                                                    paddingBottom: 0,
                                                    paddingTop: 0,
                                                }}
                                            >
                                                <Collapse
                                                    in={expandedRows.includes(row.id)}
                                                    timeout="auto"
                                                    unmountOnExit
                                                >
                                                    <Box>
                                                        <Table>
                                                            <TableBody>
                                                                {row.children.map((child) => (
                                                                    <TableRow key={child.id}>
                                                                        <TableCell />
                                                                        <TableCell>{child.type}</TableCell>
                                                                        <TableCell>{child.series}</TableCell>
                                                                        <TableCell>{child.aircraft}</TableCell>
                                                                        <TableCell>{child.status}</TableCell>
                                                                        <TableCell align="center">
                                                                            <RadioGroup row name="radio-buttons-group" sx={{ display: "flex", justifyContent: "space-around" }}>
                                                                                <FormControl component="fieldset">
                                                                                    <FormControlLabel value="radio1" control={<CustomRadio />} label="Applicable" checked={child.options.applicable} />
                                                                                </FormControl>
                                                                                <FormControl component="fieldset">
                                                                                    <FormControlLabel value="radio2" control={<CustomRadio />} label="Not Applicable" checked={child.options.notApplicable} />
                                                                                </FormControl>
                                                                            </RadioGroup>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </Box>
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </React.Fragment>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={sampleData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
        </>
    );
}

const TaskAddNew = () => {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState("1");
    const [status, setStatus] = React.useState('');
    const [choice, setChoice] = React.useState('');
    const [detailId, setDetailId] = useState(0);
    const [formValues, setFormValues] = useState({
        createdBy: 'ACTYPSERMS',
        createdDate: '2024-11-15T01:23',
        lastEditedBy: 'GEVERFOREVER',
        lastEditedDate: '2024-11-15T01:23',
    });
    const getTaskCards: TaskCardType[] = useSelector((state) => state.taskCardReducer.taskCards);
    React.useEffect(() => {
        dispatch(fetchTaskCards());
    }, [dispatch]);

    const initialTaskCard = {
        taskCard: '',
        type: '',
        category: '',
        description: '',
        ata: '',
        aircraft_effectivity: '',
        status: '',
    }
    const [taskCard, setTaskCard] = React.useState({ ...initialTaskCard })

    const initialGeneral = {
        taskId: '',
        category: '',
        sub_category: '',
        classification: '',
        description: '',
        status: '',
    }
    const [general, setGeneral] = React.useState({ ...initialGeneral })


    const initialTaskCardControl = [initialTaskCard]
    const [taskCardControls, setTaskCardControls] = React.useState({ ...initialTaskCardControl })

    interface typeTasks {
        id: number;
        general?: {
            taskId: string;
            category: string;
            sub_category: string;
            classification: string;
            description: string;
            status: string;
        },
        task_card_control?: [],
        informational?: {
            createdBy: string;
            createdDate: string;
            lastEditedBy: string;
            lastEditedDate: string;
        }
    }

    React.useEffect(() => {
        const cachedData = localStorage.getItem('taskData');
        const currentUrl = window.location.href;
        const match = currentUrl.match(/\/task\/(\d+)/);
        const id = match ? parseInt(match[1], 10) : 0
        setDetailId(id)

        if (cachedData && match) {
            const parsedData: typeTasks[] = JSON.parse(cachedData);
            const obj = parsedData.find(x => x.id === id)
            if (obj && obj.general) {
                setGeneral(obj.general)
            }

            if (obj && obj.task_card_control) {
                setTaskCardControls(obj.task_card_control)
            }
        }
    }, []);

    const handleChange = (_: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setGeneral((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleChangeStatus = (event: any) => {
        setStatus(event.target.value);
    };

    const handleChangeChoice = (event: any) => {
        setChoice(event.target.value);
    };

    function handleTaskCardInputChange(value: any): void {
        if (value) {
            setTaskCard(value);
        } else {
            setTaskCard(initialTaskCard);
        }
    }

    const handleReset = () => {
        setGeneral({ ...initialGeneral })
    }

    const handleSave = () => {
        const cachedData = localStorage.getItem('taskData');
        const parsedData = cachedData ? JSON.parse(cachedData) : [];

        try {
            const payload = [...parsedData, ...[{
                id: parsedData.length + 1,
                general,
                informational: {},
                created: new Date(),
            }]]
            localStorage.setItem('taskData', JSON.stringify(payload));
            handleReset()
            alert('Task data saved successfully!');
            window.location.href = '/maintenance/task';
        } catch (error) {
            console.error('Error saving data to localStorage:', error);
            alert('Failed to save Task data.');
        }
    };

    const handleEdit = () => {
        const cachedData = localStorage.getItem('taskData');
        const parsedData = cachedData ? JSON.parse(cachedData) : [];
        const index = parsedData.findIndex((item: { id: number }) => item.id === detailId);
        if (index !== -1) {
            parsedData[index] = {
                ...parsedData[index], ...{
                    general,
                    informational: {}
                }
            };

            localStorage.setItem('taskData', JSON.stringify(parsedData));
            alert('Data updated successfully');
        } else {
            alert('No matching data found');
        }

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
                            <Button variant="contained" color="primary" onClick={detailId < 1 ? handleSave : handleEdit}>
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
                                <Tab sx={{ width: "auto", px: '20px' }} label="Schedule" value="2" />
                                <Tab sx={{ width: "auto", px: '20px' }} label="Aircraft" value="3" />
                                <Tab sx={{ width: "auto", px: '20px' }} label="Task Card Control" value="4" />
                                <Tab sx={{ width: "auto", px: '20px' }} label="Attachment" value="5" />
                                <Tab sx={{ width: "auto", px: '20px' }} label="Informational" value="6" />
                            </TabList>
                        </Box>

                        {/* ### tab General ###*/}
                        <TabPanel value="1">
                            <form>
                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Task ID</CustomFormLabel>
                                        <CustomTextField
                                            disabled={detailId > 0}
                                            id="fname-text"
                                            variant="outlined"
                                            fullWidth
                                            name="taskId"
                                            value={general.taskId}
                                            onChange={handleGeneralChange}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Category*</CustomFormLabel>
                                        <CustomTextField
                                            id="fname-text"
                                            variant="outlined"
                                            fullWidth
                                            name="category"
                                            value={general.category}
                                            onChange={handleGeneralChange}
                                        />
                                    </Grid>

                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Sub Category*</CustomFormLabel>
                                        <CustomTextField
                                            id="fname-text"
                                            variant="outlined"
                                            fullWidth
                                            name="sub_category"
                                            value={general.sub_category}
                                            onChange={handleGeneralChange}
                                        />
                                    </Grid>

                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Classification*</CustomFormLabel>
                                        <CustomTextField
                                            id="fname-text"
                                            variant="outlined"
                                            fullWidth
                                            name="classification"
                                            value={general.classification}
                                            onChange={handleGeneralChange}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={12} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Task Description*</CustomFormLabel>
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
                                            {taskStatus.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </CustomSelect>
                                    </Grid>
                                </Grid>
                            </form>
                        </TabPanel>

                        {/* ### tab Schedule ###*/}
                        <TabPanel value="2">
                            <form>
                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Effective Date*</CustomFormLabel>
                                        <CustomTextField type="date" id="fs-date" placeholder="dd/mm/yyyy" fullWidth />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} mb={2}>
                                    <Grid item lg={12} md={12} sm={12}>
                                        <FormControlLabel
                                            control={<CustomCheckbox />}
                                            label="PLAN TASK"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Plan Lead Days</CustomFormLabel>
                                        <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                    </Grid>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Repeat Number</CustomFormLabel>
                                        <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} mb={2}>
                                    <Grid item lg={12} md={12} sm={12}>
                                        <FormControlLabel
                                            control={<CustomCheckbox />}
                                            label="DAILY"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Ground Time Require</CustomFormLabel>
                                        <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={8} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Next Task*</CustomFormLabel>
                                        <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                    </Grid>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Total Frequency</CustomFormLabel>
                                        <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} mb={2}>
                                    <Grid item lg={12} md={12} sm={12}>
                                        <RadioGroup row aria-label="gender" defaultValue="radio1" name="radio-buttons-group">
                                            <FormControl component="fieldset">
                                                <FormControlLabel value="radio1" control={<CustomRadio />} label="Do Not Allow Extension" />
                                            </FormControl>
                                            <FormControl component="fieldset">
                                                <FormControlLabel value="radio2" control={<CustomRadio />} label="Allow Extension with QA Approval Only" />
                                            </FormControl>
                                            <FormControl component="fieldset">
                                                <FormControlLabel value="radio3" control={<CustomRadio />} label="Allow Extension" />
                                            </FormControl>
                                        </RadioGroup>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Calendar Days</CustomFormLabel>
                                        <CustomSelect
                                            id="standard-select-choice"
                                            value={choice}
                                            onChange={handleChangeChoice}
                                            fullWidth
                                            variant="outlined"
                                        >
                                            {choices.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </CustomSelect>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} mb={2}>
                                    <Grid item lg={12} md={12} sm={12}>
                                        <FormControlLabel
                                            control={<CustomCheckbox />}
                                            label="HOUR CALENDAR CONTROL"
                                        />
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} sx={{
                                        marginTop: '16px'
                                    }}>
                                        <Divider variant="fullWidth" component="hr" />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={12} md={12} sm={12}>
                                        <Typography sx={{ fontWeight: '700', mt: '16px' }}>
                                            First Schedule
                                        </Typography>
                                    </Grid>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Hours</CustomFormLabel>
                                        <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                    </Grid>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Cycles</CustomFormLabel>
                                        <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                    </Grid>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Days</CustomFormLabel>
                                        <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Date</CustomFormLabel>
                                        <CustomTextField type="date" id="fs-date" placeholder="dd/mm/yyyy" fullWidth />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} mb={2}>
                                    <Grid item lg={12} md={12} sm={12}>
                                        <FormControlLabel
                                            control={<CustomCheckbox />}
                                            label="EARLIEST"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Total Hours</CustomFormLabel>
                                        <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                    </Grid>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Total Cycles</CustomFormLabel>
                                        <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                    </Grid>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Total Days</CustomFormLabel>
                                        <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} mb={2}>
                                    <Grid item lg={12} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Whichever Occurs</CustomFormLabel>
                                        <CustomSelect
                                            id="standard-select-choice"
                                            value={choice}
                                            onChange={handleChangeChoice}
                                            fullWidth
                                            variant="outlined"
                                        >
                                            {choices.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </CustomSelect>
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} sx={{
                                        marginTop: '16px'
                                    }}>
                                        <Divider variant="fullWidth" component="hr" />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={12} md={12} sm={12}>
                                        <Typography sx={{ fontWeight: '700', mt: '16px' }}>
                                            Repeat Schedule
                                        </Typography>
                                    </Grid>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Hours</CustomFormLabel>
                                        <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                    </Grid>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Cycles</CustomFormLabel>
                                        <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                    </Grid>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Days</CustomFormLabel>
                                        <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Date</CustomFormLabel>
                                        <CustomTextField type="date" id="fs-date" placeholder="dd/mm/yyyy" fullWidth />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} mb={2}>
                                    <Grid item lg={12} md={12} sm={12}>
                                        <FormControlLabel
                                            control={<CustomCheckbox />}
                                            label="EARLIEST"
                                        />
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} sx={{
                                        marginTop: '16px'
                                    }}>
                                        <Divider variant="fullWidth" component="hr" />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={12} md={12} sm={12}>
                                        <Typography sx={{ fontWeight: '700', mt: '16px' }}>
                                            Limit Schedule
                                        </Typography>
                                    </Grid>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Hours</CustomFormLabel>
                                        <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                    </Grid>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Cycles</CustomFormLabel>
                                        <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                    </Grid>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Days</CustomFormLabel>
                                        <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Date</CustomFormLabel>
                                        <CustomTextField type="date" id="fs-date" placeholder="dd/mm/yyyy" fullWidth />
                                    </Grid>
                                </Grid>
                            </form>
                        </TabPanel>

                        {/* ### tab Aircraft ###*/}
                        <TabPanel value="3">
                            <form>
                                <AircraftTable />
                            </form>
                        </TabPanel>

                        {/* ### tab Task Card Control ###*/}
                        <TabPanel value="4">
                            <form>
                                <ChildCard title=''>
                                    <Grid container spacing={3} mb={3}>
                                        <Grid item lg={12} md={12} sm={12}>
                                            <CustomFormLabel htmlFor="fname-text">Task Card</CustomFormLabel>
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-search-task"
                                                options={getTaskCards}
                                                getOptionLabel={(option) => option.general.taskCard}
                                                onChange={(_, value) => { handleTaskCardInputChange(value?.general) }}
                                                isOptionEqualToValue={(option, value) => option.general.taskCard === value.general.taskCard}
                                                fullWidth
                                                sx={{
                                                    "& .MuiInputBase-root": { paddingTop: "6px", paddingBottom: "6px", paddingLeft: "16px" },
                                                }}
                                                renderInput={(params) => (
                                                    <CustomTextField
                                                        {...params}
                                                        placeholder="Search or Select Task Card"
                                                        aria-label="Search or Select Task Card"
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
                                            <CustomFormLabel htmlFor="fname-text">Type</CustomFormLabel>
                                            <CustomTextField disabled value={taskCard.type} id="fname-text" variant="outlined" fullWidth />
                                        </Grid>
                                        <Grid item lg={6} md={12} sm={12}>
                                            <CustomFormLabel htmlFor="fname-text">Category</CustomFormLabel>
                                            <CustomTextField disabled value={taskCard.category} id="fname-text" variant="outlined" fullWidth />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={3} mb={3}>
                                        <Grid item lg={6} md={12} sm={12}>
                                            <CustomFormLabel htmlFor="fname-text">Task Description</CustomFormLabel>
                                            <CustomTextField disabled value={taskCard.description} id="fname-text" variant="outlined" fullWidth />
                                        </Grid>
                                        <Grid item lg={6} md={12} sm={12}>
                                            <CustomFormLabel htmlFor="fname-text">Status</CustomFormLabel>
                                            <CustomSelect
                                                id="standard-select-status1"
                                                placeholder="Select"
                                                value={status}
                                                name="status"
                                                onChange={handleChangeStatus}
                                                fullWidth
                                                variant="outlined"
                                            >
                                                {taskStatus.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </CustomSelect>
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
                                    <EnhancedTableList headCells={headTaskCardCells} items={taskCardControls} />
                                </Box>
                            </form>
                        </TabPanel>

                        {/* ### tab Attachment ###*/}
                        <TabPanel value="5">
                            <form>
                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">File upload</CustomFormLabel>
                                        <CustomTextField id="fname-text" type="file" accept="*/*" variant="outlined" fullWidth />
                                    </Grid>
                                    <Grid item lg={4} md={12} sm={12} sx={{ marginTop: '38px' }}>
                                        <Button variant="contained" color="inherit">
                                            Upload
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </TabPanel>

                        {/* ### tab Informational ###*/}
                        <TabPanel value="6">
                            <form>
                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Created By</CustomFormLabel>
                                        <CustomTextField
                                            value={formValues.createdBy}
                                            disabled id="fname-text"
                                            variant="outlined"
                                            fullWidth
                                        />
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
                                        <CustomTextField disabled
                                            id="fname-text"
                                            value={formValues.lastEditedBy}
                                            variant="outlined"
                                            fullWidth
                                        />
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
};

export default TaskAddNew;
