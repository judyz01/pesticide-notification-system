import * as React from 'react';
import { Box } from '@mui/material';
import NOIsTable from "./NOIsTable"

const NOIs = () => {
  return (
      <Box sx={{mt:"25px", mb:"25px", display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1}}>
        <NOIsTable />
      </Box>
  );
};

export default NOIs;



