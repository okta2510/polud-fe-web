import { useRouter } from 'next/navigation';
import * as React from 'react';
import { alpha, useTheme, styled } from '@mui/material/styles';
import { format } from 'date-fns';
import {
  Box,
  Grid,
  Stack,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  IconButton,
  Tooltip,
  FormControlLabel,
  Typography,
  Avatar,
  TextField,
  InputAdornment,
  Paper,
  Button,
  Chip
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { useSelector, useDispatch } from '@/store/hooks';
import { fetchAirCraft } from '@/store/apps/AirCraft/AirCraftSlice';
import CustomCheckbox from '@/app/components/forms/theme-elements/CustomCheckbox';
import CustomSwitch from '@/app/components/forms/theme-elements/CustomSwitch';
import { IconDotsVertical, IconFilter, IconSearch, IconTrash, IconEdit, IconReload, IconEye } from '@tabler/icons-react';
import { ProductType } from '@/app/(DashboardLayout)/types/apps/eCommerce';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'ID',
  },
  {
    id: 'aircraft',
    numeric: false,
    disablePadding: false,
    label: 'Aircraft',
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Date',
  },
  {
    id: 'aircraft_type_series',
    numeric: false,
    disablePadding: false,
    label: 'Aircraft Type/Series',
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: 'Actions',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: any) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <CustomCheckbox
            color="primary"
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  handleSearch: React.ChangeEvent<HTMLInputElement> | any;
  search: string;
}

type AirCraftStatus = 'active' | 'inactive';
interface ChipStatusProps {
  status: 'active' | 'inactive';
}

const ChipStatus = ({status}:ChipStatusProps) => {
  let color:'primary'|'success'|'error' = status === 'active' ? 'success' : status === 'inactive' ? 'error' : 'primary'
  if (status === 'active') {
    color = 'success'
  }  else if (status === 'inactive') {
    color = 'error'
  } else {
    color= 'primary'
  }
  return <Chip sx={{textTransform: 'capitalize'}} label={status} color={color} />
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, handleSearch, search } = props;
  const router = useRouter();

  const handleRedirect = (event:any) => {
    // Redirect to the desired route
    router.push('/maintenance/new-aircraft-mean');
  };
  return (
    <Toolbar
      sx={{
        // px: {sm:0},
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%', paddingInline: 2 }} color="inherit" variant="subtitle2" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Box sx={{ flex: '1 1 100%' }}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch size="1.1rem" />
                </InputAdornment>
              ),
            }}
            placeholder="Search Product"
            size="small"
            onChange={handleSearch}
            value={search}
          />
        </Box>
      )}
      
      <Box padding={2}>
        <Box 
        sx={{
          display: 'flex',
          gap: 1
        }}>
          <Button sx={{
            width: '120px'
          }}
          startIcon={<IconReload width={18} />}>
              Reset
            </Button>
          <Button  sx={{
            width: '120px'
          }}
          startIcon={<IconEdit width={18} />}>
              Edit
            </Button>
          <Button
          onClick={(event) => handleRedirect(event)}
          sx={{
            width: '120px'
          }} variant="contained" color="primary">
              New
            </Button>
        </Box>
      </Box>
      {/* {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <IconTrash width="18" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <IconFilter size="1.2rem" />
          </IconButton>
        </Tooltip>
      )} */}
    </Toolbar>
  );
};

const AirCraftSeriesTableList = () => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<any>('calories');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const dispatch = useDispatch();

  //Fetch Products
  React.useEffect(() => {
    dispatch(fetchAirCraft());
  }, [dispatch]);

  const getProducts: ProductType[] = useSelector((state) => state.ecommerceReducer.products);

  const [rows, setRows] = React.useState<any>(getProducts);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    setRows(getProducts);
  }, [getProducts]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredRows: ProductType[] = getProducts.filter((row) => {
      return row.title.toLowerCase().includes(event.target.value);
    });
    setSearch(event.target.value);
    setRows(filteredRows);
  };

  // This is for the sorting
  const handleRequestSort = (event: React.MouseEvent<unknown>, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // This is for select all the row
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n: any) => n.title);
      setSelected(newSelecteds);

      return;
    }
    setSelected([]);
  };

  // This is for the single row sleect
  // const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
  //   event.stopPropagation();
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected: readonly string[] = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1),
  //     );
  //   }

  //   setSelected(newSelected);
  // };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const theme = useTheme();
  const borderColor = theme.palette.divider;

  return (
    <Box>
      <Box>
        <Box>
          <EnhancedTableToolbar
              numSelected={selected.length}
              search={search}
              handleSearch={(event: any) => handleSearch(event)}
            />
        </Box>
        <Paper variant="outlined" sx={{ mx: 2, my:1, border: `1px solid ${borderColor}` }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any, index) => {
                    const isItemSelected = isSelected(row.title);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.title}
                        selected={isItemSelected}
                      >
                        {/* <TableCell padding="checkbox">
                          <CustomCheckbox
                            onClick={(event) => handleClick(event, row.title)}
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell> */}
                        <TableCell>
                          <Typography>{row.id}</Typography>
                        </TableCell>
                        
                        <TableCell sx={{
                          width: '10%'
                        }}>
                          <Box display="flex" alignItems="center">
                            {/* <Avatar src={row.photo} alt="product" sx={{ width: 56, height: 56 }} /> */}
                            <Typography variant="subtitle2">
                                {row.title}
                              </Typography>
                          </Box>
                        </TableCell>
                        
                        {/* date */}
                        <TableCell sx={{
                          width: '10%'
                        }}>
                          <Box display="flex" alignItems="center">
                            <Typography
                              color="textSecondary"
                              variant="subtitle2"
                              sx={{
                                ml: 1,
                                textTransform: 'uppercase'
                              }}
                            >
                              Main Schedule
                            </Typography>
                          </Box>
                        </TableCell >
                        {/* aircraft type / series  */}
                        <TableCell  sx={{
                          width: '10%'
                        }}>
                          <Typography fontWeight={400} variant="subtitle2">
                          A319/114
                          </Typography>
                        </TableCell>
                        {/* description cell */}
                        <TableCell>
                          <Typography fontWeight={400} variant="subtitle2">
                            ${row.description}
                          </Typography>
                        </TableCell>
                        {/* action cell  */}
                        <TableCell>
                          <Stack
                            direction="row"
                            // divider={<Divider orientation="vertical" flexItem />}
                            spacing={1}
                          >
                              <IconButton  color="primary">
                                <IconEye width={25} height={25}  />
                              </IconButton>
                              <IconButton  color="error">
                                <IconTrash width={25} height={25}  />
                              </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default AirCraftSeriesTableList;
