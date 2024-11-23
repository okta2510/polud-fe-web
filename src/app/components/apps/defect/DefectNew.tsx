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

const currencies = [
  {
    value: 'female',
    label: 'Female',
  },
  {
    value: 'male',
    label: 'Male',
  },
  {
    value: 'other',
    label: 'Other',
  },
];

const countries = [
  {
    value: 'india',
    label: 'India',
  },
  {
    value: 'uk',
    label: 'United Kingdom',
  },
  {
    value: 'srilanka',
    label: 'Srilanka',
  },
];



const formatDate = (date: Date) => {
  const pad = (num: number) => String(num).padStart(2, '0'); // Helper for padding
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1); // Months are 0-based
  const year = String(date.getFullYear()).slice(-2); // Get last two digits of year
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${day}${month}${year}-${hours}${minutes}${seconds}`;
};

const AirCraftAddNew = () => {
  const [formValues, setFormValues] = useState({
    createdBy: 'ACTYPSERMS',
    createdDate: '2024-11-15T01:23',
    lastEditedBy: 'GEVERFOREVER',
    lastEditedDate: '2024-11-15T01:23',
  });

  useEffect(() => {
    console.log(formValues.lastEditedDate);
  }, [formValues.lastEditedDate]);

  const [currency, setCurrency] = React.useState('');
  const [value, setValue] = React.useState("1");
  const [group1Value, setGroup1Value] = useState(''); // State for the first group
  const [group2Value, setGroup2Value] = useState('');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleChange2 = (event: any) => {
    setCurrency(event.target.value);
  };

  const [selectedValue, setSelectedValue] = React.useState('');

  const handleChange3 = (event: any) => {
    setSelectedValue(event.target.value);
  };

  const [country, setCountry] = React.useState('');

  const handleChange4 = (event: any) => {
    setCountry(event.target.value);
  };

  const handleGroup1Change = (event: React.SyntheticEvent, checked: boolean) => {
    const target = event.target as HTMLInputElement;
    setGroup1Value(target.value); 
  };
  const handleGroup2Change = (event: React.SyntheticEvent, checked: boolean) => {
    const target = event.target as HTMLInputElement;
    setGroup2Value(target.value); 
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
            <Button variant="contained" color="primary">
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
                        value={currency}
                        onChange={handleChange2}
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
                    <CustomFormLabel htmlFor="fname-text">Defect</CustomFormLabel>
                    <CustomSelect
                        id="standard-select-currency"
                        value={currency}
                        onChange={handleChange2}
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
                    <CustomFormLabel htmlFor="fname-text">Item</CustomFormLabel>
                    <CustomSelect
                        id="standard-select-currency"
                        value={currency}
                        onChange={handleChange2}
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
                </Grid>

                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Status*</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  

                  <Grid item lg={8} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Aircraft*</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
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
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Section*</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Paragraph*</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>

                  <Grid item lg={12} md={12} sm={12} sx={{
                    marginTop: '16px'
                  }}>
                    <Divider  variant="fullWidth" component="hr" />
                  </Grid>

                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Flight</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Gate</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Station*</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">SDR/MRR*</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Position</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Defect Category*</CustomFormLabel>
                    <CustomSelect
                        id="standard-select-currency"
                        value={currency}
                        onChange={handleChange2}
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
                  <Grid item lg={12} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Defect Description*</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                </Grid>

                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <RadioGroup aria-label="gender" defaultValue="radio1" name="radio-buttons-group">
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
                            name="radio-button-demo2"
                            control={<CustomRadio />}
                          
                          />
                          <FormControlLabel
                            checked={group1Value === 'b'}
                            onChange={handleGroup1Change}
                            value="b"
                            label="No"
                            control={<CustomRadio />}
                            name="radio-button-demo2"
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
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Hours/Minutes</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Groundtime RQR*</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
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
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Letter</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
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
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={5} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Reported Date</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={1} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Hour</CustomFormLabel>
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
                    <CustomFormLabel htmlFor="fname-text">Defect Type*</CustomFormLabel>
                    <CustomSelect
                        id="standard-select-currency"
                        value={currency}
                        onChange={handleChange2}
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
                      <CustomFormLabel htmlFor="fname-text">Status*</CustomFormLabel>
                      <CustomTextField id="fname-text" variant="outlined" fullWidth />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12}>
                      <CustomFormLabel htmlFor="fname-text">Status*</CustomFormLabel>
                      <CustomTextField id="fname-text" variant="outlined" fullWidth />
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
                      value={formValues.createdDate}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>) => setFormValues({ ...formValues, createdDate: e.target.value })}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item lg={2} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Hour*</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={2} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Minutes*</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">MDDR*</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
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
                      value={formValues.createdDate}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>) => setFormValues({ ...formValues, createdDate: e.target.value })}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">GMM CTL*</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">GMM Category*</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
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
                    <CustomFormLabel htmlFor="fname-text">Defer Due Date</CustomFormLabel>
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
                  <Grid item lg={2} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Hour</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={2} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Minutes</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
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
                      <CustomTextField id="fname-text" variant="outlined" fullWidth />
                    </Grid>
                    <Grid item lg={8} md={12} sm={12}>
                      <CustomFormLabel htmlFor="fname-text">Defer Note</CustomFormLabel>
                      <CustomTextField id="fname-text" variant="outlined" fullWidth />
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
                <CustomFormLabel htmlFor="fname-text">Defect Type*</CustomFormLabel>
                <CustomSelect
                    id="standard-select-currency"
                    value={currency}
                    onChange={handleChange2}
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
                <CustomFormLabel htmlFor="fname-text">Defect Type*</CustomFormLabel>
                <CustomSelect
                    id="standard-select-currency"
                    value={currency}
                    onChange={handleChange2}
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
            </Grid>
            <Grid container spacing={3} mb={3}>
              <Grid item lg={4} md={12} sm={12}>
                <CustomFormLabel htmlFor="fname-text">Defer Date*</CustomFormLabel>
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
              <Grid item lg={2} md={12} sm={12}>
                <CustomFormLabel htmlFor="fname-text">Chapter*</CustomFormLabel>
                <CustomTextField id="fname-text" variant="outlined" fullWidth />
              </Grid>
              <Grid item lg={2} md={12} sm={12}>
                <CustomFormLabel htmlFor="fname-text">Chapter*</CustomFormLabel>
                <CustomTextField id="fname-text" variant="outlined" fullWidth />
              </Grid>
              <Grid item lg={4} md={12} sm={12}>
                <CustomFormLabel htmlFor="fname-text">Resolved Station*</CustomFormLabel>
                <CustomSelect
                  id="standard-select-currency"
                  value={currency}
                  onChange={handleChange2}
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
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                </Grid>

                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Work Order</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Task Card</CustomFormLabel>
                    <CustomSelect
                      id="standard-select-currency"
                      value={currency}
                      onChange={handleChange2}
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
                      id="standard-select-currency"
                      value={currency}
                      onChange={handleChange2}
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
                </Grid>

                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">REL to SRV By*</CustomFormLabel>
                    <CustomSelect
                      id="standard-select-currency"
                      value={currency}
                      onChange={handleChange2}
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
                    <CustomFormLabel htmlFor="fname-text">REL To SRV Date</CustomFormLabel>
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
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Reference</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
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
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
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
