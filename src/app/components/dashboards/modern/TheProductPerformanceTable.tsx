import React from "react";
import DashboardCard from "../../shared/DashboardCard";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  TableContainer,
  Stack,
  MenuItem,
} from "@mui/material";
import ProjectsTableData from "./ProjectsTableData";
import CustomSelect from "../../forms/theme-elements/CustomSelect";

const performers = ProjectsTableData;

const ProductPerformanceTable = () => {
  const [number, setNumber] = React.useState("1");

  const handleChange3 = (event: any) => {
    setNumber(event.target.value);
  };

  return (
    <DashboardCard
      title="Product Performance" subtitle="Assigned Project"
      action={
        <CustomSelect
          id="standard-select-number"
          variant="outlined"
          value={number}
          onChange={handleChange3}
          sx={{
            mb: 2,
          }}
        >
          <MenuItem value={1}>March</MenuItem>
          <MenuItem value={2}>April</MenuItem>
          <MenuItem value={3}>June</MenuItem>
        </CustomSelect>
      }
    >
      <TableContainer>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap",
            mt: -2,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={500}>
                  Assigned
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={500}>
                  Project
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={500}>
                  Priority
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={500}>
                  Budget
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {performers.map((basic) => (
              <TableRow key={basic.id}>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                      src={basic.imgsrc}
                      alt={basic.imgsrc}
                      sx={{ width: 40, height: 40 }}
                    />
                    <Box>
                      <Typography variant="subtitle2" fontWeight={500}>
                        {basic.name}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    fontWeight={400}
                  >
                    {basic.pname}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    sx={{
                      bgcolor:
                        basic.status === "High"
                          ? (theme) => theme.palette.error.light
                          : basic.status === "Medium"
                          ? (theme) => theme.palette.primary.light
                          : basic.status === "Low"
                          ? (theme) => theme.palette.success.light
                          : (theme) => theme.palette.secondary.light,
                      color:
                        basic.status === "High"
                          ? (theme) => theme.palette.error.main
                          : basic.status === "Medium"
                          ? (theme) => theme.palette.primary.main
                          : basic.status === "Low"
                          ? (theme) => theme.palette.success.main
                          : (theme) => theme.palette.secondary.main,
                      borderRadius: "8px",
                      fontWeight: 400,
                    }}
                    size="small"
                    label={basic.status}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">${basic.budget}k</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardCard>
  );
};

export default ProductPerformanceTable;
