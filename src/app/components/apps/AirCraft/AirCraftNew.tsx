import React from 'react';
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

const AirCraftAddNew = () => {
  const [currency, setCurrency] = React.useState('');
  const [value, setValue] = React.useState("1");

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
                    <CustomFormLabel htmlFor="fname-text">status</CustomFormLabel>
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
                    <CustomFormLabel htmlFor="fname-text">Aircraft Name</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Serial Number</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                </Grid>

                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Aircraft Type </CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  

                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Series</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  

                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Effectivity</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>


                  {/* <Grid item lg={6} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">First Name</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                    <CustomFormLabel htmlFor="standard-select-currency">Select Gender</CustomFormLabel>
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
                    <CustomFormLabel>Membership</CustomFormLabel>

                    <FormControl
                      sx={{
                        width: '100%',
                      }}
                    >
                      <Box>
                        <FormControlLabel
                          checked={selectedValue === 'a'}
                          onChange={handleChange3}
                          value="a"
                          label="Free"
                          name="radio-button-demo"
                          control={<CustomRadio />}
                        
                        />
                        <FormControlLabel
                          checked={selectedValue === 'b'}
                          onChange={handleChange3}
                          value="b"
                          label="Paid"
                          control={<CustomRadio />}
                          name="radio-button-demo"
                        />
                      </Box>
                    </FormControl>
                  </Grid>
                  <Grid item lg={6} md={12} sm={12}>
                    <CustomFormLabel htmlFor="lname-text">Last Name</CustomFormLabel>

                    <CustomTextField id="lname-text" variant="outlined" fullWidth />
                    <CustomFormLabel htmlFor="date">Date of Birth</CustomFormLabel>

                    <CustomTextField
                      id="date"
                      type="date"
                      variant="outlined"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid> */}
                </Grid>
                <Grid container spacing={3} mb={3}>
                  <Grid item lg={12} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Description</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                </Grid>

                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Service Date</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Authority NO</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
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
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Aircraft Flight Hours</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Min</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                </Grid>

                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Block Hours</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Min</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Aircraft Cycles</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                </Grid>

                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Aircraft Brake Cyles</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">RIN</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Time As Of</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                </Grid>

                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">ETOPS</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={6} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">&nbsp;</CustomFormLabel>
                    <RadioGroup aria-label="gender" defaultValue="radio1" name="radio-buttons-group">
                      <Grid container>
                        <Grid item xs={12} sm={4} lg={2}>
                          <FormControlLabel
                            control={<CustomCheckbox />}
                            label="RVSM"
                          />
                        </Grid>
                        <Grid item xs={12} sm={4} lg={2}>
                          <FormControlLabel
                          control={<CustomCheckbox />}
                          label="RNP" />
                        </Grid>
                        <Grid item xs={12} sm={4} lg={6}>
                          <FormControlLabel
                            control={<CustomCheckbox />}
                            label="ETOPS DOWNGRADED"
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
                    />
                      <Typography sx={{ fontWeight: '700', mt:'20px' }}>
                      AIRCRAFT INSURANCE
                      </Typography>
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Insurance Name</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Expired Date</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
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
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                </Grid>

                  
                <Grid container spacing={3} mb={3} lg={12} md={12} sm={12}>
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
              </form>
            </TabPanel>

            {/* ### Aircraft Flight Status ###*/}
            <TabPanel value="3">
              <Grid container spacing={3} mb={3}>
                <Grid item lg={4} md={12} sm={12}>
                  <CustomFormLabel htmlFor="fname-text">Time As Of</CustomFormLabel>
                  <CustomTextField id="fname-text" variant="outlined" fullWidth />
                </Grid>
              </Grid>
              
              <Grid container spacing={3} mb={3}>
                <Grid item lg={4} md={12} sm={12}>
                  <CustomFormLabel htmlFor="fname-text">Aircraft Flight Hours</CustomFormLabel>
                  <CustomTextField id="fname-text" variant="outlined" fullWidth />
                </Grid>
                <Grid item lg={4} md={12} sm={12}>
                  <CustomFormLabel htmlFor="fname-text">Min</CustomFormLabel>
                  <CustomTextField id="fname-text" variant="outlined" fullWidth />
                </Grid>
                <Grid item lg={4} md={12} sm={12}>
                  <CustomFormLabel htmlFor="fname-text">Block Hours</CustomFormLabel>
                  <CustomTextField id="fname-text" variant="outlined" fullWidth />
                </Grid>
              </Grid>

              <Grid container spacing={3} mb={3}>
                <Grid item lg={4} md={12} sm={12}>
                  <CustomFormLabel htmlFor="fname-text">Min</CustomFormLabel>
                  <CustomTextField id="fname-text" variant="outlined" fullWidth />
                </Grid>
                <Grid item lg={4} md={12} sm={12}>
                  <CustomFormLabel htmlFor="fname-text">Aircraft Cycles</CustomFormLabel>
                  <CustomTextField id="fname-text" variant="outlined" fullWidth />
                </Grid>
                <Grid item lg={4} md={12} sm={12}>
                  <CustomFormLabel htmlFor="fname-text">Aircraft Brake Cycles</CustomFormLabel>
                  <CustomTextField id="fname-text" variant="outlined" fullWidth />
                </Grid>
              </Grid>

              <Grid container spacing={3} mb={3}>
                <Grid item lg={4} md={12} sm={12}>
                  <CustomFormLabel htmlFor="fname-text">Flight Status</CustomFormLabel>
                  <CustomTextField id="fname-text" variant="outlined" fullWidth />
                </Grid>
              </Grid>

              <Grid container spacing={3} mb={3}>
                <Grid item lg={6} md={12} sm={12}>
                  <CustomFormLabel htmlFor="fname-text">Flight Status</CustomFormLabel>
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
