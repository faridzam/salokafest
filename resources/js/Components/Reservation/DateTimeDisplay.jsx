import React from 'react';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import {Box, Typography} from '@mui/material';
import customStyle from './DateTimeDisplay.module.css';

const DateTimeDisplay = ({ value, type, isDanger }) => {
  return (
    <Grid
    className={isDanger ? customStyle.danger : customStyle.countdown}
    container={true}
    direction="column"
    spacing={0}
    sx={{
      marginX: '10px',
      marginY: '10px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Box>
        <Typography
        sx={{
          fontSize: '18px',
          fontWeight: 600
        }}>
          {value}
        </Typography>
      </Box>
      <Box>
        <Typography
        sx={{
          fontSize: '14px',
          fontWeight: 500
        }}>
          {type}
        </Typography>
      </Box>
    </Grid>
  );
};

export default DateTimeDisplay;