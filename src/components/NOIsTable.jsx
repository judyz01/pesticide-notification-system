import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { TableVirtuoso } from 'react-virtuoso';


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

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => <Table {...props} style={{ borderCollapse: 'separate' }} />,
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <StyledTableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? 'center' : 'left'}
          style={{ width: column.width }}
          sx={{
            backgroundColor: 'background.paper',
          }}
        >
          {column.label}
        </StyledTableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index, row) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? 'center' : 'left'}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

const NOIsTable = () => {
  return (
        <Paper style={{ height: '80vh', width: '75%'}}>
          <TableVirtuoso
            data={rows}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
          />
        </Paper>
  );
};

export default NOIsTable;



