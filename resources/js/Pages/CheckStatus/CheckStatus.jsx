import React from 'react';
import { Head } from '@inertiajs/react';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import {useMediaQuery, Box, Typography, Zoom, Paper, Slide, Button, TextField} from '@mui/material';
import {Search} from '@mui/icons-material';
import { router, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { EncryptStorage } from 'encrypt-storage';
import styles from './checkStatus.module.css';

import {media} from '../../assets/images';
import {mediaBanner} from '../../assets/images/banner';
import {mediaLoka} from '../../assets/images/loka';
import { Header, Footer, ToTopButton} from '../../Components';
import {SwiperPilihEvent, PilihTicket} from '../../Components/Reservation';
import { theme } from "../../utils/theme";
import { ThemeProvider } from '@emotion/react';

import { useStateWithCallbackLazy } from 'use-state-with-callback';

import {Helmet} from "react-helmet";

export default function CheckStatus(props) {

    console.log(props);

    const desktop = useMediaQuery(theme.breakpoints.up('laptop'));

    const { reservations } = usePage().props;
    // Laravel's pagination data object = data
    const [query, setQuery] = React.useState({
        search: props.filter.search,
        selectedID: props.filter.selectedID
    });

    const [selectedReservation, setSelectedReservation] = React.useState({
        id: 0,
        bill: 0,
        status: '',
    });
    const [selectedReservationDetail, setSelectedReservationDetail] = React.useState();

    const setAsyncState = (newState) => new Promise((resolve) => setQuery(newState, resolve));

    const selectReservation = async (id) => {
        setSelectedReservation({
            id: id,
            bill: 0,
            status: '',
        });

        await setAsyncState({
            search: props.filter.search,
            selectedID: id
        })
        .then(
            router.get(
                '/check-status', {
                    search: props.filter.search,
                    selectedID: id
                },
                {
                    preserveState: true,
                    replace: true,
                },
            )
        ).finally(
            setSelectedReservationDetail(props.reservationDetail)
        )
        .catch(err => console.error(err))
    }
        
    // React.useEffect(() => {
    //     router.get(
    //         '/check-status', query,
    //         {
    //             preserveState: true,
    //             replace: true,
    //         },
    //     );
    // }, [selectedReservation]);
    
    const search = (e) => {

        router.get(
            '/check-status', query,
            {
                preserveState: true,
                replace: true,
            },
        );
    }

    const handleBayar = async (e, token) => {
        e.preventDefault();
        window.snap.pay(
            token,
            {
                onSuccess: function(result){
                    console.log('success');console.log(result);
                },
                onPending: function(result){
                    console.log('pending');console.log(result);
                },
                onError: function(result){
                    console.log('error');console.log(result);
                },
                onClose: function(){
                    console.log('customer closed the popup without finishing the payment');
                }
            }
        )
    }

    return (
        <>
            <Head title="Check Status"/>
            <ThemeProvider
            theme={theme}>
                {
                    desktop
                    ?
                    <Grid
                    key={"check-status-desktop"}
                    container={true}
                    direction="column"
                    spacing={0}
                    sx={{
                        display: 'flex',
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Grid
                        container={true}
                        direction="row"
                        spacing={0}
                        sx={{
                            display: 'flex',
                            width: '100%',
                            height: '100%',
                            margin: '10px',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Paper
                            elevation={2}
                            sx={{
                                display: 'flex',
                                width: '60%',
                                height: '100%',
                            }}>
                                <Grid
                                container={true}
                                direction="column"
                                spacing={0}
                                sx={{
                                    display: 'flex',
                                    width: '100%',
                                    height: '100%',
                                    margin: '10px',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    {/* search bar */}
                                    <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}>
                                        <TextField
                                        value={query.search}
                                        onChange={(e) => setQuery({
                                            search: e.target.value,
                                            selectedID: props.filter.selectedID
                                        })}
                                        placeholder="email"
                                        sx={{
                                            width: '50%',
                                            margin: 0,
                                            padding: 0,
                                            backgroundColor: '#eee',
                                            border: 'solid 0px',
                                            borderBottomLeftRadius: '50px',
                                            borderTopLeftRadius: '50px',
                                            borderBottomRightRadius: '50px',
                                            borderTopRightRadius: '50px',
                                            '&:hover fieldset': {
                                                border: 'solid 0px',
                                            },
                                            'fieldset': {
                                                border: 'solid 0px',
                                            },
                                            "& .MuiOutlinedInput-root.Mui-focused": {
                                                "& > fieldset": {
                                                    border: "solid 0px",
                                                }
                                            },
                                            "& .MuiOutlinedInput-root": {
                                                paddingRight: '0px',
                                                fontFamily: 'AlrightSans',
                                                fontSize: '16px',
                                                fontWeight: 600,
                                            },
                                        }}
                                        InputProps={{
                                            endAdornment:
                                                <Button
                                                onClick={search}
                                                variant="contained"
                                                color='secondary'
                                                sx={{
                                                    margin: 0,
                                                    padding: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    borderBottomLeftRadius: '50px',
                                                    borderTopLeftRadius: '50px',
                                                    borderBottomRightRadius: '50px',
                                                    borderTopRightRadius: '50px',
                                                }}>

                                                    <Search
                                                    sx={{
                                                        color: '#eee',
                                                    }}/>
                                                    <Typography
                                                    sx={{
                                                        marginX: '5px',
                                                        fontSize: '18px',
                                                        fontWeight: 400,
                                                        color: '#eee'
                                                    }}
                                                    >Search</Typography>

                                                </Button>
                                        }}>
                                        </TextField>
                                    </Box>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid
                        container={true}
                        direction="row"
                        spacing={3}
                        sx={{
                            display: 'flex',
                            width: '100%',
                            height: '80vh',
                            marginTop: '50px',
                            justifyContent: 'space-evenly',
                            alignItems: 'center'
                        }}>
                            {/* left container */}
                            <Paper
                            elevation={3}
                            sx={{
                                width: '45%',
                                height: '100%'
                            }}>
                                <Grid
                                container={true}
                                direction="column"
                                spacing={0}
                                sx={{
                                    display: 'flex',
                                    width: '100%',
                                    height: '100%',
                                    padding: '10px',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    {/* reservations */}
                                    <Grid
                                    container={true}
                                    direction="column"
                                    spacing={0}
                                    sx={{
                                        display: 'flex',
                                        width: '100%',
                                        height: '100%',
                                        padding: '10px',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center'
                                    }}>
                                        {reservations?.data?.map((reservation, index) => (
                                            <Paper
                                            key={`reservation-card-${index}`}
                                            className={`reservation-container ${selectedReservation.id === reservation.id ? styles.reservationContainerActive : ""} `}
                                            elevation={2}
                                            onClick={() => selectReservation(reservation.id)}
                                            sx={{
                                                width: '100%',
                                                padding: '10px',
                                                marginY: '5px',
                                                borderRadius: '30px',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    backgroundColor: 'secondary.lightest',
                                                },
                                            }}>
                                                <Grid
                                                container={true}
                                                direction="row"
                                                spacing={0}
                                                sx={{
                                                    display: 'flex',
                                                    width: '100%',
                                                    height: '100%',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center'
                                                }}>
                                                    <Grid
                                                    container={true}
                                                    direction="column"
                                                    spacing={0}
                                                    sx={{
                                                        display: 'flex',
                                                        height: '100%',
                                                        justifyContent: 'center',
                                                        alignItems: 'flex-start'
                                                    }}>
                                                        <Box>
                                                            <Typography
                                                            sx={{
                                                                fontSize: '14px',
                                                                fontWeight: 600
                                                            }}>
                                                                {reservation.order_id}
                                                            </Typography>
                                                        </Box>
                                                        <Box>
                                                            <Typography
                                                            sx={{
                                                                fontSize: '12px',
                                                                fontWeight: 450
                                                            }}>
                                                                {reservation.event.name}
                                                            </Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid
                                                    container={true}
                                                    direction="column"
                                                    spacing={0}
                                                    sx={{
                                                        display: 'flex',
                                                        height: '100%',
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}>
                                                        <Box>
                                                            <Typography
                                                            sx={{
                                                                fontSize: '18px',
                                                                fontWeight: 600
                                                            }}>
                                                                Rp. {reservation.bill.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                            </Typography>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        ))}
                                    </Grid>
                                </Grid>
                            </Paper>
                            {/* right container */}
                            <Paper
                            elevation={3}
                            sx={{
                                width: '45%',
                                height: '100%'
                            }}>
                                {
                                    selectedReservationDetail
                                    ?
                                    <Grid
                                    container={true}
                                    direction="column"
                                    spacing={0}
                                    sx={{
                                        display: 'flex',
                                        width: '100%',
                                        height: '100%',
                                        padding: '10px',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start'
                                    }}>
                                        {
                                            props.reservationDetail.status === 'created'
                                            ?
                                            <Box
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                            }}>
                                                <Grid
                                                container={true}
                                                direction="column"
                                                spacing={0}
                                                sx={{
                                                    display: 'flex',
                                                    width: '100%',
                                                    height: '100%',
                                                    padding: '10px',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                    <Typography
                                                    sx={{
                                                        fontSize: '18px',
                                                        fontWeight: 500
                                                    }}>
                                                        status: 
                                                    </Typography>
                                                    <Typography
                                                    sx={{
                                                        fontSize: '24px',
                                                        fontWeight: 600,
                                                        color: 'secondary.main'
                                                    }}>
                                                        {props.reservationDetail.status}
                                                    </Typography>
                                                    <Box
                                                    sx={{
                                                        marginTop: '10px'
                                                    }}>
                                                        <Button
                                                        variant='contained'
                                                        onClick={(e) => handleBayar(e, props.reservationDetail.snap_token)}>
                                                            <Typography
                                                            sx={{
                                                                fontSize: '14px',
                                                                fontWeight: 600
                                                            }}>
                                                                Bayar
                                                            </Typography>
                                                        </Button>
                                                    </Box>
                                                </Grid>
                                            </Box>
                                            :
                                            null
                                        }
                                        {
                                            props.reservationDetail.status === 'pending'
                                            ?
                                            <Box
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                            }}>
                                                <Grid
                                                container={true}
                                                direction="column"
                                                spacing={0}
                                                sx={{
                                                    display: 'flex',
                                                    width: '100%',
                                                    height: '100%',
                                                    padding: '10px',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                    <Typography
                                                    sx={{
                                                        fontSize: '18px',
                                                        fontWeight: 500
                                                    }}>
                                                        status: 
                                                    </Typography>
                                                    <Typography
                                                    sx={{
                                                        fontSize: '24px',
                                                        fontWeight: 600,
                                                        color: 'secondary.main'
                                                    }}>
                                                        {props.reservationDetail.status}
                                                    </Typography>
                                                    <Box
                                                    sx={{
                                                        marginTop: '10px'
                                                    }}>
                                                        <Button
                                                        variant='contained'
                                                        onClick={(e) => handleBayar(e, props.reservationDetail.snap_token)}>
                                                            <Typography
                                                            sx={{
                                                                fontSize: '14px',
                                                                fontWeight: 600
                                                            }}>
                                                                Bayar
                                                            </Typography>
                                                        </Button>
                                                    </Box>
                                                </Grid>
                                            </Box>
                                            :
                                            null
                                        }
                                        {
                                            props.reservationDetail.status === 'settlement'
                                            ?
                                            <Box
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                            }}>
                                                <Grid
                                                container={true}
                                                direction="column"
                                                spacing={0}
                                                sx={{
                                                    display: 'flex',
                                                    width: '100%',
                                                    height: '100%',
                                                    padding: '10px',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                    <Typography
                                                    sx={{
                                                        fontSize: '18px',
                                                        fontWeight: 500
                                                    }}>
                                                        status: 
                                                    </Typography>
                                                    <Typography
                                                    sx={{
                                                        fontSize: '24px',
                                                        fontWeight: 600,
                                                        color: 'primary.main'
                                                    }}>
                                                        {props.reservationDetail.status}
                                                    </Typography>
                                                </Grid>
                                            </Box>
                                            :
                                            null
                                        }
                                        {
                                            props.reservationDetail.status === 'expire'
                                            ?
                                            <Box
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                            }}>
                                                <Grid
                                                container={true}
                                                direction="column"
                                                spacing={0}
                                                sx={{
                                                    display: 'flex',
                                                    width: '100%',
                                                    height: '100%',
                                                    padding: '10px',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                    <Typography
                                                    sx={{
                                                        fontSize: '18px',
                                                        fontWeight: 500
                                                    }}>
                                                        status: 
                                                    </Typography>
                                                    <Typography
                                                    sx={{
                                                        fontSize: '24px',
                                                        fontWeight: 600,
                                                        color: 'red.main'
                                                    }}>
                                                        {props.reservationDetail.status}
                                                    </Typography>
                                                </Grid>
                                            </Box>
                                            :
                                            null
                                        }
                                    </Grid>
                                    :
                                    <Grid
                                    container={true}
                                    direction="column"
                                    spacing={0}
                                    sx={{
                                        display: 'flex',
                                        width: '100%',
                                        height: '100%',
                                        padding: '10px',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Box
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                        }}>
                                            <Typography
                                            sx={{
                                                fontSize: '18px',
                                                fontWeight: 600
                                            }}>
                                                Pesanan Belum Dipilih
                                            </Typography>
                                        </Box>
                                    </Grid>
                                }
                            </Paper>
                        </Grid>
                    </Grid>
                    :
                    <Grid
                    key={"check-status-desktop"}
                    container={true}
                    direction="column"
                    spacing={0}
                    sx={{
                        display: 'flex',
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Grid
                        container={true}
                        direction="row"
                        spacing={0}
                        sx={{
                            display: 'flex',
                            width: '100%',
                            height: '100%',
                            margin: '10px',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Paper
                            elevation={2}
                            sx={{
                                display: 'flex',
                                width: '100%',
                                height: '100%',
                            }}>
                                <Grid
                                container={true}
                                direction="column"
                                spacing={0}
                                sx={{
                                    display: 'flex',
                                    width: '100%',
                                    height: '100%',
                                    margin: '10px',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    {/* search bar */}
                                    <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}>
                                        <TextField
                                        value={query.search}
                                        onChange={(e) => setQuery({
                                            search: e.target.value,
                                            selectedID: props.filter.selectedID
                                        })}
                                        placeholder="email"
                                        sx={{
                                            width: '90%',
                                            margin: 0,
                                            padding: 0,
                                            backgroundColor: '#eee',
                                            border: 'solid 0px',
                                            borderBottomLeftRadius: '50px',
                                            borderTopLeftRadius: '50px',
                                            borderBottomRightRadius: '50px',
                                            borderTopRightRadius: '50px',
                                            '&:hover fieldset': {
                                                border: 'solid 0px',
                                            },
                                            'fieldset': {
                                                border: 'solid 0px',
                                            },
                                            "& .MuiOutlinedInput-root.Mui-focused": {
                                                "& > fieldset": {
                                                    border: "solid 0px",
                                                }
                                            },
                                            "& .MuiOutlinedInput-root": {
                                                paddingRight: '0px',
                                                fontFamily: 'AlrightSans',
                                                fontSize: '16px',
                                                fontWeight: 600,
                                            },
                                        }}
                                        InputProps={{
                                            endAdornment:
                                                <Button
                                                onClick={search}
                                                variant="contained"
                                                color='secondary'
                                                sx={{
                                                    margin: 0,
                                                    padding: 0,
                                                    height: '100%',
                                                    borderBottomLeftRadius: '50px',
                                                    borderTopLeftRadius: '50px',
                                                    borderBottomRightRadius: '50px',
                                                    borderTopRightRadius: '50px',
                                                }}>
                                                    <Search
                                                    sx={{
                                                        color: '#eee',
                                                    }}/>
                                                </Button>
                                        }}>
                                        </TextField>
                                    </Box>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid
                        container={true}
                        direction="column"
                        spacing={3}
                        sx={{
                            display: 'flex',
                            width: '90%',
                            marginTop: '50px',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}>
                            {/* left container */}
                            <Paper
                            elevation={3}
                            sx={{
                                width: '100%',
                                height: '100%'
                            }}>
                                <Grid
                                container={true}
                                direction="column"
                                spacing={0}
                                sx={{
                                    display: 'flex',
                                    width: '100%',
                                    height: '100%',
                                    padding: '10px',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    {/* reservations */}
                                    <Grid
                                    container={true}
                                    direction="column"
                                    spacing={0}
                                    sx={{
                                        display: 'flex',
                                        width: '100%',
                                        height: '100%',
                                        padding: '10px',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center'
                                    }}>
                                        {reservations?.data?.map((reservation, index) => (
                                            <Paper
                                            key={`reservation-card-${index}`}
                                            className={`reservation-container ${selectedReservation.id === reservation.id ? styles.reservationContainerActive : ""} `}
                                            elevation={2}
                                            onClick={() => selectReservation(reservation.id)}
                                            sx={{
                                                width: '100%',
                                                padding: '10px',
                                                marginY: '5px',
                                                borderRadius: '30px',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    backgroundColor: 'secondary.lightest',
                                                },
                                            }}>
                                                <Grid
                                                container={true}
                                                direction="row"
                                                spacing={0}
                                                sx={{
                                                    display: 'flex',
                                                    width: '100%',
                                                    height: '100%',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center'
                                                }}>
                                                    <Grid
                                                    container={true}
                                                    direction="column"
                                                    spacing={0}
                                                    sx={{
                                                        display: 'flex',
                                                        height: '100%',
                                                        justifyContent: 'center',
                                                        alignItems: 'flex-start'
                                                    }}>
                                                        <Box>
                                                            <Typography
                                                            sx={{
                                                                fontSize: '14px',
                                                                fontWeight: 600
                                                            }}>
                                                                {reservation.order_id}
                                                            </Typography>
                                                        </Box>
                                                        <Box>
                                                            <Typography
                                                            sx={{
                                                                fontSize: '12px',
                                                                fontWeight: 450
                                                            }}>
                                                                {reservation.event.name}
                                                            </Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid
                                                    container={true}
                                                    direction="column"
                                                    spacing={0}
                                                    sx={{
                                                        display: 'flex',
                                                        height: '100%',
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}>
                                                        <Box>
                                                            <Typography
                                                            sx={{
                                                                fontSize: '18px',
                                                                fontWeight: 600
                                                            }}>
                                                                Rp. {reservation.bill.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                            </Typography>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        ))}
                                    </Grid>
                                </Grid>
                            </Paper>
                            {/* right container */}
                            <Paper
                            elevation={3}
                            sx={{
                                marginTop: '10px',
                                width: '100%',
                                height: '100%'
                            }}>
                                {
                                    selectedReservationDetail
                                    ?
                                    <Grid
                                    container={true}
                                    direction="column"
                                    spacing={0}
                                    sx={{
                                        display: 'flex',
                                        width: '100%',
                                        height: '100%',
                                        padding: '10px',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start'
                                    }}>
                                        {
                                            props.reservationDetail.status === 'created'
                                            ?
                                            <Box
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                            }}>
                                                <Grid
                                                container={true}
                                                direction="column"
                                                spacing={0}
                                                sx={{
                                                    display: 'flex',
                                                    width: '100%',
                                                    height: '100%',
                                                    padding: '10px',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                    <Typography
                                                    sx={{
                                                        fontSize: '18px',
                                                        fontWeight: 500
                                                    }}>
                                                        status: 
                                                    </Typography>
                                                    <Typography
                                                    sx={{
                                                        fontSize: '24px',
                                                        fontWeight: 600,
                                                        color: 'secondary.main'
                                                    }}>
                                                        {props.reservationDetail.status}
                                                    </Typography>
                                                    <Box
                                                    sx={{
                                                        marginTop: '10px'
                                                    }}>
                                                        <Button
                                                        variant='contained'
                                                        onClick={(e) => handleBayar(e, props.reservationDetail.snap_token)}>
                                                            <Typography
                                                            sx={{
                                                                fontSize: '14px',
                                                                fontWeight: 600
                                                            }}>
                                                                Bayar
                                                            </Typography>
                                                        </Button>
                                                    </Box>
                                                </Grid>
                                            </Box>
                                            :
                                            null
                                        }
                                        {
                                            props.reservationDetail.status === 'pending'
                                            ?
                                            <Box
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                            }}>
                                                <Grid
                                                container={true}
                                                direction="column"
                                                spacing={0}
                                                sx={{
                                                    display: 'flex',
                                                    width: '100%',
                                                    height: '100%',
                                                    padding: '10px',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                    <Typography
                                                    sx={{
                                                        fontSize: '18px',
                                                        fontWeight: 500
                                                    }}>
                                                        status: 
                                                    </Typography>
                                                    <Typography
                                                    sx={{
                                                        fontSize: '24px',
                                                        fontWeight: 600,
                                                        color: 'secondary.main'
                                                    }}>
                                                        {props.reservationDetail.status}
                                                    </Typography>
                                                    <Box
                                                    sx={{
                                                        marginTop: '10px'
                                                    }}>
                                                        <Button
                                                        variant='contained'
                                                        onClick={(e) => handleBayar(e, props.reservationDetail.snap_token)}>
                                                            <Typography
                                                            sx={{
                                                                fontSize: '14px',
                                                                fontWeight: 600
                                                            }}>
                                                                Bayar
                                                            </Typography>
                                                        </Button>
                                                    </Box>
                                                </Grid>
                                            </Box>
                                            :
                                            null
                                        }
                                        {
                                            props.reservationDetail.status === 'settlement'
                                            ?
                                            <Box
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                            }}>
                                                <Grid
                                                container={true}
                                                direction="column"
                                                spacing={0}
                                                sx={{
                                                    display: 'flex',
                                                    width: '100%',
                                                    height: '100%',
                                                    padding: '10px',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                    <Typography
                                                    sx={{
                                                        fontSize: '18px',
                                                        fontWeight: 500
                                                    }}>
                                                        status: 
                                                    </Typography>
                                                    <Typography
                                                    sx={{
                                                        fontSize: '24px',
                                                        fontWeight: 600,
                                                        color: 'primary.main'
                                                    }}>
                                                        {props.reservationDetail.status}
                                                    </Typography>
                                                </Grid>
                                            </Box>
                                            :
                                            null
                                        }
                                        {
                                            props.reservationDetail.status === 'expire'
                                            ?
                                            <Box
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                            }}>
                                                <Grid
                                                container={true}
                                                direction="column"
                                                spacing={0}
                                                sx={{
                                                    display: 'flex',
                                                    width: '100%',
                                                    height: '100%',
                                                    padding: '10px',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                    <Typography
                                                    sx={{
                                                        fontSize: '18px',
                                                        fontWeight: 500
                                                    }}>
                                                        status: 
                                                    </Typography>
                                                    <Typography
                                                    sx={{
                                                        fontSize: '24px',
                                                        fontWeight: 600,
                                                        color: 'red.main'
                                                    }}>
                                                        {props.reservationDetail.status}
                                                    </Typography>
                                                </Grid>
                                            </Box>
                                            :
                                            null
                                        }
                                    </Grid>
                                    :
                                    <Grid
                                    container={true}
                                    direction="column"
                                    spacing={0}
                                    sx={{
                                        display: 'flex',
                                        width: '100%',
                                        height: '100%',
                                        padding: '10px',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Box
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                        }}>
                                            <Typography
                                            sx={{
                                                fontSize: '18px',
                                                fontWeight: 600
                                            }}>
                                                Pesanan Belum Dipilih
                                            </Typography>
                                        </Box>
                                    </Grid>
                                }
                            </Paper>
                        </Grid>
                    </Grid>
                }

            <Helmet>
                <script type="text/javascript"
                src="https://app.midtrans.com/snap/snap.js"
                data-client-key="Mid-client-lYBi_CM3a6fBcx3w"></script>
            </Helmet>
            </ThemeProvider>
        </>
    )
}