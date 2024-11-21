import React from 'react';
import { Box, FormControlLabel, Button, Grid, MenuItem, FormControl, Alert, RadioGroup, Typography } from '@mui/material';
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
import { IconPlus } from '@tabler/icons-react';
import TaskCardTableList from './TaskCardTableList';

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
        value: 'not-effective',
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


const TaskAddNew = () => {
    const [value, setValue] = React.useState("1");
    const [status, setStatus] = React.useState('');
    const [choice, setChoice] = React.useState('');

    const handleChange = (_: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const handleChangeStatus = (event: any) => {
        setStatus(event.target.value);
    };

    const handleChangeChoice = (event: any) => {
        setChoice(event.target.value);
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
                                        <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Category*</CustomFormLabel>
                                        <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                    </Grid>

                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Sub Category*</CustomFormLabel>
                                        <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                    </Grid>

                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Classification*</CustomFormLabel>
                                        <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={12} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Task Description*</CustomFormLabel>
                                        <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">status</CustomFormLabel>
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

                            </form>
                        </TabPanel>

                        {/* ### tab Task Card Control ###*/}
                        <TabPanel value="4">
                            <form>
                                <Grid item lg={12} md={12} sm={12}>
                                    <ChildCard title=''>
                                        <Grid container spacing={3} mb={3}>
                                            <Grid item lg={12} md={12} sm={12}>
                                                <CustomFormLabel htmlFor="fname-text">Task Card</CustomFormLabel>
                                                <Autocomplete
                                                    disablePortal
                                                    id="combo-box-search-task"
                                                    options={top100Films}
                                                    fullWidth
                                                    sx={{
                                                        "& .MuiInputBase-root": { padding: "6px" },
                                                    }}
                                                    renderInput={(params) => (
                                                        <CustomTextField {...params} placeholder="Search or Select Task Card" aria-label="Search or Select Task Card" />
                                                    )}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={3} mb={3}>
                                            <Grid item lg={6} md={12} sm={12}>
                                                <CustomFormLabel htmlFor="fname-text">Type</CustomFormLabel>
                                                <CustomTextField disabled id="fname-text" variant="outlined" fullWidth />
                                            </Grid>
                                            <Grid item lg={6} md={12} sm={12}>
                                                <CustomFormLabel htmlFor="fname-text">Category</CustomFormLabel>
                                                <CustomTextField disabled id="fname-text" variant="outlined" fullWidth />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={3} mb={3}>
                                            <Grid item lg={6} md={12} sm={12}>
                                                <CustomFormLabel htmlFor="fname-text">Task Description</CustomFormLabel>
                                                <Autocomplete
                                                    id="combo-box-search-task"
                                                    options={top100Films}
                                                    fullWidth
                                                    sx={{
                                                        "& .MuiInputBase-root": { padding: "6px" },
                                                    }}
                                                    renderInput={(params) => (
                                                        <CustomTextField {...params} placeholder="Search or Select Task Card" aria-label="Search or Select Task Card" />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item lg={6} md={12} sm={12}>
                                                <CustomFormLabel htmlFor="fname-text">Status</CustomFormLabel>
                                                <CustomSelect
                                                    id="standard-select-status1"
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
                                </Grid>
                                <Box sx={{ marginTop: '24px' }}>
                                    <TaskCardTableList from="task" />
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
};

export default TaskAddNew;