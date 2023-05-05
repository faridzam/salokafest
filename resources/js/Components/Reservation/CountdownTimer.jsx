import React from 'react';
import DateTimeDisplay from './DateTimeDisplay';
import useCountdown from '../../Hooks/useCountdown';
//mui
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import {Box, Typography} from '@mui/material';

const ExpiredNotice = () => {
  window.setTimeout(function(){
    // Move to a new location or you can do something else
    window.location.href = `${import.meta.env.VITE_MAIN_URL}/expired`;
  }, 3000);
  return (
    <Grid
    container={true}
    direction="row"
    spacing={0}
    sx={{
        display: 'flex',
        paddingY: '7px',
        width: '100vw',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1241b',
    }}>
      <Box>
        <Typography
        sx={{
          fontSize: '28px',
          fontWeight: 600
        }}>SESSION EXPIRED!!!</Typography>
      </Box>
    </Grid>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <Grid
    container={true}
    direction="row"
    spacing={0}
    sx={{
        display: 'flex',
        paddingBottom: '10px',
        justifyContent: 'center',
        alignItems: 'center',
    }}>
      <Typography
      sx={
        minutes < 5
        ?
        {
          fontSize: '18px',
          fontWeight: 600,
          color: '#f1241b'
        }
        :
        {
          fontSize: '18px',
          fontWeight: 600,
          color: '#fff'
        }
      }> Sesi Anda : </Typography>
      {
        days > 0
        ?
        <DateTimeDisplay value={days} type={'Days'} isDanger={minutes < 5}/>
        :
        null
      }
      {
        hours > 0
        ?
        <DateTimeDisplay value={hours} type={'Hours'} isDanger={minutes < 5}/>
        :
        null
      }
      <DateTimeDisplay value={minutes} type={'menit'} isDanger={minutes < 5}/>
      <DateTimeDisplay value={seconds} type={'detik'} isDanger={minutes < 5}/>
    </Grid>
  );
};

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;