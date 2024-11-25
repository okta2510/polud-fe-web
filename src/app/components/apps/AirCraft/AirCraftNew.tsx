import React, { useState, useEffect } from 'react';
import { Box, FormControlLabel, Button, Grid, MenuItem, FormControl, Alert,Stack, RadioGroup, Typography} from '@mui/material';
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
import { sub } from 'date-fns';
import { fetchAirCraft } from '@/store/apps/AirCraft/AirCraftSlice';
import { useSelector, useDispatch } from '@/store/hooks';

const currencies = [
  {
    value: 'active',
    label: 'Active',
  },
  {
    value: 'inactive',
    label: 'Inactive',
  },
  {
    value: 'maintenance',
    label: 'Maintenance',
  },
];


const AirCraftAddNew = () => {
  const [error, setError] = useState(false);
  const [detailId, setDetailId] = useState(0);
  const [value, setValue] = React.useState("1");
  const [other, setOther] = React.useState({
    ownership_status: ''
  })

  const initialInformational = {
    createdBy: '',
    createdDate: '',
    lastEditedBy: '',
    lastEditedDate: '',
  }

  const initialGeneral = {
    image: '',
    aircraft_type: '',
    aircraft_name: '',
    serial_number: '',
    series: '',
    status: '',
    effectivity: '',
    description: '',
    authority_no: '',
    service_date: '',
    authoity: ''
  }
  const [general, setGeneral] = React.useState({...initialGeneral})

  const initialOptional = {
    aircraft: '',
    aircraft_flight_hours: '',
    aircraft_flight_min: '',
    block_hours: '',
    block_min: '',
    aircraft_cycle: '',
    aircraft_brake_cycle: '',
    rin: '',
    time_as_of: '',
    etops: '',
    rsvm: false,
    rnp: false,
    etops_downgrade: false,
    aircraft_insurance: '',
    insurance_name: '',
    insurance_expired_date: '',
    aircraft_warranty: '',
    warranty_vendor: '',
    warranty_hours: '',
    warranty_cycles: '',
    warranty_days: '',
  }
  const [optional, setOptional] = React.useState(initialOptional)

  const initialFlightStatus = {
    time_as_of: '',
    aircraft_flight_hours: '',
    flight_hours_min: '',
    block_hours: '',
    block_min: '',
    aircraft_cycle: '',
    aircraft_brake_cycle: '',
    flight_status: '',
  }
  const [flightStatus, setFlightStatus] = React.useState(initialFlightStatus)

  const [concession, setConcession] = React.useState({})
  const [informational, setInformational] = React.useState({
    createdBy: 'ACTYPSERMS',
    createdDate: '2024-11-15T01:23',
    lastEditedBy: 'GEVERFOREVER',
    lastEditedDate: '2024-11-15T01:23',
  })

  // useEffect(() => {
  //   console.log(informational.lastEditedDate);
  // }, [informational, general]);

  interface typeAircrafts {
    id: number;
    general?: {
      image: string;
      aircraft_type: string;
      aircraft_name: string;
      serial_number: string;
      series: string;
      status: string;
      effectivity: string;
      description: string;
      authority_no: string;
      service_date: string;
      authoity: string;
    };
  }


  React.useEffect(() => {
    const cachedData = localStorage.getItem('aircraftData');
    const currentUrl = window.location.href;
    const match = currentUrl.match(/\/aircraft\/(\d+)/);
    const id = match ? parseInt(match[1], 10) : 0
    setDetailId(id)

    if (cachedData && match) {
      const parsedData:typeAircrafts[] = JSON.parse(cachedData);
      const obj = parsedData.find(x => x.id === id)
      if (obj && obj.general) {
        setGeneral(obj.general)
      }
    }
  }, []);
  
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

  const handleFlightStatusChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFlightStatus((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOptionalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOptional((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  

  const handleCheckBox = (
    event: React.SyntheticEvent<Element, Event>,
    checked: boolean
  ) => {
    const target = event.target as HTMLInputElement;
    setOptional((prev) => ({
      ...prev,
      [target.name]: checked,
    }));
  };

  const handleReset = () => {
    setGeneral({...initialGeneral})
    setInformational({...initialInformational})
    setFlightStatus({...initialFlightStatus})
    setOptional({...initialOptional})
    setConcession({})
  }

  const handleSave = () => {
    const cachedData = localStorage.getItem('aircraftData');
    const parsedData = cachedData ? JSON.parse(cachedData) : [];
    
    try {
      const payload = [...parsedData, ...[{ 
        id: parsedData.length+1,
        general,
        other,
        optional,
        flightStatus: {},
        concession: {},
        informational: {},
        created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
      }]]
      localStorage.setItem('aircraftData', JSON.stringify(payload)); // Save to localStorage
      // console.log('Saved payload:', payload);
      handleReset()
      alert('Aircraft data saved successfully!');
      window.location.href = '/system-support/aircraft';
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
      alert('Failed to save aircraft data.');
    }
  };
  const handleEdit = () => {
    const cachedData = localStorage.getItem('aircraftData');
    const parsedData = cachedData ? JSON.parse(cachedData) : [];
    const index = parsedData.findIndex((item: { id: number }) => item.id === detailId);

    if (index !== -1) {
      // Replace the object at that index with the new 'general' object
      parsedData[index] = {
        id: parsedData.length+1,
        general,
        other,
        optional,
        flightStatus: {},
        concession: {},
        informational: {},
        created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
      };

      // Save the updated array back into localStorage
      localStorage.setItem('aircraftData', JSON.stringify(parsedData));

      console.log('Data updated successfully');
    } else {
      console.log('No matching data found');
    }
    // localStorage.setItem('aircraftData', JSON.stringify(payload));
  //   try {
  //     const payload = [...parsedData, ...[{ 
        // id: parsedData.length+1,
        // general,
        // other,
        // optional,
        // flightStatus: {},
        // concession: {},
        // informational: {},
        // created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
  //     }]]
  //     localStorage.setItem('aircraftData', JSON.stringify(payload)); // Save to localStorage
  //     // console.log('Saved payload:', payload);
  //     handleReset()
  //     alert('Aircraft data saved successfully!');
  //     window.location.href = '/system-support/aircraft';
  //   } catch (error) {
  //     console.error('Error saving data to localStorage:', error);
  //     alert('Failed to save aircraft data.');
  //   // }

  };

  // const handleStatus = (event: React.SyntheticEvent, newValue: string) => {
  //   setGeneral({...general, ...{
  //     status: newValue
  //   }});
  // };

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
              href="/aircraft"
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
                <Tab sx={{ width: "auto", px: '20px'}} label="optional" value="2" />
                <Tab sx={{ width: "auto", px: '20px'}} label="Aircraft Flight Status" value="3" />
                <Tab sx={{ width: "auto", px: '20px'}} label="other" value="4" />
                <Tab sx={{ width: "auto", px: '20px'}} label="concession" value="5" />
                <Tab sx={{ width: "auto", px: '20px'}} label="informational" value="6" />
              </TabList>
            </Box>
            
            <TabPanel value="1">
              <form>
              <Grid container spacing={3} mb={3}>
                <Grid item>
                  <img src="/images/aircraft/no-image.png" width={346} height={200} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}/>
                </Grid>
                <Grid item lg={'auto'} md={12} sm={12}>
                  <Stack spacing={2} sx={{
                    justifyContent: "center",
                    alignItems: "start",
                  }}>
                    <Button sx={{ width: 'auto', textAlign:'left'}} variant="outlined" color="primary" startIcon={<IconFilePlus/>}>
                      Import
                    </Button>
                    <Button sx={{ width: 'auto', textAlign:'left'}} variant="outlined" color="primary" startIcon={<IconFileExport/>}>
                      Export
                    </Button>
                    <Button sx={{ width: 'auto', textAlign:'left'}} variant="outlined" color="primary"  startIcon={<IconFileSearch/>}>
                      Plane Document
                    </Button>
                  </Stack>
                </Grid>
              </Grid>

                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Status*</CustomFormLabel>
                      <CustomSelect
                        id="general-status"
                        value={general.status}
                        name="status"
                        onChange={handleGeneralChange}
                        fullWidth
                        required
                        variant="outlined"
                      >
                        {currencies.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                    </CustomSelect>
                  </Grid>

                </Grid>

                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Aircraft Name*</CustomFormLabel>
                    <FormControl required>
                      <CustomTextField id="fname-text" required variant="outlined" value={general.aircraft_name}
                      name="aircraft_name" onChange={handleGeneralChange} fullWidth />
                    </FormControl>
                    
                  </Grid>
                  
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Serial Number*</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined"  value={general.serial_number}
                      name="serial_number" onChange={handleGeneralChange} fullWidth />
                  </Grid>
                </Grid>

                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Aircraft Type * </CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={general.aircraft_type}
                      name="aircraft_type" onChange={handleGeneralChange} fullWidth />
                  </Grid>
                  

                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Series*</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={general.series}
                      name="series" onChange={handleGeneralChange} fullWidth />
                  </Grid>
                  

                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Effectivity*</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={general.effectivity}
                      name="effectivity" onChange={handleGeneralChange} fullWidth />
                  </Grid>


                
                </Grid>
                <Grid container spacing={3} mb={3}>
                  <Grid item lg={12} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Description*</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={general.description}
                      name="description" onChange={handleGeneralChange} fullWidth />
                  </Grid>
                </Grid>

                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Service Date*</CustomFormLabel>
                    <CustomTextField
                      id="date"
                      type="datetime-local"
                      variant="outlined"
                      fullWidth
                      value={general.service_date}
                      name="service_date"
                      onChange={handleGeneralChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Authority NO</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={general.authority_no} name="authority_no" onChange={handleGeneralChange} fullWidth />
                  </Grid>
                </Grid>
              </form>
            </TabPanel>

            {/* ### tab Optional ###*/}
            <TabPanel value="2">
              <form>
                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Aircraft</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={optional.aircraft}
                      name="aircraft" onChange={handleOptionalChange} fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Aircraft Flight Hours</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={optional.aircraft_flight_hours}
                      name="aircraft_flight_hours" onChange={handleOptionalChange}  fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Min</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={optional.aircraft_flight_min}
                      name="aircraft_flight_min" onChange={handleOptionalChange} fullWidth />
                  </Grid>
                </Grid>

                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Block Hours</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={optional.block_hours}
                      name="block_hours" onChange={handleOptionalChange} fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Min</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={optional.block_min}
                      name="block_min" onChange={handleOptionalChange} fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Aircraft Cycles</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={optional.aircraft_cycle}
                      name="aircraft_cycle" onChange={handleOptionalChange} fullWidth />
                  </Grid>
                </Grid>

                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Aircraft Brake Cyles</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={optional.aircraft_brake_cycle}
                      name="aircraft_brake_cycle" onChange={handleOptionalChange} fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">RIN</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={optional.rin}
                      name="rin" onChange={handleOptionalChange} fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Time As Of</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={optional.time_as_of}
                      name="time_as_of" onChange={handleOptionalChange} fullWidth />
                  </Grid>
                </Grid>

                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">ETOPS</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={optional.etops}
                      name="etops" onChange={handleOptionalChange} fullWidth />
                  </Grid>
                  <Grid item lg={6} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">&nbsp;</CustomFormLabel>
                    <RadioGroup aria-label="gender" defaultValue="radio1" name="radio-buttons-group">
                      <Grid container>
                        <Grid item xs={12} sm={4} lg={2}>
                          <FormControlLabel
                            control={<CustomCheckbox checked={optional.rsvm} name="rsvm"/>}
                            label="RVSM"
                            name="rsvm"
                          />
                        </Grid>
                        <Grid item xs={12} sm={4} lg={2}>
                          <FormControlLabel
                          control={<CustomCheckbox checked={optional.rnp} name="rnp"/>}
                          label="RNP" name="rnp"/>
                        </Grid>
                        <Grid item xs={12} sm={4} lg={6}>
                          <FormControlLabel
                            control={<CustomCheckbox checked={optional.etops_downgrade} name="etops_downgrade"/>}
                            label="ETOPS DOWNGRADED" name="etops_downgrade"
                          />
                        </Grid>
                      </Grid>
                    </RadioGroup>
                  </Grid>
                </Grid>

                <Grid container spacing={3} mb={3}>
                  <Grid item lg={12} md={12} sm={12} sx={{
                    marginTop: '16px'
                  }}>
                    <Divider  variant="fullWidth" component="hr" />
                  </Grid>

                  <Grid item lg={12} md={12} sm={12}>
                    <FormControlLabel
                      control={<CustomCheckbox />}
                      label="AIRCRAFT UNDER INSURANCE"
                      value={optional.aircraft_insurance}
                      name="etops"
                    />
                      <Typography sx={{ fontWeight: '700', mt:'20px' }}>
                      AIRCRAFT INSURANCE
                      </Typography>
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Insurance Name</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={optional.insurance_name}
                      name="insurance_name" onChange={handleOptionalChange} fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Expired Date</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={optional.insurance_expired_date}
                      name="insurance_expired_date" onChange={handleOptionalChange} fullWidth />
                  </Grid>
                </Grid>
                
                <Grid container spacing={3} mb={3} lg={12} md={12} sm={12}>
                  <Grid item lg={12} md={12} sm={12} sx={{
                    marginTop: '16px'
                  }}>
                    <Divider  variant="fullWidth" component="hr" />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12}>
                    <FormControlLabel
                      control={<CustomCheckbox />}
                      label="AIRCRAFT UNDER WARRANTY"
                    />
                      <Typography sx={{ fontWeight: '700', mt:'20px' }}>
                      AIRCRAFT WARRANTY
                      </Typography>
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Vendor</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={optional.warranty_vendor}
                      name="warranty_vendor" onChange={handleOptionalChange} fullWidth />
                  </Grid>
                </Grid>

                  
                <Grid container spacing={3} mb={3} lg={12} md={12} sm={12}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Hours</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={optional.warranty_hours}
                      name="warranty_hours" onChange={handleOptionalChange} fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Cycles</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={optional.warranty_cycles}
                      name="warranty_cycles" onChange={handleOptionalChange} fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Days</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" value={optional.warranty_days}
                      name="warranty_days" onChange={handleOptionalChange}  fullWidth />
                  </Grid>
                </Grid>
              </form>
            </TabPanel>

            {/* ### Aircraft Flight Status ###*/}
            <TabPanel value="3">
              <Grid container spacing={3} mb={3}>
                <Grid item lg={4} md={12} sm={12}>
                  <CustomFormLabel htmlFor="fname-text">Time As Of</CustomFormLabel>
                  <CustomTextField id="fname-text" variant="outlined" value={flightStatus.time_as_of}
                      name="time_as_of" onChange={handleFlightStatusChange} fullWidth />
                </Grid>
              </Grid>
              
              <Grid container spacing={3} mb={3}>
                <Grid item lg={6} md={12} sm={12}>
                  <CustomFormLabel htmlFor="fname-text">Aircraft Flight Hours*</CustomFormLabel>
                  <CustomTextField id="fname-text" variant="outlined" value={flightStatus.aircraft_flight_hours}
                      name="aircraft_flight_hours" onChange={handleFlightStatusChange} fullWidth />
                </Grid>
                <Grid item lg={6} md={12} sm={12}>
                  <CustomFormLabel htmlFor="fname-text">Min*</CustomFormLabel>
                  <CustomTextField id="fname-text" variant="outlined" value={flightStatus.flight_hours_min}
                      name="flight_hours_min" onChange={handleFlightStatusChange} fullWidth />
                </Grid>
              </Grid>

              <Grid container spacing={3} mb={3}>

                <Grid item lg={3} md={12} sm={12}>
                  <CustomFormLabel htmlFor="fname-text">Block Hours*</CustomFormLabel>
                  <CustomTextField id="fname-text" variant="outlined" fullWidth />
                </Grid>
                <Grid item lg={3} md={12} sm={12}>
                  <CustomFormLabel htmlFor="fname-text">Min*</CustomFormLabel>
                  <CustomTextField id="fname-text" variant="outlined" fullWidth />
                </Grid>
                <Grid item lg={3} md={12} sm={12}>
                  <CustomFormLabel htmlFor="fname-text">Aircraft Cycles*</CustomFormLabel>
                  <CustomTextField id="fname-text" variant="outlined" fullWidth />
                </Grid>
                <Grid item lg={3} md={12} sm={12}>
                  <CustomFormLabel htmlFor="fname-text">Aircraft Brake Cycles*</CustomFormLabel>
                  <CustomTextField id="fname-text" variant="outlined" fullWidth />
                </Grid>
              </Grid>

              <Grid container spacing={3} mb={3}>
                <Grid item lg={6} md={12} sm={12}>
                  <CustomFormLabel htmlFor="fname-text">Flight Status*</CustomFormLabel>
                  <RadioGroup aria-label="gender" defaultValue="radio1" name="radio-buttons-group">
                    <Grid container>
                      <Grid item xs={12} sm={4} lg={3}>
                        <FormControl component="fieldset">
                          <FormControlLabel value="radio1" control={<CustomRadio />} label="Serviceable" />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6} lg={6}>
                        <FormControl component="fieldset">
                          <FormControlLabel value="radio2" control={<CustomRadio />} label="Unserviceable (AOG/Maintenance)" />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </RadioGroup>
                </Grid>
              </Grid>
            </TabPanel>

            {/* ### other ###*/}
            <TabPanel value="4">
              <Grid container spacing={3} mb={3}>
                <Grid item lg={4} md={12} sm={12}>
                  <CustomFormLabel htmlFor="fname-text">Owner</CustomFormLabel>
                  <CustomTextField id="fname-text" variant="outlined" fullWidth />
                </Grid>
                <Grid item lg={4} md={12} sm={12}>
                  <CustomFormLabel htmlFor="fname-text">Date</CustomFormLabel>
                  <CustomTextField id="fname-text" variant="outlined" fullWidth />
                </Grid>
                <Grid item lg={4} md={12} sm={12}>
                  <CustomFormLabel htmlFor="fname-text">Delivery Date</CustomFormLabel>
                  <CustomTextField id="fname-text" variant="outlined" fullWidth />
                </Grid>
              </Grid>

              <Grid container spacing={3} mb={3}>
                <Grid item lg={4} md={12} sm={12}>
                  <CustomFormLabel htmlFor="fname-text">Operator</CustomFormLabel>
                  <CustomTextField id="fname-text" variant="outlined" fullWidth />
                </Grid>
                <Grid item lg={4} md={12} sm={12}>
                  <CustomFormLabel htmlFor="fname-text">Date</CustomFormLabel>
                  <CustomTextField id="fname-text" variant="outlined" fullWidth />
                </Grid>
                <Grid item lg={4} md={12} sm={12}>
                  <CustomFormLabel htmlFor="fname-text">Certificate of Airwothiness Date</CustomFormLabel>
                  <CustomTextField id="fname-text" variant="outlined" fullWidth />
                </Grid>
              </Grid>

              <Grid container spacing={3} mb={3}>
                <Grid item lg={4} md={12} sm={12}>
                  <CustomFormLabel htmlFor="fname-text">Prev Aircraft</CustomFormLabel>
                  <CustomTextField id="fname-text" variant="outlined" fullWidth />
                </Grid>
                <Grid item lg={4} md={12} sm={12}>
                  <CustomFormLabel htmlFor="fname-text">Ownership Status</CustomFormLabel>
                  <CustomSelect
                      id="other-ownership-status"
                      value={other.ownership_status}
                      onChange={handleGeneralChange}
                      fullWidth
                      variant="outlined"
                    >
                      {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                  </CustomSelect>
                </Grid>
                <Grid item lg={4} md={12} sm={12}>
                  <CustomFormLabel htmlFor="fname-text">Date Manufactured</CustomFormLabel>
                  <CustomTextField id="fname-text" variant="outlined" fullWidth />
                </Grid>
              </Grid>

              <Grid container spacing={3} mb={3}>
                <Grid item lg={4} md={12} sm={12}>
                  <CustomFormLabel htmlFor="fname-text">Engine Model</CustomFormLabel>
                  <CustomTextField id="fname-text" variant="outlined" fullWidth />
                </Grid>
                <Grid item lg={4} md={12} sm={12}>
                  <CustomFormLabel htmlFor="fname-text">Delivered Engine No.1</CustomFormLabel>
                  <CustomTextField id="fname-text" variant="outlined" fullWidth />
                </Grid>
                <Grid item lg={4} md={12} sm={12}>
                  <CustomFormLabel htmlFor="fname-text">Delivered Engine No.2</CustomFormLabel>
                  <CustomTextField id="fname-text" variant="outlined" fullWidth />
                </Grid>
              </Grid>
            </TabPanel>

            {/* ### concession */}
            <TabPanel value="5">
              <Grid container spacing={3} mb={3}>
                <Grid item lg={4} md={12} sm={12}>
                  <CustomFormLabel htmlFor="fname-text">Concession Limit</CustomFormLabel>
                  <CustomTextField id="fname-text" variant="outlined" fullWidth />
                </Grid>

                <Grid item lg={12} md={12} sm={12} sx={{
                  marginTop: '16px'
                }}>
                  <Divider  variant="fullWidth" component="hr" />
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
                <Grid item lg={4} md={12} sm={12}>
                  <CustomFormLabel htmlFor="fname-text">Rin</CustomFormLabel>
                  <CustomTextField id="fname-text" variant="outlined" fullWidth />
                </Grid>
                
              </Grid>
            </TabPanel>
            
            <TabPanel value="6">
            <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Created By</CustomFormLabel>
                    <CustomTextField disabled id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Created Date</CustomFormLabel>
                    <CustomTextField
                      id="date"
                      type="date"
                      disabled
                      variant="outlined"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Last Edited By</CustomFormLabel>
                    <CustomTextField disabled id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Last Edited Date</CustomFormLabel>
                    <CustomTextField
                      id="date"
                      disabled
                      type="date"
                      variant="outlined"
                      fullWidth
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
