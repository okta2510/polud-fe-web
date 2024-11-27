import { useRouter } from 'next/navigation';
import * as React from 'react';
import {
    Box,
    Grid,
    Toolbar,
    FormControlLabel,
    Typography,
    TextField,
    InputAdornment,
    Button,
    Autocomplete,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    TableHead,
    useTheme,
    Dialog,
    IconButton,
    MenuItem
} from '@mui/material';
import { useSelector, useDispatch } from '@/store/hooks';
import { IconFileDatabase, IconPlus, IconReload, IconSearch } from '@tabler/icons-react';
import { fetchDefectTasks, getDefectTasks } from '@/store/apps/DefectTask/DefectTaskSlice';
import { TaskType } from '@/app/(DashboardLayout)/types/apps/task';
import BlankCard from '../../shared/BlankCard';
import CustomCheckbox from '../../forms/theme-elements/CustomCheckbox';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import ParentCard from '../../shared/ParentCard';
import { CloseRounded } from '@mui/icons-material';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomSelect from '../../forms/theme-elements/CustomSelect';
import { format } from 'date-fns';
import { fetchAirCraft } from '@/store/apps/AirCraft/AirCraftSlice';
import { AircraftType } from '@/app/(DashboardLayout)/types/apps/aircraft';
import { sub } from 'date-fns';
import { DefectTaskType } from '@/app/(DashboardLayout)/types/apps/defetctTask';
import { DefectType } from '@/app/(DashboardLayout)/types/apps/defect';
import { de, ro } from 'date-fns/locale';
import { fetchTasks } from '@/store/apps/Task/TaskSlice';
import { fetchDefect } from '@/store/apps/defect/defectSlice';
import { get } from 'lodash';
import { a } from 'react-spring';


interface General {
    work_order_number: string;
    status: string;
    category: string;
    description: string;
    location: string;
    site: string;
    priority: string;
    aircraft: string;
    aircraft_serial_number: string;
    type_series1: string;
    type_series2: string;
    schedule_start_date: string;
    schedule_start_hours: string;
    schedule_start_minute: string;
    schedule_end_date: string;
    schedule_end_hours: string;
    schedule_end_minute: string;
    flight_number: string;
    actual_start_date: string;
    actual_start_hours: string;
    actual_start_minute: string;
    actual_end_date: string;
    actual_end_hours: string;
    actual_end_minute: string;
}
interface typeWorkOrder {
    id: number;
    general?: General;
}

const attaNumbering = [
    { label: '001 Engine', value: '001' },
    { label: '002 Engine', value: '002' },
    { label: '003 Engine', value: '003' },
    { label: '004 Engine', value: '004' },
    { label: '005 Engine', value: '005' },
];


const generalStatus = [
    {
        value: 'OPEN',
        label: 'OPEN',
    },
    {
        value: 'CLOSED',
        label: 'CLOSED',
    },
    {
        value: 'COMPLETED',
        label: 'COMPLETED',
    },
    {
        value: 'HOLD',
        label: 'HOLD',
    },
    {
        value: 'GENERATE',
        label: 'GENERATE',
    },
];

const locations = [
    {
        value: 'jakarta',
        label: 'Jakarta',
    },
    {
        value: 'surabaya',
        label: 'Surabaya',
    },
    {
        value: 'semarang',
        label: 'Semarang',
    },
];

const category = [
    {
        value: 'LINE',
        label: 'LINE',
    },
    {
        value: 'PHASE',
        label: 'PHASE',
    },
    {
        value: 'CHECK',
        label: 'CHECK',
    },
];

const priority = [
    {
        value: 'LOW',
        label: 'LOW',
    },
    {
        value: 'NORMAL',
        label: 'NORMAL',
    },
    {
        value: 'CRITICAL',
        label: 'CRITICAL',
    },
    {
        value: 'AOG',
        label: 'AOG',
    },
    {
        value: 'URGENT',
        label: 'URGENT',
    },
];

const orderBy = [
    {
        value: 'ASC',
        label: 'ASC',
    },
    {
        value: 'DESC',
        label: 'DESC',
    },
];


interface AircraftNameType {
    value: string;
    label: string;
}
const aircraftNames: AircraftNameType[] = []
const aircraftSeries: AircraftNameType[] = []
const aircraftTypes: AircraftNameType[] = []
const defectTasks: DefectTaskType[] = []


interface EnhancedTableToolbarProps {
    numSelected: number;
    handleSearch: React.ChangeEvent<HTMLInputElement> | any;
    search: string;
    items: DefectTaskType[];
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const { numSelected, handleSearch, search, items } = props;
    return (
        <Toolbar>
            <Box sx={{ flex: '1 1 100%' }}>
                <TextField
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconSearch size="1.1rem" />
                            </InputAdornment>
                        ),
                    }}
                    placeholder="Enter Work Order"
                    size="small"
                    onChange={handleSearch}
                    value={search}
                />
            </Box>
            <Box padding={2}>
                <Box
                    sx={{
                        display: 'flex',
                        gap: 1
                    }}>
                    <Button sx={{
                        width: '178px'
                    }}
                        startIcon={<IconReload width={18} />}>
                        Clear Filter
                    </Button>
                    <Button sx={{
                        width: '200px'
                    }}
                        startIcon={<IconFileDatabase width={18} />}>
                        Existing Work Order
                    </Button>
                    <AlertDialogCreateWO items={items} />
                </Box>
            </Box>
        </Toolbar>

    );
};

const AlertDialogCreateWO = ({ items }: { items: DefectTaskType[] }) => {
    const [open, setOpen] = React.useState(false);
    const [randomNumber, setRandomNumber] = React.useState(0);

    const generateRandomNumber = () => {
        const min = 100;
        const max = 10000;
        const result = Math.floor(Math.random() * (max - min + 1)) + min;
        setRandomNumber(result);
    };

    React.useEffect(() => {
        generateRandomNumber();
    }, []);

    const initialGeneral = {
        work_order_number: '',
        status: '',
        category: '',
        description: '',
        location: '',
        site: '',
        priority: '',
        aircraft: '',
        aircraft_serial_number: '',
        type_series1: '',
        type_series2: '',
        schedule_start_date: '',
        schedule_start_hours: '',
        schedule_start_minute: '',
        schedule_end_date: '',
        schedule_end_hours: '',
        schedule_end_minute: '',
        flight_number: '',
        actual_start_date: '',
        actual_start_hours: '',
        actual_start_minute: '',
        actual_end_date: '',
        actual_end_hours: '',
        actual_end_minute: '',
    }
    const [general, setGeneral] = React.useState({ ...initialGeneral })

    const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setGeneral((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


    const handleClickOpen = () => {
        if (items.length > 0) {
            generateRandomNumber();
            setGeneral({ ...general, work_order_number: `WO${randomNumber}` });
            setOpen(true);
        } else {
            alert('Please first select item.');
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleReset = () => {
        setGeneral({ ...initialGeneral })
    }

    const handleSave = () => {
        const cachedData = localStorage.getItem('workOrderData');
        const parsedData = cachedData ? JSON.parse(cachedData) : [];

        try {
            const payload = [...parsedData, ...[{
                id: parsedData.length + 1,
                general,
                optional: {},
                informational: {},
                created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
            }]]
            localStorage.setItem('workOrderData', JSON.stringify(payload));
            handleUpdate().then(() => {
                handleReset()
                alert('WO data saved successfully!');
                window.location.href = '/maintenance/work-order';
            });
        } catch (error) {
            console.error('Error saving data to localStorage:', error);
            alert('Failed to save WO data.');
        }
    };

    const handleUpdate = async () => {
        const cachedData = localStorage.getItem('defectTaskData');
        const parsedData = cachedData ? JSON.parse(cachedData) : [];
        try {
            items.forEach(x => {
                const index = parsedData.findIndex((item: { id: number }) => item.id === x.id);
                console.log(x, index)
                if (index !== -1) {
                    parsedData[index] = {
                        ...parsedData[index], ...{
                            work_order: {
                                general,
                            }
                        }
                    };
                    localStorage.setItem('defectTaskData', JSON.stringify(parsedData));
                }
            });
        } catch (error) {
            console.error('Error update data to localStorage:', error);
        }

    };

    return (
        <>
            <Button
                onClick={handleClickOpen}
                sx={{
                    width: '200px'
                }} variant="contained" color="primary" startIcon={<IconPlus width={18} />}>
                New Work Order
            </Button>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    sx: {
                        width: "1122px",
                        maxWidth: "none",
                    },
                }}
            >
                <ParentCard
                    title=''
                    footer={
                        <>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    onClick={handleClose}
                                    variant="contained"
                                    color="error"
                                    sx={{
                                        mr: 1,
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={() => handleSave()}
                                    variant="contained"
                                    color="primary"
                                >
                                    Create WO
                                </Button>
                            </Box>
                        </>
                    }
                >
                    <>
                        {/* {JSON.stringify(defectTasks)} */}
                        <Box sx={{ marginBottom: 3, display: 'flex', justifyContent: 'space-between' }}>
                            <Typography
                                sx={{
                                    fontSize: '24px',
                                    fontWeight: 600,
                                    alignContent: 'center',
                                }}>
                                {general.work_order_number}
                            </Typography>
                            <IconButton color="default">
                                <CloseRounded onClick={handleClose} />
                            </IconButton>
                        </Box>
                        <Typography
                            sx={{
                                fontSize: '18px',
                                fontWeight: 600,
                                alignContent: 'center',
                            }}>
                            A320 - PHASE 16
                        </Typography>
                        <Box
                            sx={{
                                marginTop: '24px',
                                border: '1px solid #1B84FF',
                                borderRadius: 1,
                                paddingX: 2,
                                paddingY: 1,
                                position: 'relative',
                                backgroundColor: '#EBF6FF',
                            }}
                        >

                            <Typography
                                sx={{
                                    color: '#1976d2',
                                    fontSize: '16px',
                                    fontWeight: 500,
                                }}>
                                Work Package Information
                            </Typography>
                        </Box>
                        <Grid container spacing={1}>
                            <Grid item lg={4} md={12} sm={12}>
                                <CustomFormLabel htmlFor="fname-text">Status</CustomFormLabel>
                                <CustomSelect
                                    id="standard-select-currency"
                                    value={general.status}
                                    name="status"
                                    onChange={handleGeneralChange}
                                    fullWidth
                                    variant="outlined"
                                >
                                    {generalStatus.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </CustomSelect>
                            </Grid>
                            <Grid item lg={1.3} md={12} sm={12}>
                                <CustomFormLabel htmlFor="fname-text">Location</CustomFormLabel>
                                <CustomSelect
                                    id="standard-select-currency"
                                    value={general.location} name="location" onChange={handleGeneralChange}
                                    fullWidth
                                    variant="outlined"
                                >
                                    {locations.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </CustomSelect>
                            </Grid>
                            <Grid item lg={1.3} md={12} sm={12}>
                                <CustomFormLabel htmlFor="fname-text">Site</CustomFormLabel>
                                <CustomTextField id="fname-text" value={general.site} name="site" onChange={handleGeneralChange} variant="outlined" fullWidth />
                            </Grid>
                            <Grid item lg={1.3} md={12} sm={12}>
                                <CustomFormLabel htmlFor="fname-text">Category</CustomFormLabel>
                                <CustomSelect
                                    id="standard-select-currency"
                                    value={general.category}
                                    name="category"
                                    onChange={handleGeneralChange}
                                    fullWidth
                                    variant="outlined"
                                >
                                    {category.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </CustomSelect>
                            </Grid>
                            <Grid item lg={4} md={12} sm={12}>
                                <CustomFormLabel htmlFor="fname-text">Priority</CustomFormLabel>
                                <CustomSelect
                                    id="standard-select-currency"
                                    value={general.priority} name="priority" onChange={handleGeneralChange}
                                    fullWidth
                                    variant="outlined"
                                >
                                    {priority.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </CustomSelect>
                            </Grid>
                        </Grid>

                        <Grid container spacing={1} mb={2}>
                            <Grid item lg={2} md={12} sm={12}>
                                <CustomFormLabel htmlFor="fname-text">Aircraft</CustomFormLabel>
                                <CustomSelect
                                    id="standard-select-currency"
                                    value={general.aircraft} name="aircraft" onChange={handleGeneralChange}
                                    fullWidth
                                    variant="outlined"
                                >
                                    {aircraftNames.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </CustomSelect>
                            </Grid>
                            <Grid item lg={10} md={12} sm={12}>
                                <CustomFormLabel htmlFor="fname-text">Description</CustomFormLabel>
                                <CustomTextField id="fname-text" variant="outlined" value={general.description} name="description" onChange={handleGeneralChange} fullWidth />
                            </Grid>
                        </Grid>
                        <Box
                            sx={{
                                border: '1px solid #1B84FF',
                                borderRadius: 1,
                                paddingX: 2,
                                paddingY: 1,
                                position: 'relative',
                                backgroundColor: '#EBF6FF',
                            }}
                        >

                            <Typography
                                sx={{
                                    color: '#1976d2',
                                    fontSize: '16px',
                                    fontWeight: 500,
                                }}>
                                Work Package Schedule
                            </Typography>
                        </Box>
                        <Grid container spacing={1} mt={1}>
                            <Grid item lg={4} md={12} sm={12}>
                                <CustomFormLabel htmlFor="fname-text">Schedule Start Date</CustomFormLabel>
                                <CustomTextField
                                    id="date"
                                    type="date"
                                    variant="outlined"
                                    fullWidth
                                    value={general.schedule_start_date} name="schedule_start_date" onChange={handleGeneralChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item lg={1} md={12} sm={12}>
                                <CustomFormLabel htmlFor="fname-text">Hours</CustomFormLabel>
                                <CustomTextField id="fname-text" variant="outlined" value={general.schedule_start_hours} name="schedule_start_hours" onChange={handleGeneralChange} fullWidth />
                            </Grid>
                            <Grid item lg={1} md={12} sm={12}>
                                <CustomFormLabel htmlFor="fname-text">Minutes</CustomFormLabel>
                                <CustomTextField id="fname-text" variant="outlined" value={general.schedule_start_minute} name="schedule_start_minute" onChange={handleGeneralChange} fullWidth />
                            </Grid>
                            <Grid item lg={4} md={12} sm={12}>
                                <CustomFormLabel htmlFor="fname-text">Schedule End Date</CustomFormLabel>
                                <CustomTextField
                                    id="date"
                                    type="date"
                                    variant="outlined"
                                    fullWidth
                                    value={general.schedule_end_date} name="schedule_end_date" onChange={handleGeneralChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item lg={1} md={12} sm={12}>
                                <CustomFormLabel htmlFor="fname-text">Hours</CustomFormLabel>
                                <CustomTextField id="fname-text" variant="outlined" value={general.schedule_end_hours} name="schedule_end_hours" onChange={handleGeneralChange} fullWidth />
                            </Grid>
                            <Grid item lg={1} md={12} sm={12}>
                                <CustomFormLabel htmlFor="fname-text">Minutes</CustomFormLabel>
                                <CustomTextField id="fname-text" variant="outlined" value={general.schedule_end_minute} name="schedule_end_minute" onChange={handleGeneralChange} fullWidth />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} mt={2}>
                            <Grid item lg={4} md={12} sm={12}>
                                <CustomFormLabel htmlFor="fname-text">Actual Start Date</CustomFormLabel>
                                <CustomTextField
                                    id="date"
                                    type="date"
                                    variant="outlined"
                                    fullWidth
                                    value={general.actual_start_date} name="actual_start_date" onChange={handleGeneralChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item lg={1} md={12} sm={12}>
                                <CustomFormLabel htmlFor="fname-text">Hours</CustomFormLabel>
                                <CustomTextField id="fname-text" variant="outlined" value={general.actual_start_hours} name="actual_start_hours" onChange={handleGeneralChange} fullWidth />
                            </Grid>
                            <Grid item lg={1} md={12} sm={12}>
                                <CustomFormLabel htmlFor="fname-text">Minutes</CustomFormLabel>
                                <CustomTextField id="fname-text" variant="outlined" value={general.actual_start_minute} name="actual_start_minute" onChange={handleGeneralChange} fullWidth />
                            </Grid>
                            <Grid item lg={4} md={12} sm={12}>
                                <CustomFormLabel htmlFor="fname-text">Actual End Date</CustomFormLabel>
                                <CustomTextField
                                    id="date"
                                    type="date"
                                    variant="outlined"
                                    fullWidth
                                    value={general.actual_end_date} name="actual_end_date" onChange={handleGeneralChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item lg={1} md={12} sm={12}>
                                <CustomFormLabel htmlFor="fname-text">Hours</CustomFormLabel>
                                <CustomTextField id="fname-text" variant="outlined" value={general.actual_end_hours} name="actual_end_hours" onChange={handleGeneralChange} fullWidth />
                            </Grid>
                            <Grid item lg={1} md={12} sm={12}>
                                <CustomFormLabel htmlFor="fname-text">Minutes</CustomFormLabel>
                                <CustomTextField id="fname-text" variant="outlined" value={general.actual_end_minute} name="actual_end_minute" onChange={handleGeneralChange} fullWidth />
                            </Grid>
                        </Grid>
                    </>
                </ParentCard>
            </Dialog>
        </>
    );
}

const InspectionForm = (data: any) => {
    const theme = useTheme();
    const borderColor = theme.palette.divider;
    return (
        (<Box>
            {/* 2 column */}
            <Grid container>
                <Grid item lg={2} sm={12} md={12} >
                    <Box
                        sx={{
                            borderTop: "1px solid #DBE1E6",
                            borderBottom: "1px solid #DBE1E6",
                            borderRight: "none",
                            borderLeft: "1px solid #DBE1E6",
                            borderTopLeftRadius: 4,
                            borderBottomLeftRadius: 4,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            paddingX: 2,
                            position: 'relative',
                            backgroundColor: '#EBF6FF',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            Aircraft
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={10} sm={12} md={12}>
                    <Box
                        sx={{
                            border: '1px solid #DBE1E6',
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderTopRightRadius: 4,
                            borderBottomRightRadius: 4,
                            paddingX: 2,
                            position: 'relative',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            {data.item.defect.aircraft === '' ? data.item.task.aircraft === '' ? '-' : data.item.task.aircraft : data.item.defect.aircraft}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            {/* 6 column */}
            {data.item.defect.defect_id !== '' ? (<Grid container mt={'2px'}>
                <Grid item lg={2} sm={12} md={12} >
                    <Box
                        sx={{
                            borderTop: "1px solid #DBE1E6",
                            borderBottom: "1px solid #DBE1E6",
                            borderRight: "none",
                            borderLeft: "1px solid #DBE1E6",
                            borderTopLeftRadius: 4,
                            borderBottomLeftRadius: 4,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            paddingX: 2,
                            position: 'relative',
                            backgroundColor: '#EBF6FF',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            Defect Type
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={3} sm={12} md={12}>
                    <Box
                        sx={{
                            border: '1px solid #DBE1E6',
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            paddingX: 2,
                            position: 'relative',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            {data.item.defect.defect_type}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={1.75} sm={12} md={12}>
                    <Box
                        sx={{
                            borderTop: "1px solid #DBE1E6",
                            borderBottom: "1px solid #DBE1E6",
                            borderRight: "none",
                            borderLeft: "none",
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            paddingX: 2,
                            position: 'relative',
                            backgroundColor: '#EBF6FF',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            Defect
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={1.75} sm={12} md={12}>
                    <Box
                        sx={{
                            border: '1px solid #DBE1E6',
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            paddingX: 2,
                            position: 'relative',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            {data.item.defect.defect_id}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={1.75} sm={12} md={12}>
                    <Box
                        sx={{
                            borderTop: "1px solid #DBE1E6",
                            borderBottom: "1px solid #DBE1E6",
                            borderRight: "none",
                            borderLeft: "none",
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            paddingX: 2,
                            position: 'relative',
                            backgroundColor: '#EBF6FF',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            Item
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={1.75} sm={12} md={12}>
                    <Box
                        sx={{
                            border: '1px solid #DBE1E6',
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderTopRightRadius: 4,
                            borderBottomRightRadius: 4,
                            paddingX: 2,
                            position: 'relative',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            {data.item.defect.item}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>) : <Grid container mt={'2px'}>
                <Grid item lg={2} sm={12} md={12} >
                    <Box
                        sx={{
                            borderTop: "1px solid #DBE1E6",
                            borderBottom: "1px solid #DBE1E6",
                            borderRight: "none",
                            borderLeft: "1px solid #DBE1E6",
                            borderTopLeftRadius: 4,
                            borderBottomLeftRadius: 4,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            paddingX: 2,
                            position: 'relative',
                            backgroundColor: '#EBF6FF',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            Task
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={10} sm={12} md={12}>
                    <Box
                        sx={{
                            border: '1px solid #DBE1E6',
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderTopRightRadius: 4,
                            borderBottomRightRadius: 4,
                            paddingX: 2,
                            position: 'relative',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            {data.item.task.task_id}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>}
            {/* 6 column */}
            <Grid container mt={'2px'}>
                <Grid item lg={2} sm={12} md={12} >
                    <Box
                        sx={{
                            borderTop: "1px solid #DBE1E6",
                            borderBottom: "1px solid #DBE1E6",
                            borderRight: "none",
                            borderLeft: "1px solid #DBE1E6",
                            borderTopLeftRadius: 4,
                            borderBottomLeftRadius: 4,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            paddingX: 2,
                            position: 'relative',
                            backgroundColor: '#EBF6FF',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            Work Order Description
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={3} sm={12} md={12}>
                    <Box
                        sx={{
                            border: '1px solid #DBE1E6',
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            paddingX: 2,
                            position: 'relative',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            {data.item.work_order.general.description === '' ? '-' : data.item.work_order.general.description}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={1.75} sm={12} md={12}>
                    <Box
                        sx={{
                            borderTop: "1px solid #DBE1E6",
                            borderBottom: "1px solid #DBE1E6",
                            borderRight: "none",
                            borderLeft: "none",
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            paddingX: 2,
                            position: 'relative',
                            backgroundColor: '#EBF6FF',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            Work Order
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={1.75} sm={12} md={12}>
                    <Box
                        sx={{
                            border: '1px solid #DBE1E6',
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            paddingX: 2,
                            position: 'relative',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            {data.item.work_order.general.work_order_number === '' ? '-' : data.item.work_order.general.work_order_number}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={1.75} sm={12} md={12}>
                    <Box
                        sx={{
                            borderTop: "1px solid #DBE1E6",
                            borderBottom: "1px solid #DBE1E6",
                            borderRight: "none",
                            borderLeft: "none",
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            paddingX: 2,
                            position: 'relative',
                            backgroundColor: '#EBF6FF',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            Status
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={1.75} sm={12} md={12}>
                    <Box
                        sx={{
                            border: '1px solid #DBE1E6',
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderTopRightRadius: 4,
                            borderBottomRightRadius: 4,
                            paddingX: 2,
                            position: 'relative',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            {data.item.work_order.general.status === '' ? '-' : data.item.work_order.general.status}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            {/* 4 column */}
            <Grid container mt={'2px'}>
                <Grid item lg={2} sm={12} md={12} >
                    <Box
                        sx={{
                            borderTop: "1px solid #DBE1E6",
                            borderBottom: "1px solid #DBE1E6",
                            borderRight: "none",
                            borderLeft: "1px solid #DBE1E6",
                            borderTopLeftRadius: 4,
                            borderBottomLeftRadius: 4,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            paddingX: 2,
                            position: 'relative',
                            backgroundColor: '#EBF6FF',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            Position
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={3} sm={12} md={12}>
                    <Box
                        sx={{
                            border: '1px solid #DBE1E6',
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            paddingX: 2,
                            position: 'relative',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            {data.item.position === '' ? '-' : data.item.position}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={1.75} sm={12} md={12} >
                    <Box
                        sx={{
                            borderTop: "1px solid #DBE1E6",
                            borderBottom: "1px solid #DBE1E6",
                            borderRight: "none",
                            borderLeft: "none",
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            paddingX: 2,
                            position: 'relative',
                            backgroundColor: '#EBF6FF',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            ATA
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={5.25} sm={12} md={12}>
                    <Box
                        sx={{
                            border: '1px solid #DBE1E6',
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderTopRightRadius: 4,
                            borderBottomRightRadius: 4,
                            paddingX: 2,
                            position: 'relative',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            {data.item.task.ata === '' ? '-' : data.item.task.ata}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            {/* 6 column */}
            <Grid container mt={'2px'}>
                <Grid item lg={2} sm={12} md={12} >
                    <Box
                        sx={{
                            borderTop: "1px solid #DBE1E6",
                            borderBottom: "1px solid #DBE1E6",
                            borderRight: "none",
                            borderLeft: "1px solid #DBE1E6",
                            borderTopLeftRadius: 4,
                            borderBottomLeftRadius: 4,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            paddingX: 2,
                            position: 'relative',
                            backgroundColor: '#EBF6FF',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            Capability Area
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={3} sm={12} md={12}>
                    <Box
                        sx={{
                            border: '1px solid #DBE1E6',
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            paddingX: 2,
                            position: 'relative',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            {data.item.defect.capability_area === '' ? '-' : data.item.defect.capability_area}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={1.75} sm={12} md={12}>
                    <Box
                        sx={{
                            borderTop: "1px solid #DBE1E6",
                            borderBottom: "1px solid #DBE1E6",
                            borderRight: "none",
                            borderLeft: "none",
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            paddingX: 2,
                            position: 'relative',
                            backgroundColor: '#EBF6FF',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            Category
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={1.75} sm={12} md={12}>
                    <Box
                        sx={{
                            border: '1px solid #DBE1E6',
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            paddingX: 2,
                            position: 'relative',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            {data.item.task.category === '' ? '-' : data.item.task.category}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={1.75} sm={12} md={12}>
                    <Box
                        sx={{
                            borderTop: "1px solid #DBE1E6",
                            borderBottom: "1px solid #DBE1E6",
                            borderRight: "none",
                            borderLeft: "none",
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            paddingX: 2,
                            position: 'relative',
                            backgroundColor: '#EBF6FF',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            Sub Category
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={1.75} sm={12} md={12}>
                    <Box
                        sx={{
                            border: '1px solid #DBE1E6',
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderTopRightRadius: 4,
                            borderBottomRightRadius: 4,
                            paddingX: 2,
                            position: 'relative',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            {data.item.task.sub_category === '' ? '-' : data.item.task.sub_category}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            {/* 2 column */}
            <Grid container mt={'2px'}>
                <Grid item lg={2} sm={12} md={12} >
                    <Box
                        sx={{
                            borderTop: "1px solid #DBE1E6",
                            borderBottom: "1px solid #DBE1E6",
                            borderRight: "none",
                            borderLeft: "1px solid #DBE1E6",
                            borderTopLeftRadius: 4,
                            borderBottomLeftRadius: 4,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            paddingX: 2,
                            position: 'relative',
                            backgroundColor: '#EBF6FF',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            MDDR
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={10} sm={12} md={12}>
                    <Box
                        sx={{
                            border: '1px solid #DBE1E6',
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderTopRightRadius: 4,
                            borderBottomRightRadius: 4,
                            paddingX: 2,
                            position: 'relative',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            {data.item.defect.mddr === '' ? '-' : data.item.defect.mddr}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            {/* 4 column */}
            <Grid container mt={'2px'}>
                <Grid item lg={2} sm={12} md={12} >
                    <Box
                        sx={{
                            borderTop: "1px solid #DBE1E6",
                            borderBottom: "1px solid #DBE1E6",
                            borderRight: "none",
                            borderLeft: "1px solid #DBE1E6",
                            borderTopLeftRadius: 4,
                            borderBottomLeftRadius: 4,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            paddingX: 2,
                            position: 'relative',
                            backgroundColor: '#EBF6FF',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            Ground Time Require
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={3} sm={12} md={12}>
                    <Box
                        sx={{
                            border: '1px solid #DBE1E6',
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            paddingX: 2,
                            position: 'relative',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            {data.item.defect.ground_time === '' ? '-' : data.item.defect.ground_time}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={1.75} sm={12} md={12} >
                    <Box
                        sx={{
                            borderTop: "1px solid #DBE1E6",
                            borderBottom: "1px solid #DBE1E6",
                            borderRight: "none",
                            borderLeft: "none",
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            paddingX: 2,
                            position: 'relative',
                            backgroundColor: '#EBF6FF',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            {data.item.defect.defect_id === '' ? 'GMM Category' : 'MEL Category'}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={5.25} sm={12} md={12}>
                    <Box
                        sx={{
                            border: '1px solid #DBE1E6',
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderTopRightRadius: 4,
                            borderBottomRightRadius: 4,
                            paddingX: 2,
                            position: 'relative',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            {data.item.defect.defect_id === '' ? (data.item.defect.gmm === '' ? '-' : data.item.defect.gmm) : (data.item.task.mel === '' ? '-' : data.item.task.mel)}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item lg={4} md={12} sm={12}>
                    <Paper variant="outlined" sx={{ my: 1, border: `1px solid ${borderColor}` }}>
                        <TableContainer>
                            <Table>
                                <TableHead
                                    sx={{
                                        backgroundColor: '#EBF6FF',
                                        "& .MuiTableCell-root": { padding: "4px" }
                                    }}>
                                    <TableRow>
                                        <TableCell align="center" colSpan={3}>Initial Schedule</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody
                                    sx={{
                                        "& .MuiTableCell-root": { padding: "4px" }
                                    }}>
                                    <TableRow>
                                        <TableCell align="center">Hours</TableCell>
                                        <TableCell align="center">Days</TableCell>
                                        <TableCell align="center">Cycles</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">{data.item.initial_schedule.hours === '' ? '-' : data.item.initial_schedule.hours}</TableCell>
                                        <TableCell align="center">{data.item.initial_schedule.days === '' ? '-' : data.item.initial_schedule.days}</TableCell>
                                        <TableCell align="center">{data.item.initial_schedule.cycles === '' ? '-' : data.item.initial_schedule.cycles}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
                <Grid item lg={4} md={12} sm={12}>
                    <Paper variant="outlined" sx={{ my: 1, border: `1px solid ${borderColor}` }}>
                        <TableContainer>
                            <Table>
                                <TableHead
                                    sx={{
                                        backgroundColor: '#EBF6FF',
                                        "& .MuiTableCell-root": { padding: "4px" }
                                    }}>
                                    <TableRow>
                                        <TableCell align="center" colSpan={3}>Actual</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody
                                    sx={{
                                        "& .MuiTableCell-root": { padding: "4px" }
                                    }}>
                                    <TableRow>
                                        <TableCell align="center">Hours</TableCell>
                                        <TableCell align="center">Days</TableCell>
                                        <TableCell align="center">Cycles</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">{data.item.actual.hours === '' ? '-' : data.item.actual.hours}</TableCell>
                                        <TableCell align="center">{data.item.actual.days === '' ? '-' : data.item.actual.days}</TableCell>
                                        <TableCell align="center">{data.item.actual.cycles === '' ? '-' : data.item.actual.cycles}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
                <Grid item lg={4} md={12} sm={12}>
                    <Paper variant="outlined" sx={{ my: 1, border: `1px solid ${borderColor}` }}>
                        <TableContainer>
                            <Table>
                                <TableHead
                                    sx={{
                                        backgroundColor: '#EBF6FF',
                                        "& .MuiTableCell-root": { padding: "4px" }
                                    }}>
                                    <TableRow>
                                        <TableCell align="center" colSpan={3}>Remaining</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody
                                    sx={{
                                        "& .MuiTableCell-root": { padding: "4px" }
                                    }}>
                                    <TableRow>
                                        <TableCell align="center">Hours</TableCell>
                                        <TableCell align="center">Days</TableCell>
                                        <TableCell align="center">Cycles</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">{data.item.remaining.hours === '' ? '-' : data.item.remaining.hours}</TableCell>
                                        <TableCell align="center">{data.item.remaining.days === '' ? '-' : data.item.remaining.days}</TableCell>
                                        <TableCell align="center">{data.item.remaining.cycles === '' ? '-' : data.item.remaining.cycles}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item lg={4} md={12} sm={12}>
                    <Typography fontSize={'12px'} fontWeight={600}>
                        Totals
                    </Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item lg={12} md={12} sm={12}>
                    <Paper variant="outlined" sx={{ my: 1, border: `1px solid ${borderColor}` }}>
                        <TableContainer>
                            <Table>
                                <TableHead
                                    sx={{
                                        backgroundColor: '#EBF6FF',
                                        "& .MuiTableCell-root": { padding: "4px" }
                                    }}>
                                    <TableRow>
                                        <TableCell align="center">Aircraft Hours</TableCell>
                                        <TableCell align="center">Aircraft Cycles</TableCell>
                                        <TableCell align="center">Time As Of</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody
                                    sx={{
                                        "& .MuiTableCell-root": { padding: "4px" }
                                    }}>
                                    <TableRow>
                                        <TableCell align="center">{data.item.totals.aircraft_hours === '' ? '-' : data.item.totals.aircraft_hours}</TableCell>
                                        <TableCell align="center">{data.item.totals.aircraft_cycles === '' ? '-' : data.item.totals.aircraft_cycles}</TableCell>
                                        <TableCell align="center">{data.item.totals.time_as_of === '' ? '-' : data.item.totals.time_as_of}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item lg={4} md={12} sm={12}>
                    <Typography fontSize={'12px'} fontWeight={600}>
                        Due At
                    </Typography>
                </Grid>
            </Grid>
            {/* 6 column */}
            <Grid container mt={'2px'}>
                <Grid item lg={2} sm={12} md={12} >
                    <Box
                        sx={{
                            borderTop: "1px solid #DBE1E6",
                            borderBottom: "1px solid #DBE1E6",
                            borderRight: "none",
                            borderLeft: "1px solid #DBE1E6",
                            borderTopLeftRadius: 4,
                            borderBottomLeftRadius: 4,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            paddingX: 2,
                            position: 'relative',
                            backgroundColor: '#EBF6FF',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            Due Date
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={3} sm={12} md={12}>
                    <Box
                        sx={{
                            border: '1px solid #DBE1E6',
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderTopRightRadius: 4,
                            borderBottomRightRadius: 4,
                            paddingX: 2,
                            position: 'relative',
                            marginRight: '8px',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            {data.item.due_date === '' ? '-' : format(new Date(data.item.due_date), 'dd/MM/yyyy')}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={1.75} sm={12} md={12}>
                    <Box
                        sx={{
                            borderTop: "1px solid #DBE1E6",
                            borderBottom: "1px solid #DBE1E6",
                            borderRight: "none",
                            borderLeft: "1px solid #DBE1E6",
                            borderTopLeftRadius: 4,
                            borderBottomLeftRadius: 4,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            paddingX: 2,
                            position: 'relative',
                            backgroundColor: '#EBF6FF',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            Aircraft Hours
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={1.75} sm={12} md={12}>
                    <Box
                        sx={{
                            border: '1px solid #DBE1E6',
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            paddingX: 2,
                            position: 'relative',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            {data.item.totals.aircraft_hours === '' ? '-' : data.item.totals.aircraft_hours}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={1.75} sm={12} md={12}>
                    <Box
                        sx={{
                            borderTop: "1px solid #DBE1E6",
                            borderBottom: "1px solid #DBE1E6",
                            borderRight: "none",
                            borderLeft: "none",
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            paddingX: 2,
                            position: 'relative',
                            backgroundColor: '#EBF6FF',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            Aircraft Cycles
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={1.75} sm={12} md={12}>
                    <Box
                        sx={{
                            border: '1px solid #DBE1E6',
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderTopRightRadius: 4,
                            borderBottomRightRadius: 4,
                            paddingX: 2,
                            position: 'relative',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                            }}>
                            {data.item.totals.aircraft_cycles === '' ? '-' : data.item.totals.aircraft_cycles}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>)
    );
};

const DefectTaskTableList = () => {
    const dispatch = useDispatch();
    const [selected, setSelected] = React.useState<(string | number)[]>([]);
    const [search, setSearch] = React.useState('');
    const [selectedItem, setSelectedItem] = React.useState<DefectTaskType[]>([]);
    const [isVisibleTask, setIsVisibleTask] = React.useState(false);
    const getDefectTasks: DefectTaskType[] = useSelector((state) => state.defectTasksReducer.defectTasks);
    const [rows, setRows] = React.useState<DefectTaskType[]>([]);
    const getAircraft: AircraftType[] = useSelector((state) => state.aircraftReducer.aircraft);
    const [aircraft, setAircraft] = React.useState<any>(getAircraft);
    const getDefect: DefectType[] = useSelector((state) => state.DefectReducer.defect);
    const getTasks: TaskType[] = useSelector((state) => state.taskReducer.tasks);

    React.useEffect(() => {
        dispatch(fetchAirCraft());
    }, [dispatch]);

    React.useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    React.useEffect(() => {
        dispatch(fetchDefect());
    }, [dispatch]);

    React.useEffect(() => {
        dispatch(fetchDefectTasks());
    }, [dispatch]);


    React.useEffect(() => {
        setAircraft(getAircraft);
    }, [getAircraft]);



    React.useEffect(() => {
        if (aircraft.length > 0) {
            aircraftNames.splice(0, aircraftNames.length);
            aircraftSeries.splice(0, aircraftSeries.length);
            aircraftTypes.splice(0, aircraftTypes.length);

            aircraft.forEach((x: { general: { aircraft_name: any; series: any, aircraft_type: any }; }) => {
                if (x.general?.aircraft_name) aircraftNames.push({
                    value: x.general.aircraft_name,
                    label: x.general.aircraft_name
                })
                if (x.general?.series) aircraftSeries.push({
                    value: x.general.series,
                    label: x.general.series,
                })
                if (x.general?.aircraft_type) aircraftTypes.push({
                    value: x.general.aircraft_type,
                    label: x.general.aircraft_type
                })
            });
        }
    }, [aircraft]);

    React.useEffect(() => {
        const cachedData = localStorage.getItem('defectTaskData');
        const parsedData = cachedData ? JSON.parse(cachedData) : [];

        if (getTasks.length > 0) {
            getTasks.forEach((x) => {
                const index = parsedData.findIndex((item: { task: { task_id: string } }) => item.task.task_id === x.general.taskId)
                if (index === -1) {
                    const payload = [...parsedData, ...[{
                        id: crypto.randomUUID(),
                        is_defect: false,
                        is_task: true,
                        is_work_order: false,
                        is_selected: false,
                        task: {
                            task_id: x.general.taskId,
                            category: x.general.category,
                            sub_category: x.general.sub_category,
                            classification: x.general.classification,
                            description: x.general.description,
                            status: x.general.status,
                            repeat: 1,
                            ata: '001 Engine',
                            aircraft: 'A320',
                            ground_time: '',
                        },
                        defect: {
                            defect_id: '',
                            defect_type: '',
                            item: '',
                            mddr: '',
                            groundtime: '',
                            capability_area: '',
                            mel: '',
                            gmm: '',
                            aircraft: 'A320',
                        },
                        work_order: {
                            general: {
                                work_order_number: '',
                                status: '',
                                category: '',
                                description: '',
                                location: '',
                                site: '',
                                priority: '',
                                aircraft: '',
                                aircraft_serial_number: '',
                                type_series1: '',
                                type_series2: '',
                                schedule_start_date: '',
                                schedule_start_hours: '',
                                schedule_start_minute: '',
                                schedule_end_date: '',
                                schedule_end_hours: '',
                                schedule_end_minute: '',
                                flight_number: '',
                                actual_start_date: '',
                                actual_start_hours: '',
                                actual_start_minute: '',
                                actual_end_date: '',
                                actual_end_hours: '',
                                actual_end_minute: '',
                            }
                        },
                        position: '',
                        initial_schedule: {
                            hours: '975',
                            days: '170',
                            cycles: '744',
                        },
                        actual: {
                            hours: '326:48',
                            days: '53',
                            cycles: '255',
                        },
                        remaining: {
                            hours: '648:12',
                            days: '117',
                            cycles: '489',
                        },
                        totals: {
                            aircraft_hours: '33018:15',
                            aircraft_cycles: '24834',
                            time_as_of: new Date().toUTCString(),
                        },
                        due_date: new Date().toUTCString(),
                        created: new Date().toUTCString(),
                    }]];
                    localStorage.setItem('defectTaskData', JSON.stringify(payload));
                }
            });
        }

    }, [getTasks, getDefectTasks]);

    React.useEffect(() => {
        const cachedData = localStorage.getItem('defectTaskData');
        const parsedData = cachedData ? JSON.parse(cachedData) : [];

        if (getDefect.length > 0) {
            getDefect.forEach((x) => {
                const index = parsedData.findIndex((item: { defect: { defect_id: string } }) => item.defect.defect_id === x.general?.defect)
                if (index === -1) {
                    const payload = [...parsedData, ...[{
                        id: crypto.randomUUID(),
                        is_defect: false,
                        is_task: true,
                        is_work_order: false,
                        is_selected: false,
                        task: {
                            task_id: '',
                            category: '',
                            sub_category: '',
                            classification: '',
                            description: '',
                            status: '',
                            repeat: '',
                            ata: '001 Engine',
                            aircraft: 'A320',
                            ground_time: '',
                        },
                        defect: {
                            defect_id: x.general?.defect ?? '',
                            defect_type: x.general?.type ?? '',
                            item: x.general?.item ?? '',
                            mddr: '',
                            groundtime: x.general?.groundtime ?? '',
                            capability_area: x.general?.internal_capability ?? '',
                            mel: '',
                            gmm: '',
                            aircraft: x.general?.aircraft ?? '',
                        },
                        work_order: {
                            general: {
                                work_order_number: '',
                                status: '',
                                category: '',
                                description: '',
                                location: '',
                                site: '',
                                priority: '',
                                aircraft: '',
                                aircraft_serial_number: '',
                                type_series1: '',
                                type_series2: '',
                                schedule_start_date: '',
                                schedule_start_hours: '',
                                schedule_start_minute: '',
                                schedule_end_date: '',
                                schedule_end_hours: '',
                                schedule_end_minute: '',
                                flight_number: '',
                                actual_start_date: '',
                                actual_start_hours: '',
                                actual_start_minute: '',
                                actual_end_date: '',
                                actual_end_hours: '',
                                actual_end_minute: '',
                            }
                        },
                        position: '',
                        initial_schedule: {
                            hours: '975',
                            days: '170',
                            cycles: '744',
                        },
                        actual: {
                            hours: '326:48',
                            days: '53',
                            cycles: '255',
                        },
                        remaining: {
                            hours: '648:12',
                            days: '117',
                            cycles: '489',
                        },
                        totals: {
                            aircraft_hours: '33018:15',
                            aircraft_cycles: '24834',
                            time_as_of: new Date().toUTCString(),
                        },
                        due_date: new Date().toUTCString(),
                        created: new Date().toUTCString(),
                    }]];
                    localStorage.setItem('defectTaskData', JSON.stringify(payload));
                }
            });
        }

    }, [getDefect, getDefectTasks]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const filteredRows: DefectTaskType[] = getDefectTasks.filter((row) => {
            return String(row.work_order.general.work_order_number).toLowerCase().includes(event.target.value);
        });
        setSearch(event.target.value);
        setRows(filteredRows);
    };

    const handleRefresh = async () => {
        await dispatch(fetchDefectTasks());
        setRows(getDefectTasks);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n: DefectTaskType) => n.id);
            setSelected(newSelecteds);

            return;
        }
        setSelected([]);
    };

    const handleSelect = (item: any, checked: boolean) => {
        if (checked) {
            setSelectedItem([...selectedItem, item]);
        } else {
            setSelectedItem([]);
        }
    };

    return (
        <Box>
            <BlankCard>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    search={search}
                    handleSearch={(event: any) => handleSearch(event)}
                    items={selectedItem}
                />
            </BlankCard>
            <Box sx={{ margin: '8px' }} />
            <ParentCard
                title=''
                footer={
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="contained" color="primary" onClick={handleRefresh}>
                                Search
                            </Button>
                        </Box>
                    </>
                }
            >
                <Box>
                    <Box
                        sx={{
                            border: '1px solid #1B84FF',
                            borderRadius: 1,
                            paddingX: 2,
                            paddingY: 1.5,
                            position: 'relative',
                            backgroundColor: '#EBF6FF',
                        }}
                    >

                        <Typography
                            sx={{
                                color: '#1976d2',
                                fontSize: '18px',
                                fontWeight: 500,
                            }}>
                            Define Task
                        </Typography>
                    </Box>
                    <Box sx={{ marginY: '24px', display: 'flex', justifyContent: 'space-between' }}>
                        <FormControlLabel
                            control={<CustomCheckbox />}
                            label="DEFECT"
                        />
                        <FormControlLabel
                            control={<CustomCheckbox />}
                            label="TASK"
                        />
                        <FormControlLabel
                            control={<CustomCheckbox />}
                            label="TASK NO SCHEDULE"
                        />
                        <FormControlLabel
                            control={<CustomCheckbox />}
                            label="WORK ORDER"
                        />
                        <FormControlLabel
                            control={<CustomCheckbox />}
                            label="ALL TASK"
                        />
                    </Box>
                    <Box
                        sx={{
                            border: '1px solid #1B84FF',
                            borderRadius: 1,
                            paddingX: 2,
                            paddingY: 1.5,
                            position: 'relative',
                            backgroundColor: '#EBF6FF',
                        }}
                    >

                        <Typography
                            sx={{
                                color: '#1976d2',
                                fontSize: '18px',
                                fontWeight: 500,
                            }}>
                            Sort By
                        </Typography>
                    </Box>
                    <Box sx={{ marginY: '24px' }}>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconSearch size="1.1rem" />
                                    </InputAdornment>
                                ),
                            }}
                            fullWidth
                            placeholder="Enter Work Order"
                            size="medium"
                        />
                    </Box>
                    <Grid container spacing={3} mb={3}>
                        <Grid item lg={2.4} md={12} sm={12}>
                            <CustomTextField type="date" id="fs-date" placeholder="Due Date" fullWidth />
                        </Grid>
                        <Grid item lg={2.4} md={12} sm={12}>
                            <Autocomplete
                                id="combo-box-search-task"
                                options={orderBy}
                                getOptionLabel={(option) => option.label}
                                isOptionEqualToValue={(option, value) => option.label === value.label}
                                fullWidth
                                sx={{
                                    "& .MuiInputBase-root": { padding: "5px" },
                                }}
                                renderInput={(params) => (
                                    <CustomTextField {...params} placeholder="Order By" aria-label="Order By" />
                                )}
                            />
                        </Grid>
                        <Grid item lg={2.4} md={12} sm={12}>
                            <Autocomplete
                                id="combo-box-search-task"
                                options={aircraftNames}
                                getOptionLabel={(option) => option.label}
                                isOptionEqualToValue={(option, value) => option.label === value.label}
                                fullWidth
                                sx={{
                                    "& .MuiInputBase-root": { padding: "5px" },
                                }}
                                renderInput={(params) => (
                                    <CustomTextField {...params} placeholder="Aircrafts" aria-label="Aircrafts" />
                                )}
                            />
                        </Grid>
                        <Grid item lg={2.4} md={12} sm={12}>
                            <Autocomplete
                                id="combo-box-search-task"
                                options={aircraftTypes}
                                getOptionLabel={(option) => option.label}
                                isOptionEqualToValue={(option, value) => option.label === value.label}
                                fullWidth
                                sx={{
                                    "& .MuiInputBase-root": { padding: "5px" },
                                }}
                                renderInput={(params) => (
                                    <CustomTextField {...params} placeholder="Aircrafts Type" aria-label="Aircrafts Type" />
                                )}
                            />
                        </Grid>
                        <Grid item lg={2.4} md={12} sm={12}>
                            <Autocomplete
                                id="combo-box-search-task"
                                options={aircraftSeries}
                                getOptionLabel={(option) => option.label}
                                isOptionEqualToValue={(option, value) => option.label === value.label}
                                fullWidth
                                sx={{
                                    "& .MuiInputBase-root": { padding: "5px" },
                                }}
                                renderInput={(params) => (
                                    <CustomTextField {...params} placeholder="Aircrafts Series" aria-label="Aircrafts Series" />
                                )}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </ParentCard>
            {rows.map((item: any) => (
                <Box sx={{ marginTop: '8px' }}>
                    <ParentCard title=''>
                        <>
                            <FormControlLabel
                                control={<CustomCheckbox />}
                                label={`${item.task.task_id === '' ? item.defect.defect_id : item.task.task_id}`}
                                onChange={(_, checked) => handleSelect(item, checked)}
                                sx={{
                                    "& .MuiFormControlLabel-label": {
                                        typography: "h6",
                                    },
                                }}
                            />
                            <InspectionForm item={item} />
                        </>
                    </ParentCard>
                </Box>
            ))}

        </Box >
    );
}

export default DefectTaskTableList;