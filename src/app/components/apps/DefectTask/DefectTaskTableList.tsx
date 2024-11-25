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
    CardContent,
    Divider,
    Card,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    TableHead,
    useTheme,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    IconButton,
    MenuItem
} from '@mui/material';
import { useSelector, useDispatch } from '@/store/hooks';
import { IconFileDatabase, IconPlus, IconReload, IconSearch } from '@tabler/icons-react';
import { fetchDefectTasks } from '@/store/apps/DefectTask/DefectTaskSlice';
import { TaskType } from '@/app/(DashboardLayout)/types/apps/task';
import BlankCard from '../../shared/BlankCard';
import CustomCheckbox from '../../forms/theme-elements/CustomCheckbox';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import ParentCard from '../../shared/ParentCard';
import { Close, CloseRounded } from '@mui/icons-material';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomSelect from '../../forms/theme-elements/CustomSelect';
import { ro } from 'date-fns/locale';

const attaNumbering = [
    { label: '001 Engine', value: '001' },
    { label: '002 Engine', value: '002' },
    { label: '003 Engine', value: '003' },
    { label: '004 Engine', value: '004' },
    { label: '005 Engine', value: '005' },
];

const data = [
    { id: 1, aircraft: 'RP-C789', title: 'A320 - PHASE 44', type: 'task', status: 'OPEN', dueDate: '01/12/2025' },
    { id: 2, aircraft: 'RP-C780', title: 'A320 - PHASE 45', type: 'defect', status: 'OPEN', dueDate: '01/12/2024' },
    { id: 3, aircraft: 'RP-C781', title: 'A320 - PHASE 46', type: 'task', status: 'OPEN', dueDate: '01/12/2023' },
    { id: 4, aircraft: 'RP-C782', title: 'A320 - PHASE 47', type: 'defect', status: 'OPEN', dueDate: '01/12/2023' },
    { id: 5, aircraft: 'RP-C783', title: 'A320 - PHASE 48', type: 'task', status: 'OPEN', dueDate: '01/12/2023' },
    { id: 6, aircraft: 'RP-C784', title: 'A320 - PHASE 49', type: 'defect', status: 'OPEN', dueDate: '01/12/2023' },
];

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

interface EnhancedTableToolbarProps {
    numSelected: number;
    handleSearch: React.ChangeEvent<HTMLInputElement> | any;
    search: string;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const { numSelected, handleSearch, search } = props;

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
                    <AlertDialogCreateWO />
                </Box>
            </Box>
        </Toolbar>

    );
};


const AlertDialogCreateWO = () => {
    const [open, setOpen] = React.useState(false);
    const [status, setStatus] = React.useState('');
    const router = useRouter();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeStatus = (event: any) => {
        setStatus(event.target.value);
    };

    const handleRedirect = (_: any) => {
        router.push('/maintenance/defect-task-expiration/new');
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
                                    onClick={(event) => handleRedirect(event)}
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
                        <Box sx={{ marginBottom: 3, display: 'flex', justifyContent: 'space-between' }}>
                            <Typography
                                sx={{
                                    fontSize: '24px',
                                    fontWeight: 600,
                                    alignContent: 'center',
                                }}>
                                WO161026
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
                            A320 FAMILY - PHASE 44 INSPECTION
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
                                    id="standard-select-status"
                                    value={status}
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
                            <Grid item lg={1.3} md={12} sm={12}>
                                <CustomFormLabel htmlFor="fname-text">Location</CustomFormLabel>
                                <CustomTextField id="fname-text" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item lg={1.3} md={12} sm={12}>
                                <CustomFormLabel htmlFor="fname-text">Site</CustomFormLabel>
                                <CustomTextField id="fname-text" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item lg={1.3} md={12} sm={12}>
                                <CustomFormLabel htmlFor="fname-text">Category</CustomFormLabel>
                                <CustomTextField id="fname-text" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item lg={4} md={12} sm={12}>
                                <CustomFormLabel htmlFor="fname-text">Priority</CustomFormLabel>
                                <CustomTextField id="fname-text" variant="outlined" fullWidth />
                            </Grid>
                        </Grid>

                        <Grid container spacing={1} mb={2}>
                            <Grid item lg={2} md={12} sm={12}>
                                <CustomFormLabel htmlFor="fname-text">Aircraft</CustomFormLabel>
                                <CustomSelect
                                    id="standard-select-status"
                                    value={status}
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
                            <Grid item lg={10} md={12} sm={12}>
                                <CustomFormLabel htmlFor="fname-text">Description</CustomFormLabel>
                                <CustomTextField id="fname-text" variant="outlined" fullWidth />
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
                                <CustomTextField type="date" id="fs-date" fullWidth />
                            </Grid>
                            <Grid item lg={1} md={12} sm={12}>
                                <CustomFormLabel htmlFor="fname-text">Hours</CustomFormLabel>
                                <CustomTextField id="fname-text" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item lg={1} md={12} sm={12}>
                                <CustomFormLabel htmlFor="fname-text">Minutes</CustomFormLabel>
                                <CustomTextField id="fname-text" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item lg={4} md={12} sm={12}>
                                <CustomFormLabel htmlFor="fname-text">Schedule End Date</CustomFormLabel>
                                <CustomTextField type="date" id="fs-date" fullWidth />
                            </Grid>
                            <Grid item lg={1} md={12} sm={12}>
                                <CustomFormLabel htmlFor="fname-text">Hours</CustomFormLabel>
                                <CustomTextField id="fname-text" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item lg={1} md={12} sm={12}>
                                <CustomFormLabel htmlFor="fname-text">Minutes</CustomFormLabel>
                                <CustomTextField id="fname-text" variant="outlined" fullWidth />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} mt={2}>
                            <Grid item lg={4} md={12} sm={12}>
                                <CustomFormLabel htmlFor="fname-text">Actual Start Date</CustomFormLabel>
                                <CustomTextField type="date" id="fs-date" fullWidth />
                            </Grid>
                            <Grid item lg={1} md={12} sm={12}>
                                <CustomFormLabel htmlFor="fname-text">Hours</CustomFormLabel>
                                <CustomTextField id="fname-text" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item lg={1} md={12} sm={12}>
                                <CustomFormLabel htmlFor="fname-text">Minutes</CustomFormLabel>
                                <CustomTextField id="fname-text" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item lg={4} md={12} sm={12}>
                                <CustomFormLabel htmlFor="fname-text">Actual End Date</CustomFormLabel>
                                <CustomTextField type="date" id="fs-date" fullWidth />
                            </Grid>
                            <Grid item lg={1} md={12} sm={12}>
                                <CustomFormLabel htmlFor="fname-text">Hours</CustomFormLabel>
                                <CustomTextField id="fname-text" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item lg={1} md={12} sm={12}>
                                <CustomFormLabel htmlFor="fname-text">Minutes</CustomFormLabel>
                                <CustomTextField id="fname-text" variant="outlined" fullWidth />
                            </Grid>
                        </Grid>
                    </>
                </ParentCard>
            </Dialog>
        </>
    );
}

const InspectionForm = (data: any) => {
    console.log(data);
    const theme = useTheme();
    const borderColor = theme.palette.divider;
    return (
        (<Box>
            <FormControlLabel
                control={<CustomCheckbox />}
                label={`${data.item.task.task_id}`}
                sx={{
                    "& .MuiFormControlLabel-label": {
                        typography: "h6",
                    },
                }}
            />
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
                            {data.item.aircraft}
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
                            -
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
                            5-20-0
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
                            ALL
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
                            AP
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
                            -
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
                            -
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
                            -
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
                            GMM Category
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
                            -
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
                                        <TableCell align="center">100</TableCell>
                                        <TableCell align="center">170</TableCell>
                                        <TableCell align="center">744</TableCell>
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
                                        <TableCell align="center">326:48</TableCell>
                                        <TableCell align="center">53</TableCell>
                                        <TableCell align="center">255</TableCell>
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
                                        <TableCell align="center">648:12</TableCell>
                                        <TableCell align="center">117</TableCell>
                                        <TableCell align="center">489</TableCell>
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
                                        <TableCell align="center">33018:15</TableCell>
                                        <TableCell align="center">24834</TableCell>
                                        <TableCell align="center">11/12/2024</TableCell>
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
                            01/12/2025
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
                            33666:00
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
                            25323
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>)
    );
};

const DefectTaskTableList = () => {
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [search, setSearch] = React.useState('');

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchDefectTasks());
    }, [dispatch]);

    const getDefectTasks: TaskType[] = useSelector((state) => state.defectTasksReducer.defectTasks);
    const [rows, setRows] = React.useState<any>(getDefectTasks);

    React.useEffect(() => {
        setRows(getDefectTasks);
    }, [getDefectTasks]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const filteredRows: TaskType[] = getDefectTasks.filter((row) => {
            return row.category.toLowerCase().includes(event.target.value);
        });
        setSearch(event.target.value);
        setRows(filteredRows);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n: any) => n.title);
            setSelected(newSelecteds);

            return;
        }
        setSelected([]);
    };

    return (
        <Box>
            <BlankCard>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    search={search}
                    handleSearch={(event: any) => handleSearch(event)}
                />
            </BlankCard>
            <Box sx={{ margin: '8px' }} />
            <ParentCard
                title=''
                footer={
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="contained" color="primary">
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
                            label="DEFECT/NON ROUTINE TASK"
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
                            onChange={handleSearch}
                            value={search}
                        />
                    </Box>
                    <Grid container spacing={3} mb={3}>
                        <Grid item lg={2.4} md={12} sm={12}>
                            <CustomTextField type="date" id="fs-date" placeholder="Due Date" fullWidth />
                        </Grid>
                        <Grid item lg={2.4} md={12} sm={12}>
                            <Autocomplete
                                id="combo-box-search-task"
                                options={attaNumbering}
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
                                options={attaNumbering}
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
                                options={attaNumbering}
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
                                options={attaNumbering}
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
                        <InspectionForm item={item} />
                    </ParentCard>
                </Box>
            ))}

        </Box >
    );
}

export default DefectTaskTableList;