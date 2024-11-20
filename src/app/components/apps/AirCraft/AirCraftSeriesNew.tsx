import React from 'react';
                  <Divider />
import { Box, FormControlLabel, Button, Grid, MenuItem, FormControl, Alert, Divider } from '@mui/material';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField'
import CustomSelect from '@/app/components/forms/theme-elements/CustomSelect';
import CustomRadio from '@/app/components/forms/theme-elements/CustomRadio';
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';
import ParentCard from '@/app/components/shared/ParentCard';
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

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

const AirCraftSeriesNew = () => {
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
                <Tab sx={{ width: "auto", px: '20px'}} label="Information" value="2" />
              </TabList>
            </Box>
            
            <TabPanel value="1">
              <form>
                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Type</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Series</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>

                  <Grid item lg={8} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Description</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Divider />

                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">No. of enngines*</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Divider />

                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Effectivity Designator Provider</CustomFormLabel>
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
                  <Divider />

                  <Grid item lg={12} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Aircraft Sub-Type*</CustomFormLabel>
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
                  <Divider />

                  <Grid item lg={6} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Equipment ID</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Divider />

                  <Grid item lg={6} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">ETOPS</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Divider />
                </Grid>

                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Aircraft Maintenance Manual</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Divider />
                </Grid>

                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Aircraft Maintenance Program</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Divider />

                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Revision</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Divider />

                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Date</CustomFormLabel>
                    <CustomTextField
                      id="date"
                      type="date"
                      variant="outlined"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Divider />
                  

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
              </form>
            </TabPanel>
            <TabPanel value="2">
              <form>
                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Created By</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Created Date</CustomFormLabel>
                    <CustomTextField
                      id="date"
                      type="date"
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
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Last Edited Date</CustomFormLabel>
                    <CustomTextField
                      id="date"
                      type="date"
                      variant="outlined"
                      fullWidth
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

export default AirCraftSeriesNew;
