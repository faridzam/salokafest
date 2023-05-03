import React from 'react';
import { Head, router } from '@inertiajs/react';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import {Box, Typography, CircularProgress, Fade} from '@mui/material';
import {} from '@mui/icons-material';

import {media} from '../../assets/images';
import customStyle from '../GetSession.module.css';

import { ThemeProvider } from "@emotion/react";
import { theme } from "../../utils/theme";

import { EncryptStorage } from 'encrypt-storage';

export function useIsMounted() {

    const isMountedRef = React.useRef(true);
    const isMounted = React.useCallback(() => isMountedRef.current, []);

    React.useEffect(() => {
        return () => void (isMountedRef.current = false);
    }, []);

    return isMounted;

}

export const encryptStorage = new EncryptStorage('@encryptedByZam', {
    // storageType: 'sessionStorage',
});


export default function Ticket(props) {
    const isMounted = useIsMounted();

    const externalRedirect = (route) => {
        window.location.href = route
    }

    const [countdownDate, setCountdownDate] = React.useState(new Date('05/10/2023').getTime());

    const [state, setState] = React.useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });

    React.useEffect(() => {
        setInterval(() => setNewTime(), 1000);
    }, []);

    const setNewTime = () => {
        if (countdownDate) {
          const currentTime = new Date().getTime();
    
          const distanceToDate = countdownDate - currentTime;
    
          let days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
          let hours = Math.floor(
            (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          );
          let minutes = Math.floor(
            (distanceToDate % (1000 * 60 * 60)) / (1000 * 60),
          );
          let seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);
    
          const numbersToAddZeroTo = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    
          days = `${days}`;
          if (numbersToAddZeroTo.includes(hours)) {
            hours = `0${hours}`;
          } else if (numbersToAddZeroTo.includes(minutes)) {
            minutes = `0${minutes}`;
          } else if (numbersToAddZeroTo.includes(seconds)) {
            seconds = `0${seconds}`;
          }
    
          setState({ days: days, hours: hours, minutes, seconds });
        }
      };

    return (
        <>
            <Head title='Data Pemesan'/>
            <ThemeProvider
            theme={theme}>
                <Fade
                in={isMounted}
                timeout={1000}
                style={{ transitionDelay: isMounted ? '500ms' : '0ms' }}>
                    <div>

                        {/* contents */}
                        <Grid
                        container={true}
                        direction="column"
                        spacing={0}
                        sx={{
                            display: 'flex',
                            width: '100vw',
                            height: '100vh',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'black.lightest',
                        }}>
                            <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '250px',
                            }}>
                                <img
                                src={media[19]}
                                style={{
                                    width: '250px',
                                }}></img>
                            </Box>
                            <Grid
                            container={true}
                            direction="row"
                            spacing={0}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: '30px',
                            }}>
                                <Grid
                                container={true}
                                direction="column"
                                spacing={0}
                                sx={{
                                marginX: '10px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                }}>
                                    <Box>
                                        <Typography
                                        sx={{
                                        fontSize: '24px',
                                        fontWeight: 600,
                                        color: '#eee'
                                        }}>
                                        {state.days}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography
                                        sx={{
                                        fontSize: '18px',
                                        fontWeight: 500,
                                        color: '#eee'
                                        }}>
                                        days
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid
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
                                        fontSize: '24px',
                                        fontWeight: 600,
                                        color: '#eee'
                                        }}>
                                        {state.hours}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography
                                        sx={{
                                        fontSize: '18px',
                                        fontWeight: 500,
                                        color: '#eee'
                                        }}>
                                        hours
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid
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
                                        fontSize: '24px',
                                        fontWeight: 600,
                                        color: '#eee'
                                        }}>
                                        {state.minutes}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography
                                        sx={{
                                        fontSize: '18px',
                                        fontWeight: 500,
                                        color: '#eee'
                                        }}>
                                        minutes
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid
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
                                        fontSize: '24px',
                                        fontWeight: 600,
                                        color: '#eee'
                                        }}>
                                        {state.seconds}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography
                                        sx={{
                                        fontSize: '18px',
                                        fontWeight: 500,
                                        color: '#eee'
                                        }}>
                                        seconds
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Box>
                                <Typography
                                sx={{
                                    fontSize: '14px',
                                    color: 'white.main',
                                    marginTop: '10px',
                                }}>
                                    *Pembelian tiket dapat dilakukan tanggal 10 Mei 2023 pukul 10.00 WIB
                                </Typography>
                            </Box>
                        </Grid>

                    </div>
                </Fade>
            </ThemeProvider>
        </>
    )
}
