import React, { useState, useEffect } from 'react';
import { Box, FormControlLabel, Button, Grid, MenuItem, FormControl, Alert,Stack, RadioGroup, Typography, FormGroup, Checkbox} from '@mui/material';
import Divider from '@mui/material/Divider';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField'
import CustomSelect from '@/app/components/forms/theme-elements/CustomSelect';
import CustomRadio from '@/app/components/forms/theme-elements/CustomRadio';
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';
import CustomCheckbox from '@/app/components/forms/theme-elements/CustomCheckbox';
import ParentCard from '@/app/components/shared/ParentCard';
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {IconFilePlus, IconFileExport, IconFileSearch} from "@tabler/icons-react";
import { format } from 'date-fns';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {intialGeneral,initialDefer, initialResolution, defect_type_ops, defect_status_ops, defect_category_ops,resolution_category_ops} from '@/app/api/defect/defectData';
import { sub } from 'date-fns';
import { fetchAirCraft } from '@/store/apps/AirCraft/AirCraftSlice';
import { AircraftType } from '@/app/(DashboardLayout)/types/apps/aircraft';
import { useSelector, useDispatch } from '@/store/hooks';


const sample_ops = [
  {
    value: 'OPTION1',
    label: 'OPTION1',
  },
  {
    value: 'OPTION2',
    label: 'OPTION2',
  },
  {
    value: 'OPTION3',
    label: 'OPTION3',
  },
];


// const formatDate = (date: Date) => {
//   const pad = (num: number) => String(num).padStart(2, '0'); // Helper for padding
//   const day = pad(date.getDate());
//   const month = pad(date.getMonth() + 1); // Months are 0-based
//   const year = String(date.getFullYear()).slice(-2); // Get last two digits of year
//   const hours = pad(date.getHours());
//   const minutes = pad(date.getMinutes());
//   const seconds = pad(date.getSeconds());

//   return `${day}${month}${year}-${hours}${minutes}${seconds}`;
// };

interface AircraftNameType {
  value: string;
  label: string;
}
const aircraftNames:AircraftNameType[] = []
const aircraftSeries:AircraftNameType[] = []
const AirCraftAddNew = () => {
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
  const [group1Value, setGroup1Value] = useState(''); // State for the first group
  const [group2Value, setGroup2Value] = useState('');

  const [general, setGeneral] = React.useState(intialGeneral)
  const [defer, setDefer] = React.useState(initialDefer)
  const [resolution, setResolution] = React.useState(initialResolution)

  const [informational, setInformational] = React.useState({
    createdBy: 'ACTYPSERMS',
    createdDate: '2024-11-15T01:23',
    lastEditedBy: 'GEVERFOREVER',
    lastEditedDate: '2024-11-15T01:23',
  })
  
  

  const getAircraft: AircraftType[] = useSelector((state) => state.aircraftReducer.aircraft);
  const [aircraft, setAircraft] = React.useState<any>(getAircraft);

  React.useEffect(() => {
    setAircraft(getAircraft);
  }, [getAircraft]);
  
  
  React.useEffect(() => {
    if(aircraft.length > 0 && aircraftSeries.length <1 && aircraftNames.length < 1) {
      aircraft.forEach((x: { general: { aircraft_name: any;series: any }; }) => {
        console.log(x.general?.aircraft_name)
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


  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGeneral((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleDeferChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDefer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleResolutionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResolution((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
// intialGeneral,initialDefer, initialResolution

  const handleReset = () => {
    setGeneral({...intialGeneral})
    setDefer({...initialDefer})
    setResolution({...initialResolution})
  }
  const handleChange2 = (event: any) => {
    setCurrency(event.target.value);
  };
  const handleGroup1Change = (event: React.SyntheticEvent, checked: boolean) => {
    const target = event.target as HTMLInputElement;
    setGroup1Value(target.value); 
  };
  const handleGroup2Change = (event: React.SyntheticEvent, checked: boolean) => {
    const target = event.target as HTMLInputElement;
    setGroup2Value(target.value); 
  };

  const handleSave = () => {
    const cachedData = localStorage.getItem('defectData');
    const parsedData = cachedData ? JSON.parse(cachedData) : [];
    
    try {
      const payload = [...parsedData, ...[{ 
        id: parsedData.length+1,
        general,
        defer,
        resolution,
        created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
      }]]
      localStorage.setItem('defectData', JSON.stringify(payload)); // Save to localStorage
      // console.log('Saved payload:', payload);
      handleReset()
      alert('Aircraft data saved successfully!');
      window.location.href = '/maintenance/defect';
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
      alert('Failed to save aircraft data.');
    }
  };

  const handleEdit = () => {
    const cachedData = localStorage.getItem('defectData');
    const parsedData = cachedData ? JSON.parse(cachedData) : [];

    console.log(parsedData)
    const index = parsedData.findIndex((item: { id: number }) => item.id === detailId);
    console.log(detailId)
    if (index !== -1) {
      // Replace the object at that index with the new 'general' object
      parsedData[index] = {...parsedData[index], ...{
        general,
        defer,
        resolution,
      }};

      // Save the updated array back into localStorage
      localStorage.setItem('defectData', JSON.stringify(parsedData));

      alert('Data updated successfully');
      window.location.href = '/maintenance/defect';
    } else {
      alert('No matching data found');
    }
  };

  interface typeDefect {
      id: number;
      general?: typeof intialGeneral;
      defer?: typeof initialDefer;
      resolution?: typeof initialResolution;
    }
    React.useEffect(() => {
      const cachedData = localStorage.getItem('defectData');
      const currentUrl = window.location.href;
      const match = currentUrl.match(/\/defect\/(\d+)/);
      const id = match ? parseInt(match[1], 10) : 0
      setDetailId(id)

      if (cachedData && match) {
        const parsedData:typeDefect[] = JSON.parse(cachedData);
        const obj = parsedData.find(x => x.id === id)
        if (obj && obj.general) {
          setGeneral(obj.general)
        }
      }
      dispatch(fetchAirCraft());
    }, [dispatch]);


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
              href="/maintenance/defect"
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
                sx={{borderRadius: '0px 0px 0px 0px'}}
                scrollButtons={false}
              >
                <Tab sx={{ width: "auto", px: '20px'}} label="General" value="1" />
                <Tab sx={{ width: "auto", px: '20px'}} label="Defer" value="2" />
                <Tab sx={{ width: "auto", px: '20px'}} label="Resolution" value="3" />
                <Tab sx={{ width: "auto", px: '20px'}} label="informational" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <form>
                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Defect Type*</CustomFormLabel>
                    <CustomSelect
                        id="standard-select-currency"
                        value={general.type} name="type" onChange={handleGeneralChange}
                        fullWidth
                        variant="outlined"
                        >
                        {defect_type_ops.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </CustomSelect>
                  </Grid>
                  
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Defect</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={general.defect} name="defect" onChange={handleGeneralChange} fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Item</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={general.item} name="item" onChange={handleGeneralChange} fullWidth />
                  </Grid>
                </Grid>

                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Status*</CustomFormLabel>
                    <CustomSelect
                        id="standard-select-currency"
                        value={general.status} name="status" onChange={handleGeneralChange}
                        fullWidth
                        variant="outlined"
                      >
                        {defect_status_ops.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                    </CustomSelect>
                  </Grid>
                  

                  <Grid item lg={8} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Aircraft*</CustomFormLabel>
                    <CustomSelect
                        id="standard-select-currency"
                        value={general.aircraft} name="aircraft" onChange={handleGeneralChange}
                        fullWidth
                        variant="outlined"
                        >
                        {aircraftNames.map((option,index) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </CustomSelect>
                  </Grid>
                </Grid>

                <Grid container spacing={3} mb={3}>
                  <Grid item lg={12} md={12} sm={12} sx={{
                    marginTop: '16px'
                  }}>
                    <Divider  variant="fullWidth" component="hr" />
                  </Grid>

                  <Grid item lg={12} md={12} sm={12}>
                      <Typography sx={{ fontWeight: '700', mt:'20px' }}>
                      ATA
                      </Typography>
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Chapter*</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={general.chapter} name="chapter" onChange={handleGeneralChange} fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Section*</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={general.section} name="section" onChange={handleGeneralChange} fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Paragraph*</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={general.paragrapgh} name="paragrapgh" onChange={handleGeneralChange} fullWidth />
                  </Grid>

                  <Grid item lg={12} md={12} sm={12} sx={{
                    marginTop: '16px'
                  }}>
                    <Divider  variant="fullWidth" component="hr" />
                  </Grid>

                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Flight</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={general.flight} name="flight" onChange={handleGeneralChange} fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Gate</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={general.gate} name="gate" onChange={handleGeneralChange} fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Station*</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={general.station} name="station" onChange={handleGeneralChange} fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">SDR/MRR*</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={general.sdr_mmr} name="sdr_mmr" onChange={handleGeneralChange} fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Position</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={general.position} name="position" onChange={handleGeneralChange} fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Defect Category*</CustomFormLabel>
                    <CustomSelect
                        id="standard-select-currency"
                        value={general.defect_category} name="defect_category" onChange={handleGeneralChange}
                        fullWidth
                        variant="outlined"
                      >
                        {defect_category_ops.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                    </CustomSelect>
                  </Grid>
                  <Grid item lg={12} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Defect Description*</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={general.defect_description} name="defect_description" onChange={handleGeneralChange} fullWidth />
                  </Grid>
                </Grid>

                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <RadioGroup aria-label="gender" defaultValue="radio1" value={general.internal_capability} name="internal_capability" onChange={handleGeneralChange}>
                    </RadioGroup>
                    <FormControlLabel
                            control={<CustomCheckbox />}
                            label="INTERNAL CAPABILITY"
                          />
                    
                  </Grid>
                </Grid>

                <Grid container spacing={3} mb={3}>
                  <Grid item lg={12} md={12} sm={12} sx={{mb: '0', pb: '0'}}>
                    <Typography sx={{ fontWeight: '400', mt:'20px' }}>ETOPS</Typography>
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                      <FormControl
                        sx={{
                          width: '100%',
                        }}
                      >
                        <Box>
                          <FormControlLabel
                            checked={group1Value === 'a'}
                            onChange={handleGroup1Change}
                            value="a"
                            label="Yes"
                            name=""
                            control={<CustomRadio />}
                          
                          />
                          <FormControlLabel
                            checked={group1Value === 'b'}
                            onChange={handleGroup1Change}
                            value="b"
                            label="No"
                            control={<CustomRadio />}
                            name=""
                          />
                        </Box>
                      </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={3} mb={3}>
                  <Grid item lg={12} md={12} sm={12} sx={{mb: '0', pb: '0'}}>
                    <Typography sx={{ fontWeight: '400', mt:'20px' }}>RII</Typography>
                  </Grid>
                    <Grid item lg={4} md={12} sm={12}>
                      <RadioGroup aria-label="gender" defaultValue="radio1" name="radio-buttons-group">
                      </RadioGroup>
                      <FormControl
                        sx={{
                          width: '100%',
                        }}
                      >
                        <Box>
                          <FormControlLabel
                            checked={group2Value === 'a'}
                            onChange={handleGroup2Change}
                            value="a"
                            label="Yes"
                            name="radio-button-demo1"
                            control={<CustomRadio />}
                          
                          />
                          <FormControlLabel
                            checked={group2Value === 'b'}
                            onChange={handleGroup2Change}
                            value="b"
                            label="No"
                            control={<CustomRadio />}
                            name="radio-button-demo1"
                          />
                        </Box>
                      </FormControl>
                  </Grid>
                </Grid>

                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Estimated TAT</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={general.estimated_tat} name="estimated_tat" onChange={handleGeneralChange} fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Hours/Minutes</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={general.hours_min} name="hours_min" onChange={handleGeneralChange} fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Groundtime RQR*</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={general.groundtime} name="groundtime" onChange={handleGeneralChange} fullWidth />
                  </Grid>
                </Grid>

                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <RadioGroup aria-label="gender" defaultValue="radio1" name="radio-buttons-group">
                    </RadioGroup>
                    <FormControlLabel
                            control={<CustomCheckbox />}
                            label="RELIABILITY"
                          />
                    
                  </Grid>
                </Grid>

                
                <Grid container spacing={3} mb={3}>
                  <Grid item lg={12} md={12} sm={12} sx={{
                    marginTop: '16px'
                  }}>
                    <Divider  variant="fullWidth" component="hr" />
                  </Grid>

                  <Grid item lg={12} md={12} sm={12}>
                      <Typography sx={{ fontWeight: '700', mt:'20px' }}>
                      Seat
                      </Typography>
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">No</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={general.no} name="no" onChange={handleGeneralChange} fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Letter</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={general.letter} name="letter" onChange={handleGeneralChange} fullWidth />
                  </Grid>
                </Grid>
                
                <Grid container spacing={3} mb={3}>
                  <Grid item lg={12} md={12} sm={12} sx={{
                    marginTop: '16px'
                  }}>
                    <Divider  variant="fullWidth" component="hr" />
                  </Grid>
                  <Grid item lg={5} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Reported By*</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={general.reported_by} name="reported_by" onChange={handleGeneralChange} fullWidth />
                  </Grid>
                  <Grid item lg={5} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Reported Date</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={general.reported_date} name="reported_date" onChange={handleGeneralChange}  fullWidth />
                  </Grid>
                  <Grid item lg={1} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Hour</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={general.reported_hour} name="reported_hour" onChange={handleGeneralChange} fullWidth />
                  </Grid>
                  <Grid item lg={1} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Minutes</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={general.reported_min} name="reported_min" onChange={handleGeneralChange} fullWidth />
                  </Grid>
                </Grid>
                
              </form>
            </TabPanel>
            
            <TabPanel value="2">
              <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Defect*</CustomFormLabel>
                    <CustomSelect
                        id="standard-select-currency"
                        value={defer.type} name="type" onChange={handleDeferChange}
                        fullWidth
                        variant="outlined"
                        >
                        {sample_ops.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </CustomSelect>
                  </Grid>
                  
                    <Grid item lg={4} md={12} sm={12}>
                      <CustomFormLabel htmlFor="fname-text">Defer Category*</CustomFormLabel>
                      <CustomTextField id="fname-text" variant="outlined" value={defer.defer_category} name="defer_category" onChange={handleDeferChange} fullWidth />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12}>
                      <CustomFormLabel htmlFor="fname-text">Defer By*</CustomFormLabel>
                      <CustomTextField id="fname-text" variant="outlined" value={defer.defer_by} name="defer_by" onChange={handleDeferChange} fullWidth />
                    </Grid>
              </Grid>

              <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Defer Date*</CustomFormLabel>
                    <CustomTextField
                      id="date"
                      type="date"
                      variant="outlined"
                      fullWidth
                      value={defer.defer_date} name="defer_date" onChange={handleDeferChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item lg={2} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Hour*</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={defer.defer_hour} name="defer_hour" onChange={handleDeferChange} fullWidth />
                  </Grid>
                  <Grid item lg={2} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Minutes*</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={defer.defer_min} name="defer_min" onChange={handleDeferChange} fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">MDDR*</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={defer.mddr} name="mddr" onChange={handleDeferChange} fullWidth />
                  </Grid>
                </Grid>

                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">&nbsp;</CustomFormLabel>
                    <CustomTextField
                      id="date"
                      type="date"
                      variant="outlined"
                      fullWidth
                      value={defer.class} name="class" onChange={handleDeferChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">GMM CTL*</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined"  value={defer.gmm_ctl} name="gmm_ctl" onChange={handleDeferChange} fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">GMM Category*</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined"  value={defer.gmm_category} name="gmm_category" onChange={handleDeferChange} fullWidth />
                  </Grid>
                </Grid>
                <Grid container spacing={3} mb={3}>
                <Grid item lg={4} md={12} sm={12}>
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
                        label="PLAN DEFECT"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox color="primary"
                              icon={<CheckBoxOutlineBlankIcon />}
                              checkedIcon={<CheckBoxIcon />}
                              name="checkednormal"
                          />
                        }
                        label="CALENDAR DAYS"
                      />
                      </FormGroup>
                  </Grid>
                </Grid>

                <Grid container spacing={3} mb={3}>
                    <Grid item lg={12} md={12} sm={12} sx={{
                      marginTop: '16px'
                    }}>
                      <Divider  variant="fullWidth" component="hr" />
                    </Grid>

                    <Grid item lg={12} md={12} sm={12}>
                        <Typography sx={{ fontWeight: '700', mt:'20px' }}>
                        Defer To Schedule
                        </Typography>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12}>
                        <Typography sx={{ fontWeight: '400', mt:'0px' }}>
                        First
                        </Typography>
                    </Grid>
                    <Grid item lg={4} md={12} sm={12}>
                      <CustomFormLabel htmlFor="fname-text">Hours</CustomFormLabel>
                      <CustomTextField id="fname-text" variant="outlined" value={defer.schedule_hours} name="schedule_hours" onChange={handleDeferChange} fullWidth />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12}>
                      <CustomFormLabel htmlFor="fname-text">Cycles</CustomFormLabel>
                      <CustomTextField id="fname-text" variant="outlined" value={defer.schedule_cycles} name="schedule_cycles" onChange={handleDeferChange} fullWidth />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12}>
                      <CustomFormLabel htmlFor="fname-text">Days</CustomFormLabel>
                      <CustomTextField id="fname-text" variant="outlined" value={defer.schedule_days} name="schedule_days" onChange={handleDeferChange} fullWidth />
                    </Grid>
                </Grid>
                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Defer Due Date</CustomFormLabel>
                    <CustomTextField
                      id="date"
                      type="date"
                      variant="outlined"
                      fullWidth
                      value={defer.due_date_min} name="schedule_days" onChange={handleDeferChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item lg={2} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Hour</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={defer.due_date_hour} name="due_date_hour" onChange={handleDeferChange} fullWidth />
                  </Grid>
                  <Grid item lg={2} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Minutes</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={defer.due_date_min} name="due_date_min" onChange={handleDeferChange} fullWidth />
                  </Grid>
                </Grid>
                <Grid container spacing={3} mb={3}>
                    <Grid item lg={12} md={12} sm={12} sx={{
                      marginTop: '16px'
                    }}>
                      <Divider  variant="fullWidth" component="hr" />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12}>
                      <CustomFormLabel htmlFor="fname-text">Capability Area*</CustomFormLabel>
                      <CustomTextField id="fname-text" variant="outlined" value={defer.capability_area} name="capability_area" onChange={handleDeferChange} fullWidth />
                    </Grid>
                    <Grid item lg={8} md={12} sm={12}>
                      <CustomFormLabel htmlFor="fname-text">Defer Note</CustomFormLabel>
                      <CustomTextField id="fname-text" variant="outlined" value={defer.defer_note} name="defer_note" onChange={handleDeferChange} fullWidth />
                    </Grid>
                </Grid>
                <Grid container spacing={3} mb={3}>
                    <Grid item lg={12} md={12} sm={12} sx={{
                      marginTop: '16px'
                    }}>
                      <Divider  variant="fullWidth" component="hr" />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12}>
                      <RadioGroup row aria-label="position" name="position" defaultValue="top">
                        <FormControlLabel value="1" control={<CustomRadio />} label="Do Not Allow Extensions" />
                        <FormControlLabel value="2" control={<CustomRadio />} label="Allow Extensions with QA Approval Only" />
                        <FormControlLabel value="3" control={<CustomRadio />} label="Allow Extensions" />
                      </RadioGroup>
                    </Grid>
                </Grid>
            </TabPanel>

            <TabPanel value="3">
            <Grid container spacing={3} mb={3}>
              <Grid item lg={4} md={12} sm={12}>
                <CustomFormLabel htmlFor="fname-text">Resolution Category*</CustomFormLabel>
                <CustomSelect
                    id="standard-select-currency1"
                    value={resolution.category} name="category" onChange={handleResolutionChange}
                    fullWidth
                    variant="outlined"
                    >
                    {resolution_category_ops.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomSelect>
              </Grid>
              <Grid item lg={4} md={12} sm={12}>
                <CustomFormLabel htmlFor="fname-text">Resolve By*</CustomFormLabel>
                <CustomSelect
                    id="standard-select-currenc2"
                    value={resolution.resolved_by} name="resolved_by" onChange={handleResolutionChange}
                    fullWidth
                    variant="outlined"
                    >
                    {sample_ops.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomSelect>
              </Grid>
            </Grid>
            <Grid container spacing={3} mb={3}>
              <Grid item lg={4} md={12} sm={12}>
                <CustomFormLabel htmlFor="fname-text">Defer Date*</CustomFormLabel>
                <CustomTextField
                  id="date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  value={resolution.resolved_date} name="resolved_date" onChange={handleResolutionChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item lg={2} md={12} sm={12}>
                <CustomFormLabel htmlFor="fname-text">Hour*</CustomFormLabel>
                <CustomTextField id="fname-text" variant="outlined"  value={resolution.resolved_hour} name="resolved_hour" onChange={handleResolutionChange} fullWidth />
              </Grid>
              <Grid item lg={2} md={12} sm={12}>
                <CustomFormLabel htmlFor="fname-text">Minutes*</CustomFormLabel>
                <CustomTextField id="fname-text" variant="outlined"  value={resolution.resolved_min} name="resolved_min" onChange={handleResolutionChange} fullWidth />
              </Grid>
              <Grid item lg={4} md={12} sm={12}>
                <CustomFormLabel htmlFor="fname-text">Resolved Station*</CustomFormLabel>
                <CustomSelect
                  id="standard-select-currency3"
                  value={resolution.resolved_station} name="resolved_station" onChange={handleResolutionChange}
                  fullWidth
                  variant="outlined"
                  >
                  {sample_ops.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomSelect>
                </Grid>
              </Grid>
              <Grid container spacing={3} mb={3}>
                <Grid item lg={4} md={12} sm={12}>
                  <RadioGroup aria-label="gender" defaultValue="radio1" name="radio-buttons-group">
                  </RadioGroup>
                  <FormControlLabel
                          control={<CustomCheckbox />}
                          label="Ongoing Trouble Shooting"
                        />
                  
                </Grid>
                </Grid>

                <Grid container spacing={3} mb={3}>
                  <Grid item lg={12} md={12} sm={12} sx={{mb: '0', pb: '0'}}>
                    <Typography sx={{ fontWeight: '400', mt:'20px' }}>Fault</Typography>
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                      <FormControl
                        sx={{
                          width: '100%',
                        }}
                      >
                        <Box>
                          <FormControlLabel
                            checked={group1Value === 'a'}
                            onChange={handleGroup1Change}
                            value="a"
                            label="Confirm"
                            name="radio-button-demo2"
                            control={<CustomRadio />}
                          
                          />
                          <FormControlLabel
                            checked={group1Value === 'b'}
                            onChange={handleGroup1Change}
                            value="b"
                            label="Not Confirm"
                            control={<CustomRadio />}
                            name="radio-button-demo2"
                          />
                          <FormControlLabel
                            checked={group1Value === 'b'}
                            onChange={handleGroup1Change}
                            value="c"
                            label="Pending"
                            control={<CustomRadio />}
                            name="radio-button-demo2"
                          />
                        </Box>
                      </FormControl>
                  </Grid>
                  <Grid item lg={12} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Resolution Description</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined"  value={resolution.res_description} name="res_description" onChange={handleResolutionChange} fullWidth />
                  </Grid>
                </Grid>

                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Work Order</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined"  value={resolution.work_order} name="work_order" onChange={handleResolutionChange} fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Task Card</CustomFormLabel>
                    <CustomSelect
                      id="standard-select-currency4"
                      value={resolution.task_card} name="task_card" onChange={handleResolutionChange}
                      fullWidth
                      variant="outlined"
                      >
                      {sample_ops.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </CustomSelect>
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Item</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                </Grid>

                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Root Cause*</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Inspected By*</CustomFormLabel>
                    <CustomSelect
                      id="standard-select-currency6"
                      value={resolution.inspected_by} name="inspected_by" onChange={handleResolutionChange}
                      fullWidth
                      variant="outlined"
                      >
                      {sample_ops.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </CustomSelect>
                  </Grid>
                </Grid>

                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">REL to SRV By*</CustomFormLabel>
                    <CustomSelect
                      id="standard-select-currency5"
                      value={resolution.rel_srv_by} name="rel_srv_by" onChange={handleResolutionChange}
                      fullWidth
                      variant="outlined"
                      >
                      {sample_ops.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </CustomSelect>
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">REL To SRV Date</CustomFormLabel>
                    <CustomTextField
                      id="date"
                      type="date"
                      variant="outlined"
                      fullWidth
                      value={resolution.rel_srv_date} name="rel_srv_date" onChange={handleResolutionChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Reference</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={resolution.reference} name="reference" onChange={handleResolutionChange} fullWidth />
                  </Grid>
                </Grid>

                <Grid container spacing={3} mb={3}>
                  <Grid item lg={12} md={12} sm={12} sx={{
                    marginTop: '16px'
                  }}>
                    <Divider  variant="fullWidth" component="hr" />
                  </Grid>

                  <Grid item lg={12} md={12} sm={12}>
                      <Typography sx={{ fontWeight: '700', mt:'20px' }}>
                      Fault Code
                      </Typography>
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomTextField id="fname-text" variant="outlined" value={resolution.fault_code1} name="fault_code1" onChange={handleResolutionChange} fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomTextField id="fname-text" variant="outlined" value={resolution.fault_code2} name="fault_code2" onChange={handleResolutionChange} fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomTextField id="fname-text" variant="outlined" value={resolution.fault_code3} name="fault_code3" onChange={handleResolutionChange} fullWidth />
                  </Grid>
                </Grid>
            </TabPanel>


            <TabPanel value="4">
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

export default AirCraftAddNew;
