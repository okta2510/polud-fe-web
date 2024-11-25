import React from 'react';
import { Box, FormControlLabel, Button, Grid, MenuItem, FormControl, Alert, RadioGroup, Typography, InputAdornment } from '@mui/material';
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

const attaNumbering = [
    { label: '001 Engine', value: '001' },
    { label: '002 Engine', value: '002' },
    { label: '003 Engine', value: '003' },
    { label: '004 Engine', value: '004' },
    { label: '005 Engine', value: '005' },
];

const DefectTaskNew = () => {
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
                                <Tab sx={{ width: "auto", px: '20px' }} label="Informational" value="2" />
                            </TabList>
                        </Box>

                        {/* ### tab General ###*/}
                        <TabPanel value="1">
                            <form>
                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Work Order Number</CustomFormLabel>
                                        <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                    </Grid>
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
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Category</CustomFormLabel>
                                        <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={12} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Description</CustomFormLabel>
                                        <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Location</CustomFormLabel>
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
                                        <CustomFormLabel htmlFor="fname-text">Site</CustomFormLabel>
                                        <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                    </Grid>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Priority</CustomFormLabel>
                                        <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={4} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Aircraft</CustomFormLabel>
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
                                        <CustomFormLabel htmlFor="fname-text">Aircraft Serial Number</CustomFormLabel>
                                        <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                    </Grid>
                                    <Grid item lg={2} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Type/Series</CustomFormLabel>
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
                                    <Grid item lg={2} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text" color="transparent">-</CustomFormLabel>
                                        <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3} mb={3}>
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

                                <Grid container spacing={3} mb={3}>
                                    <Grid item lg={12} md={12} sm={12}>
                                        <CustomFormLabel htmlFor="fname-text">Flight</CustomFormLabel>
                                        <CustomTextField id="fname-text" variant="outlined" fullWidth />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3} mb={3}>
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
                            </form>
                        </TabPanel>

                        {/* ### tab Informational ###*/}
                        <TabPanel value="2">
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

export default DefectTaskNew;