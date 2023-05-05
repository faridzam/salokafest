import React from 'react';
import { Head, router } from '@inertiajs/react';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import {Box, Typography, CircularProgress, Fade} from '@mui/material';
import {} from '@mui/icons-material';

import {mediaSalokafest} from '../assets/images/salokafest';
import {media} from '../assets/images';
import customStyle from './GetSession.module.css';

import { ThemeProvider } from "@emotion/react";
import { theme } from "../utils/theme";

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

    React.useEffect(() => {
        // Your application has indicated there's an error
        if (encryptStorage.getItem('sessionCodeEX') && encryptStorage.getItem('sessionCodeID')) {
            //
            var dateTimeNow = new Date();
            var jsonObj = encryptStorage.getItem('sessionCodeEX');
            var expireDate = new Date(jsonObj);

            var diffMaster = dateTimeNow - expireDate;
            var diffMins = Math.floor(((diffMaster % 86400000) % 3600000) / 60000);

            if (diffMins >= 0) {
                var sessionCode = {
                    id: new Date().getFullYear().toString()+(new Date().getMonth()+1).toString().padStart(2, "0")+new Date().getDate().toString().padStart(2, "0")+new Date().getMinutes().toString().padStart(2, "0")+new Date().getMilliseconds().toString().padStart(2, "0")+Math.floor(Math.random()*(999-100+1)+100).toString().substring(1),
                    expire: new Date(dateTimeNow.getTime() + 15*60000)
                }

                axios.post('/api/check-session', {
                    id: sessionCode.id,
                    ex: sessionCode.expire
                }).then((response) => {
                    //
                    let session_active = response.data.session_active;
                    let session_created = response.data.session_created;
                    if (session_active >= 500) {
                        //
                        window.location.href = `${import.meta.env.VITE_MAIN_URL}/busy`;
                        // alert(session_active);
                    } else {
                        //
                        encryptStorage.setItem('sessionCodeID', JSON.stringify(session_created));
                        encryptStorage.setItem('sessionCodeEX', JSON.stringify(sessionCode.expire));
                        window.setTimeout(function(){
                            // Move to a new location or you can do something else
                            window.location.href = `${import.meta.env.VITE_MAIN_URL}/reservation?sessionCodeID=${encodeURIComponent(localStorage.getItem('sessionCodeID'))}&sessionCodeEX=${encodeURIComponent(localStorage.getItem('sessionCodeEX'))}`;
                        }, 3000);
                    }
                }).catch((error) => {
                    //
                    console.log(error)
                });

            } else if (diffMins <= 0) {

                var sessionCode = {
                    id: new Date().getFullYear().toString()+(new Date().getMonth()+1).toString().padStart(2, "0")+new Date().getDate().toString().padStart(2, "0")+new Date().getMinutes().toString().padStart(2, "0")+new Date().getMilliseconds().toString().padStart(2, "0")+Math.floor(Math.random()*(999-100+1)+100).toString().substring(1),
                    expire: new Date(dateTimeNow.getTime() + 15*60000)
                }

                axios.post('/api/check-session', {
                    id: '08993011870',
                    ex: sessionCode.expire
                }).then((response) => {
                    //
                    let session_active = response.data.session_active;
                    let session_created = response.data.session_created;
                    if (session_active >= 100) {
                        //
                        alert(session_active);
                    } else {
                        //
                        window.setTimeout(function(){
                            // Move to a new location or you can do something else
                            window.location.href = `${import.meta.env.VITE_MAIN_URL}/reservation?sessionCodeID=${encodeURIComponent(localStorage.getItem('sessionCodeID'))}&sessionCodeEX=${encodeURIComponent(localStorage.getItem('sessionCodeEX'))}`;
                        }, 3000);
                    }
                }).catch((error) => {
                    //
                    console.log(error)
                });
            }

        } else{
            var dateTimeNow = new Date();
            var sessionCode = {
                id: new Date().getFullYear().toString()+(new Date().getMonth()+1).toString().padStart(2, "0")+new Date().getDate().toString().padStart(2, "0")+new Date().getMinutes().toString().padStart(2, "0")+new Date().getMilliseconds().toString().padStart(2, "0")+Math.floor(Math.random()*(999-100+1)+100).toString().substring(1),
                expire: new Date(dateTimeNow.getTime() + 15*60000)
            }
            axios.post('/api/check-session', {
                id: sessionCode.id,
                ex: sessionCode.expire
            }).then((response) => {
                //
                let session_active = response.data.session_active;
                let session_created = response.data.session_created;
                if (session_active >= 500) {
                    //
                    // alert(session_active);
                    window.location.href = `${import.meta.env.VITE_MAIN_URL}/busy`;
                } else {
                    //
                    encryptStorage.setItem('sessionCodeID', JSON.stringify(session_created));
                    encryptStorage.setItem('sessionCodeEX', JSON.stringify(sessionCode.expire));
                    window.setTimeout(function(){
                        // Move to a new location or you can do something else
                        window.location.href = `${import.meta.env.VITE_MAIN_URL}/reservation?sessionCodeID=${encodeURIComponent(localStorage.getItem('sessionCodeID'))}&sessionCodeEX=${encodeURIComponent(localStorage.getItem('sessionCodeEX'))}`;
                    }, 3000);
                }
            }).catch((error) => {
                //
                console.log(error)
            });
        }
    }, []);

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
                            <Box
                            sx={{
                                marginTop: '30px',
                            }}>
                                <CircularProgress/>
                            </Box>
                            <Box>
                                <Typography
                                className={customStyle.loading}
                                sx={{
                                    fontSize: '18px',
                                    color: 'white.main',
                                    marginTop: '10px',
                                }}>
                                    Checking session for online reservation...
                                </Typography>
                            </Box>
                        </Grid>

                    </div>
                </Fade>
            </ThemeProvider>
        </>
    )
}
