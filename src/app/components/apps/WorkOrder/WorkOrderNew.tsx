import React, { useState, useEffect } from 'react';
import { Box, FormControlLabel, Button, Grid, MenuItem, FormControl, Alert,Stack, RadioGroup, Typography, FormGroup, Checkbox} from '@mui/material';

import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField'
import CustomSelect from '@/app/components/forms/theme-elements/CustomSelect';

import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';

import ParentCard from '@/app/components/shared/ParentCard';
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {IconFilePlus, IconFileExport, IconFileSearch} from "@tabler/icons-react";
import { format } from 'date-fns';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { sub } from 'date-fns';
import { fetchAirCraft } from '@/store/apps/AirCraft/AirCraftSlice';
import { AircraftType } from '@/app/(DashboardLayout)/types/apps/aircraft';
import { useSelector, useDispatch } from '@/store/hooks';

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

const sampleSelect = [
  {
    value: 'data1',
    label: 'Data1',
  },
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

interface AircraftNameType {
  value: string;
  label: string;
}
const aircraftNames:AircraftNameType[] = []
const aircraftSeries:AircraftNameType[] = []

const WorkOrderNew = () => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    createdBy: 'ACTYPSERMS',
    createdDate: '2024-11-15T01:23',
    lastEditedBy: 'GEVERFOREVER',
    lastEditedDate: '2024-11-15T01:23',
  });
  const [detailId, setDetailId] = useState(0);
  const [currency, setCurrency] = React.useState('');
  const [value, setValue] = React.useState("1");

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
  const [general, setGeneral] = React.useState({...initialGeneral})
  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGeneral((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const initialInformational = {
    createdBy: '',
    createdDate: '',
    lastEditedBy: '',
    lastEditedDate: '',
  }
  const [informational, setInformational] = React.useState({...initialInformational})

  const initialOptional = {
  }
  const [optional, setOptional] = React.useState({...initialOptional})
  const getAircraft: AircraftType[] = useSelector((state) => state.aircraftReducer.aircraft);
  const [aircraft, setAircraft] = React.useState<any>(getAircraft);

  React.useEffect(() => {
    setAircraft(getAircraft);
  }, [getAircraft]);
  
  
  React.useEffect(() => {
    if(aircraft.length > 0) {
      aircraft.forEach((x: { general: { aircraft_name: any;series: any }; }) => {
        if(x.general?.aircraft_name) aircraftNames.push({
          value: x.general.aircraft_name,
          label: x.general.aircraft_name
        })
        if(x.general?.series) aircraftSeries.push({
          value: x.general.aircraft_name,
          label: x.general.aircraft_name
        })
      });
    }
  }, [aircraft]);

  React.useEffect(() => {
    const cachedData = localStorage.getItem('workOrderData');
    const currentUrl = window.location.href;
    const match = currentUrl.match(/\/work-order\/(\d+)/);
    const id = match ? parseInt(match[1], 10) : 0
    setDetailId(id)

    if (cachedData && match) {
      const parsedData:typeWorkOrder[] = JSON.parse(cachedData);
      const obj = parsedData.find(x => x.id === id)
      if (obj && obj.general) {
        setGeneral(obj.general)
      }
    }
    dispatch(fetchAirCraft());
  }, [dispatch]);

  

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleChange2 = (event: any) => {
    setCurrency(event.target.value);
  };

  
  const handleReset = () => {
    setGeneral({...initialGeneral})
    setInformational({...initialInformational})
  }

  const handleSave = () => {
    const cachedData = localStorage.getItem('workOrderData');
    const parsedData = cachedData ? JSON.parse(cachedData) : [];
    
    try {
      const payload = [...parsedData, ...[{ 
        id: parsedData.length+1,
        general,
        optional,
        informational: {},
        created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
      }]]
      localStorage.setItem('workOrderData', JSON.stringify(payload)); // Save to localStorage
      // console.log('Saved payload:', payload);
      handleReset()
      alert('Aircraft data saved successfully!');
      window.location.href = '/maintenance/work-order';
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
      alert('Failed to save aircraft data.');
    }
  };
  const handleEdit = () => {
    const cachedData = localStorage.getItem('workOrderData');
    const parsedData = cachedData ? JSON.parse(cachedData) : [];
    const index = parsedData.findIndex((item: { id: number }) => item.id === detailId);
    console.log(detailId)
    if (index !== -1) {
      // Replace the object at that index with the new 'general' object
      parsedData[index] = {...parsedData[index], ...{
        general,
        optional,
        informational: {}
      }};

      // Save the updated array back into localStorage
      localStorage.setItem('workOrderData', JSON.stringify(parsedData));

      alert('Data updated successfully');
      window.location.href = '/maintenance/work-order';
    } else {
      alert('No matching data found');
    }

  };

  return (
    <div>
      {/* ------------------------------------------------------------------------------------------------ */}
      {/* Basic Checkbox */}
      {/* ------------------------------------------------------------------------------------------------ */}
       <ParentCard
        title=""
        footer={
          <>
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
          </>
        }
      >
        <>
        <TabContext value={value}>
            <Box sx={{borderBottom: 1, borderColor: 'divider',borderRadius: '0px 0px 0px 0px'}}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                variant="scrollable"
                sx={{borderRadius: '0px 0px 0px 0px', alignItems: 'center'}}
                scrollButtons={false}
              >
                <Tab sx={{ width: "auto", px: '20px'}} label="General" value="1" />
                <Tab sx={{ width: "auto", px: '20px'}} label="Optional" value="2" />
                <Tab sx={{ width: "auto", px: '20px'}} label="informational" value="3" />
               <Box sx={{width:"100%", textAlign: 'right', alignItems: 'center', display: 'flex', justifyContent: 'end'}}>
                  <Button sx={{justifySelf: 'self-end'}} size="medium" variant="contained" color="primary"  href="/maintenance/work-order/non-routine" >Non-Routine Task</Button>
               </Box>
              </TabList>
            </Box>
            
            <TabPanel value="1">
              <form>
                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Work Order Number</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth  value={general.work_order_number} name="work_order_number" onChange={handleGeneralChange}/>
                  </Grid>
                  
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Status*</CustomFormLabel>
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
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Category*</CustomFormLabel>
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
                </Grid>

                <Grid container spacing={3} mb={3}>
                  <Grid item lg={12} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Description</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined"  value={general.description} name="description" onChange={handleGeneralChange} fullWidth />
                  </Grid>
                </Grid>

                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Location*</CustomFormLabel>
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
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Site</CustomFormLabel>
                    <CustomTextField id="fname-text"  value={general.site} name="site" onChange={handleGeneralChange} variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Priority*</CustomFormLabel>
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
                
                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
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
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Aircraft Serial Number</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={general.aircraft_serial_number} name="aircraft_serial_number" onChange={handleGeneralChange} fullWidth />
                  </Grid>
                  <Grid item lg={2} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Type/Series</CustomFormLabel>
                    <CustomSelect
                        id="standard-select-currency"
                        value={general.type_series1} name="type_series1" onChange={handleGeneralChange}
                        fullWidth
                        variant="outlined"
                        >
                        {aircraftSeries.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </CustomSelect>
                  </Grid>
                  <Grid item lg={2} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">&nbsp;</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined"  value={general.type_series2} name="type_series2" onChange={handleGeneralChange} fullWidth />
                  </Grid>
                </Grid>
                
                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Schedule Start Date</CustomFormLabel>
                    <CustomTextField
                      id="date"
                      type="date"
                      variant="outlined"
                      fullWidth
                      value={general.schedule_start_date}
                      onChange={handleGeneralChange}
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
                    <CustomFormLabel htmlFor="fname-text">Completion Date</CustomFormLabel>
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

                <Grid container spacing={3} mb={3}>
                  <Grid item lg={12} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Flight Number</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined"  value={general.flight_number} name="flight_number" onChange={handleGeneralChange} fullWidth />
                  </Grid>
                </Grid>

                <Grid container spacing={3} mb={3}>
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
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={1} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Minutes</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>

                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Completion Date</CustomFormLabel>
                    <CustomTextField
                      id="date"
                      type="date"
                      variant="outlined"
                      fullWidth
                      value={formValues.createdDate}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>) => setFormValues({ ...formValues, createdDate: e.target.value })}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
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
            
            <TabPanel value="2">
              <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Status*</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Defect Type*</CustomFormLabel>
                    <CustomSelect
                        id="standard-select-currency"
                        value={currency}
                        onChange={handleChange2}
                        fullWidth
                        variant="outlined"
                        >
                        {sampleSelect.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </CustomSelect>
                  </Grid>
                  
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Defect Type*</CustomFormLabel>
                    <CustomSelect
                        id="standard-select-currency"
                        value={currency}
                        onChange={handleChange2}
                        fullWidth
                        variant="outlined"
                        >
                        {sampleSelect.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </CustomSelect>
                  </Grid>
              </Grid>

              <Grid container spacing={3} mb={3}>
                <Grid item lg={12} md={12} sm={12}>
                    <FormGroup
                      row
                      sx={{
                          display: 'flex',
                          justifyContent: 'start',
                      }}
                  >
                      <FormControlLabel
                        control={
                          <Checkbox color="primary"
                              icon={<CheckBoxOutlineBlankIcon />}
                              checkedIcon={<CheckBoxIcon />}
                              name="checkednormal"
                          />
                        }
                        label="WARRANTY"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox color="primary"
                              icon={<CheckBoxOutlineBlankIcon />}
                              checkedIcon={<CheckBoxIcon />}
                              name="checkednormal"
                          />
                        }
                        label="DAMAGE"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox color="primary"
                              icon={<CheckBoxOutlineBlankIcon />}
                              checkedIcon={<CheckBoxIcon />}
                              name="checkednormal"
                          />
                        }
                        label="FIELD TRIP"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox color="primary"
                              icon={<CheckBoxOutlineBlankIcon />}
                              checkedIcon={<CheckBoxIcon />}
                              name="checkednormal"
                          />
                        }
                        label="WORK ORDER INITIAL ISSUED"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox color="primary"
                              icon={<CheckBoxOutlineBlankIcon />}
                              checkedIcon={<CheckBoxIcon />}
                              name="checkednormal"
                          />
                        }
                        label="INSURANCE CLAIM"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox color="primary"
                              icon={<CheckBoxOutlineBlankIcon />}
                              checkedIcon={<CheckBoxIcon />}
                              name="checkednormal"
                          />
                        }
                        label="ALL N/R T/CS REQUIRE ITEM"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox color="primary"
                              icon={<CheckBoxOutlineBlankIcon />}
                              checkedIcon={<CheckBoxIcon />}
                              name="checkednormal"
                          />
                        }
                        label="LONG TERM EVENT"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox color="primary"
                              icon={<CheckBoxOutlineBlankIcon />}
                              checkedIcon={<CheckBoxIcon />}
                              name="checkednormal"
                          />
                        }
                        label="RESTRICT ACTUAL TO ESTIMATE"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox color="primary"
                              icon={<CheckBoxOutlineBlankIcon />}
                              checkedIcon={<CheckBoxIcon />}
                              name="checkednormal"
                          />
                        }
                        label="ALLOW NON ROUTINE TASK CREATION"
                      />
                      </FormGroup>
                  </Grid>
                </Grid>

                <Grid container spacing={3} mb={3}>
                    <Grid item lg={4} md={12} sm={12}>
                      <CustomFormLabel htmlFor="fname-text">Vendor</CustomFormLabel>
                      <CustomTextField id="fname-text" variant="outlined" fullWidth />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12}>
                      <CustomFormLabel htmlFor="fname-text">&nbsp;</CustomFormLabel>
                      <CustomTextField id="fname-text" variant="outlined" fullWidth />
                    </Grid>
                </Grid>
                <Grid container spacing={3} mb={3}>
                  <Grid item lg={8} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Aircraft Maintenance Program / Maintenance Schedule</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                </Grid>
                <Grid container spacing={3} mb={3}>
                    <Grid item lg={4} md={12} sm={12}>
                      <CustomFormLabel htmlFor="fname-text">Revision</CustomFormLabel>
                      <CustomTextField id="fname-text" variant="outlined" fullWidth />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12}>
                      <CustomFormLabel htmlFor="fname-text">Date</CustomFormLabel>
                      <CustomTextField
                        id="date"
                        type="datetime-local"
                        disabled
                        variant="outlined"
                        fullWidth
                        value={formValues.createdDate}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setFormValues({ ...formValues, createdDate: e.target.value })}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                </Grid>
                <Grid container spacing={3} mb={3}>
                  <Grid item lg={8} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Temporary Revision</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                </Grid>
            </TabPanel>

            <TabPanel value="3">
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
                      onChange={(e:React.ChangeEvent<HTMLInputElement>) => setFormValues({ ...formValues, createdDate: e.target.value })}
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
                        const dateValue = new Date(e.target.value);
                        const hourMinute = format(dateValue, 'dd-mm-yyyy | hh:mm:ss');
                        setFormValues({ ...formValues, lastEditedDate: e.target.value });
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
            </TabPanel>
          </TabContext>
        </>
      </ParentCard>
    </div>
  );
};

export default WorkOrderNew;
