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

const WorkOrderNew = () => {
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
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Status*</CustomFormLabel>
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
                    <CustomFormLabel htmlFor="fname-text">Category*</CustomFormLabel>
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
                  <Grid item lg={12} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Description</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                </Grid>

                <Grid container spacing={3} mb={3}>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Location*</CustomFormLabel>
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
                    <CustomFormLabel htmlFor="fname-text">Site</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Priority*</CustomFormLabel>
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
                    <CustomFormLabel htmlFor="fname-text">Aircraft</CustomFormLabel>
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
                    <CustomFormLabel htmlFor="fname-text">Aircraft Serial Number</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item lg={2} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Type/Series</CustomFormLabel>
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
                  <Grid item lg={2} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">&nbsp;</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
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

                <Grid container spacing={3} mb={3}>
                  <Grid item lg={12} md={12} sm={12}>
                    <CustomFormLabel htmlFor="fname-text">Flight Number</CustomFormLabel>
                    <CustomTextField id="fname-text" variant="outlined" fullWidth />
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
