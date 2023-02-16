import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, TablePagination, Paper } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#274d23",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const sample = [
  ['Asana XL Insecticide', '7/5/19', 700, 'location', 1, 'Ground'],
  ['Abba Ultra Miticide/Insecticide', '7/5/19', 700, 'location', 1, 'Ground'],
  ['Besiege Insecticide', '7/8/19', 700, 'location', 1, 'Ground'],
];

function createData(id, name, date, time, location, coverage, method) {
  return { id, name, date, time, location, coverage, method };
}

const columns = [
  {
    width: 200,
    label: 'Pesticide\u00A0Name',
    dataKey: 'name',
  },
  {
    width: 120,
    label: 'Date',
    dataKey: 'date',
  },
  {
    width: 120,
    label: 'Time',
    dataKey: 'time',
    numeric: true,
  },
  {
    width: 120,
    label: 'Location',
    dataKey: 'location',
  },
  {
    width: 120,
    label: 'Coverage\u00A0(sq. mi)',
    dataKey: 'coverage',
    numeric: true,
  },
  {
    width: 120,
    label: 'Method',
    dataKey: 'method',
  }
];


const rows = Array.from({ length: 15 }, (_, index) => {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  return createData(index, ...randomSelection);
});

export default function HomeTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '80%', mt: '20px'}}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ width: column.width }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <StyledTableCell key={column.id} align={column.align}>
                          {row[column.dataKey]}
                        </StyledTableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
