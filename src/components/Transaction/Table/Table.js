import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React from 'react'

  const BasicTable =(props) =>{
    return (
      <TableContainer  style={{width:'40vw',height:'30vh',margin:'auto'}} component={Paper}>
        <Table sx={{ minWidth: 250 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Denomination</TableCell>
              <TableCell >Number of Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.result.map((row) => (
              <TableRow key={row[0]} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="left">{row[0]}</TableCell>
                <TableCell align="left">{row[1]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  export default BasicTable