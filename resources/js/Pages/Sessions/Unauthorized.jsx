import React from 'react';
import { Head } from '@inertiajs/react';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import {useMediaQuery, Box, Typography, Zoom, Paper, Slide, Button} from '@mui/material';
import {} from '@mui/icons-material';
import { router } from '@inertiajs/react';
import axios from 'axios';
import { EncryptStorage } from 'encrypt-storage';

import {media} from '../../assets/images';
import {mediaBanner} from '../../assets/images/banner';
import {mediaLoka} from '../../assets/images/loka';
import { Header, Footer, ToTopButton} from '../../Components';
import {SwiperPilihEvent, PilihTicket} from '../../Components/Reservation'
import { theme } from "../../utils/theme";

export default function Unauthorized(props) {

    const desktop = useMediaQuery(theme.breakpoints.up('laptop'));

    // is mounted
    const [isMounted, setIsMounted] = React.useState(false);
    React.useEffect(() => {
        setIsMounted(true);
    }, []);


    return(
        <>
            <Head title="Unauthorized"/>
            <Zoom
            in={isMounted}
            timeout={1500}
            style={{ transitionDelay: isMounted ? '500ms' : '0ms' }}>
                {
                    desktop
                    ?
                    <Grid
                    key={"unauthorized-desktop"}
                    container={true}
                    direction="column"
                    spacing={0}
                    sx={{
                        display: 'flex',
                        width: '100vw',
                        height: '100vh',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Box>
                            <Typography
                            sx={{
                                fontSize: '24px',
                                fontWeight: 600
                            }}>
                                {props.title}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                            sx={{
                                fontSize: '18px',
                                fontWeight: 400
                            }}>
                                {props.subtitle}
                            </Typography>
                        </Box>
                        <Box
                        sx={{
                            width: '300px',
                            marginY: '20px',
                            marginRight: '30px',
                        }}>
                            <img src={mediaLoka[3]} alt="loka" />
                        </Box>
                        <Box>
                            <Typography
                            sx={{
                                fontSize: '18px',
                                fontWeight: 400
                            }}>
                                {props.text1}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                            sx={{
                                fontSize: '18px',
                                fontWeight: 400
                            }}>
                                {props.text2}
                            </Typography>
                        </Box>
                        {
                            props.id === 1
                            ?
                            <Box>
                                <Button
                                onClick={() => window.location.href = 'https://salokafest.salokapark.com'}>link pembelian</Button>
                            </Box>
                            :
                            null
                        }
                        {
                            props.id === 2
                            ?
                            <Box>
                                <Button
                                onClick={() => window.location.href = 'https://salokafest.salokapark.com'}>link pembelian</Button>
                            </Box>
                            :
                            null
                        }
                        {
                            props.id === 3
                            ?
                            <Box>
                                <Button
                                onClick={() => window.location.href = 'https://salokafest.salokapark.com'}>link pembelian</Button>
                            </Box>
                            :
                            null
                        }
                    </Grid>
                    :
                    <Grid
                    key={"unauthorized-desktop"}
                    container={true}
                    direction="column"
                    spacing={0}
                    sx={{
                        display: 'flex',
                        width: '100vw',
                        height: '100vh',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Box>
                            <Typography
                            sx={{
                                fontSize: '24px',
                                fontWeight: 600
                            }}>
                                {props.title}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                            sx={{
                                fontSize: '18px',
                                fontWeight: 400
                            }}>
                                {props.subtitle}
                            </Typography>
                        </Box>
                        <Box
                        sx={{
                            width: '300px',
                            marginY: '20px',
                            marginRight: '30px',
                        }}>
                            <img src={mediaLoka[3]} alt="loka" />
                        </Box>
                        <Box>
                            <Typography
                            sx={{
                                fontSize: '18px',
                                fontWeight: 400
                            }}>
                                {props.text1}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                            sx={{
                                fontSize: '18px',
                                fontWeight: 400
                            }}>
                                {props.text2}
                            </Typography>
                        </Box>
                        {
                            props.id === 1
                            ?
                            <Box>
                                <Button
                                onClick={() => window.location.href = 'https://salokafest.salokapark.com'}>link pembelian</Button>
                            </Box>
                            :
                            null
                        }
                        {
                            props.id === 2
                            ?
                            <Box>
                                <Button
                                onClick={() => window.location.href = 'https://salokafest.salokapark.com'}>link pembelian</Button>
                            </Box>
                            :
                            null
                        }
                        {
                            props.id === 3
                            ?
                            <Box>
                                <Button
                                onClick={() => window.location.href = 'https://salokafest.salokapark.com'}>link pembelian</Button>
                            </Box>
                            :
                            null
                        }
                    </Grid>
                }
            </Zoom>
        </>
    );
}