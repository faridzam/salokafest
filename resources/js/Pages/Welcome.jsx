import React from 'react';
import { Head } from '@inertiajs/react';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import {useMediaQuery, Box, Typography, Zoom, Paper, Stack, Snackbar, Alert} from '@mui/material';
import {Helmet} from "react-helmet";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {} from "swiper";
// Import Swiper styles
import "swiper/css";

import {getImageByID} from "../assets/images/events";
import {mediaBanner} from '../assets/images/banner';
import {SwiperPilihEvent, PilihTicket} from '../Components/Reservation';
import { theme } from "../utils/theme";
import axios from 'axios';
import { EncryptStorage } from 'encrypt-storage';

//countdown component
import CountdownTimer from '../Components/Reservation/CountdownTimer';

export const encryptStorage = new EncryptStorage('@encryptedByZam', {
    // storageType: 'sessionStorage',
});

export default function Welcome(props) {

    //media query
    const desktop = useMediaQuery(theme.breakpoints.up('laptop'));
    const [media, setMedia] = React.useState(null);
    const [isMounted, setIsMounted] = React.useState(false);
    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    const [sessionID, setSessionID] = React.useState(false);
    const [sessionEX, setSessionEX] = React.useState(false);
    React.useEffect(() => {
        // query params
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionCodeIDParams = urlParams.get('sessionCodeID');
        const sessionCodeEXParams = urlParams.get('sessionCodeEX');

        if(sessionCodeIDParams){
            setSessionID(encryptStorage.decryptValue(decodeURIComponent(sessionCodeIDParams)))
        } else {
            // redirect to salokapark.com
        }

        if(sessionCodeEXParams){
            //
            var countDownInMinutes = new Date(encryptStorage.decryptValue(decodeURIComponent(sessionCodeEXParams))).getTime();
            setSessionEX(countDownInMinutes);
        } else {
            //redirect to salokapark.com
        }
    }, []);

    React.useEffect(() => {
        if(desktop){
            var med = "desktop";
            if (media) {
                if (med === media) {
                    //
                } else if(med !== media){
                    window.location.reload();
                } else {
                    setMedia(med)
                }
            } else {
                setMedia(med)
            }
        } else{
            var med = "mobile";
            if (media) {
                if (med === media) {
                    //
                } else if(med !== media){
                    window.location.reload();
                } else {
                    setMedia(med)
                }
            } else {
                setMedia(med)
            }
        }
    }, [desktop]);

    const [selectedEvent, setSelectedEvent] = React.useState(
        {
            id: 1,
            description: 'ini description',
        }
    );
    const [selectedTicket, setSelectedTicket] = React.useState([]);
    const [selectedTicketID, setSelectedTicketID] = React.useState(null);
    const [arrivalDate, setArrivalDate] = React.useState(new Date());
    const getSelectedEvent = (data) => {
        slideTo(1);
        setSelectedEvent(data);

        var from = data.date.split("-");
        var numberFrom = [];
        for (var index = 0; index < from.length; index++) {
            numberFrom.push(parseInt(from[index]));
        }
        var to = new Date(numberFrom[0], numberFrom[1]-1, numberFrom[2], 0, 0, 0, 0);
        setArrivalDate(to);
    }
    const addSelectedTicket = async (data) => {

        // check stock
        await axios.post('/api/check-available-stock', {
            ticket_id: data.id,
        }).then((response) => {
            let stock_available = response.data.stock_available;
            let stock_pending = response.data.stock_pending;
            let stock_bought = response.data.stock_bought;
            if(selectedTicket.filter(e => e.id === data.id).length <= 0){
                if (selectedTicketID === null || selectedTicketID === data.id) {
                    let totalQuantity = 0;
                    selectedTicket.forEach((ticket, index) => {
                        totalQuantity += ticket.qty;
                    });
                    if (totalQuantity >= 10) {
                        //
                    } else if (stock_available <= 0) {
                        //
                    } else {
                        data.qty = 1;
                        data.stock_available = stock_available;
                        data.stock_pending = stock_pending;
                        data.stock_bought = stock_bought;
                        setSelectedTicket(oldState => [...oldState, data]);
                        setSelectedTicketID(data.id);
                    }
                } else {
                    handleOpenMultipleTicketAlert();
                }
            } else if (selectedTicket.filter(e => e.id === data.id).length > 0) {
                let oldState = [...selectedTicket];
                let index = oldState.findIndex(e => e.id === data.id);

                let totalQuantity = 0;
                selectedTicket.forEach((ticket, index) => {
                    totalQuantity += ticket.qty;
                });

                if (selectedTicketID === data.id) {
                    if (totalQuantity >= 10) {
                        oldState[index].stock_available = stock_available;
                        oldState[index].stock_pending = stock_pending;
                        oldState[index].stock_bought = stock_bought;
                        setSelectedTicket(oldState);
                        handleOpenMaxQuantityAlert();
                    } else if (stock_available <= oldState[index].qty) {
                        oldState[index].qty = stock_available;
                        oldState[index].stock_available = stock_available;
                        oldState[index].stock_pending = stock_pending;
                        oldState[index].stock_bought = stock_bought;
                        setSelectedTicket(oldState);
                        handleOpenStockAlert();
                    } else if(stock_available === 0){
                        oldState[index].qty = stock_available;
                        oldState[index].stock_available = stock_available;
                        oldState[index].stock_pending = stock_pending;
                        oldState[index].stock_bought = stock_bought;
                        setSelectedTicket(oldState);
                        handleOpenStockAlert();
                    } else {
                        oldState[index].qty+=1;
                        oldState[index].stock_available = stock_available;
                        oldState[index].stock_pending = stock_pending;
                        oldState[index].stock_bought = stock_bought;
                        setSelectedTicket(oldState);
                    }
                } else {
                    handleOpenMultipleTicketAlert();
                }
            } else {
                console.log("error")
            }
        }).catch((error) => {
            console.log(error)
        });
        //

    }
    const subSelectedTicket = async (data) => {
        // check stock
        await axios.post('/api/check-available-stock', {
            ticket_id: data.id,
        }).then((response) => {
            let stock_available = response.data.stock_available;
            let stock_pending = response.data.stock_pending;
            let stock_bought = response.data.stock_bought;
            if(selectedTicket.filter(e => e.id === data.id).length <= 0){
                //
            } else if (selectedTicket.filter(e => e.id === data.id).length > 0) {
                let oldState = [...selectedTicket]; // copying the old datas array
                let index = oldState.findIndex(e => e.id === data.id);
                if (oldState[index].qty <= 1) {
                    // oldState.splice(index, 1);
                    // setSelectedTicket(oldState);
                    setSelectedTicket([]);
                    setSelectedTicketID(null);
                } else if(stock_available === 0){
                    // oldState[index].qty=stock_available;
                    // oldState[index].stock_available = stock_available;
                    // oldState[index].stock_pending = stock_pending;
                    // oldState[index].stock_bought = stock_bought;
                    // setSelectedTicket(oldState);
                    
                    // oldState.splice(index, 1);
                    setSelectedTicket([]);
                    setSelectedTicketID(null);
                    handleOpenStockAlert();
                } else if (stock_available <= oldState[index].qty) {
                    oldState[index].qty=stock_available;
                    oldState[index].stock_available = stock_available;
                    oldState[index].stock_pending = stock_pending;
                    oldState[index].stock_bought = stock_bought;
                    setSelectedTicket(oldState);
                    handleOpenStockAlert();
                } else {
                    oldState[index].qty-=1;
                    oldState[index].stock_available = stock_available;
                    oldState[index].stock_pending = stock_pending;
                    oldState[index].stock_bought = stock_bought;
                    setSelectedTicket(oldState);
                }
            } else {
                console.log("error")
            }
        }).catch((error) => {
            console.log(error)
        });
    }

    const [totalBill, setTotalBill] = React.useState(0);
    React.useEffect(() => {
            let subtotal = 0;
            selectedTicket.forEach((ticket, index) => {
                subtotal += ticket.price * ticket.qty;
            });
            setTotalBill(subtotal)
    }, [selectedTicket])

    const [swiper, setSwiper] = React.useState(0);
    const slideTo = (index) => swiper.slideTo(index);

    const conditionalSwiperDesktopStyle = () => {
        let style = {};
        switch (swiper.activeIndex) {
            case 0:
                style = {
                    maxHeight: '40vh',
                    minHeight: '350px',
                    transition: 'all .5s ease-in-out',
                }
                break;
            case 1:
                style = {
                    maxHeight: '40vh',
                    minHeight: '350px',
                    transition: 'all .5s ease-in-out',
                }
                break;
            default:
                style = {
                    maxHeight: '43vh',
                    transition: 'all .5s ease-in-out',
                }
                break;
        }
        return style;
    }
    const conditionalSwiperMobileStyle = () => {
        let style = {};
        switch (swiper.activeIndex) {
            case 0:
                style = {
                    maxHeight: '350px',
                    transition: 'all .5s ease-in-out',
                }
                break;
            case 1:
                style = {
                    height: '550px',
                    transition: 'all .5s ease-in-out',
                }
                break;
            default:
                style = {
                    maxHeight: '350px',
                    transition: 'all .5s ease-in-out',
                }
                break;
        }
        return style;
    }

    // alert
    const [openStockAlert, setOpenStockAlert] = React.useState(false);
    const [openMaxQuantityAlert, setOpenMaxQuantityAlert] = React.useState(false);
    const [openMultipleTicketAlert, setOpenMultipleTicketAlert] = React.useState(false);

    // handle stock alert
    const handleOpenStockAlert = () => {
        setOpenStockAlert(true);
    };
    const handleCloseStockAlert = (event, reason) => {
        if (reason === 'clickaway') {
            setOpenStockAlert(false)
        }
        setOpenStockAlert(false);
    };

    // handle quantity alert
    const handleOpenMaxQuantityAlert = () => {
        setOpenMaxQuantityAlert(true);
    };
    const handleCloseMaxQuantityAlert = (event, reason) => {
        if (reason === 'clickaway') {
            setOpenMaxQuantityAlert(false)
        }
        setOpenMaxQuantityAlert(false);
    };
    
    // handle Multiple Ticket Alert
    const handleOpenMultipleTicketAlert = () => {
        setOpenMultipleTicketAlert(true);
    };
    const handleCloseMultipleTicketAlert = (event, reason) => {
        if (reason === 'clickaway') {
            setOpenMultipleTicketAlert(false)
        }
        setOpenMultipleTicketAlert(false);
    };

    return (
        <>
            <Head title="Reservation"/>
            {/* alert */}
            <Stack spacing={2} sx={{ width: '100%', zIndex: '10003' }}>
                <Snackbar
                sx={{
                    zIndex: '10003',
                }}
                anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
                open={openStockAlert}
                autoHideDuration={6000}
                onClose={handleCloseStockAlert}>
                    <Alert onClose={handleCloseStockAlert} severity="error" sx={{ width: '100%', zIndex: '10003' }}>
                        Stok ticket tidak mencukupi!
                    </Alert>
                </Snackbar>
                <Snackbar
                sx={{
                    zIndex: '10003',
                }}
                anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
                open={openMaxQuantityAlert}
                autoHideDuration={6000}
                onClose={handleCloseMaxQuantityAlert}>
                    <Alert onClose={handleCloseMaxQuantityAlert} severity="warning" sx={{ width: '100%', zIndex: '10003' }}>
                        Maksimal pembelian 10 tiket
                    </Alert>
                </Snackbar>
                <Snackbar
                sx={{
                    zIndex: '10003',
                }}
                anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
                open={openMultipleTicketAlert}
                autoHideDuration={6000}
                onClose={handleCloseMultipleTicketAlert}>
                    <Alert onClose={handleCloseMultipleTicketAlert} severity="warning" sx={{ width: '100%', zIndex: '10003' }}>
                        Pembelian berlaku untuk 1 jenis tiket
                    </Alert>
                </Snackbar>
            </Stack>
            <Zoom
            in={isMounted}
            timeout={1500}
            style={{ transitionDelay: isMounted ? '500ms' : '0ms' }}>
                <div>
                    {
                        desktop
                        ?
                        <Grid
                        key={"home-desktop"}
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
                            {
                                sessionEX
                                ?
                                <Box
                                sx={{
                                    position: 'absolute',
                                    zIndex: '10002',
                                    top: '0',
                                    right: '0',
                                }}>
                                    <CountdownTimer targetDate={sessionEX}/>
                                </Box>
                                :
                                <Box
                                sx={{
                                    position: 'absolute',
                                    zIndex: '10002',
                                    width: '100%',
                                    top: '0',
                                }}>
                                    <Box
                                    sx={{
                                        width: '100%',
                                        paddingY: '10px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#f1241b',
                                    }}>
                                        <Typography
                                        sx={{
                                        fontSize: '28px',
                                        fontWeight: 600
                                        }}>NO SESSION!!!</Typography>
                                    </Box>
                                </Box>
                            }
                            {/* header */}
                            {/* <Box
                            sx={{
                                position: 'sticky',
                                zIndex: '1002',
                                width: '100%',
                                top: '0',
                            }}>
                                <Header/>
                            </Box> */}

                            {/* banner image background */}
                            {/* <Box
                            sx={{
                                height: '100vh',
                                width: '100vw',
                                overflow: 'hidden',
                            }}>
                            <img
                                src={mediaBanner[1]}
                                alt="banner_salokafest"
                                loading="lazy"
                                style={
                                    swiper.activeIndex === 0
                                    ?
                                    {
                                        layout: 'fill',
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                        width: '100%',
                                        height: '100%',
                                        transition: 'all .5s ease-in-out',
                                    }
                                    :
                                    {
                                        layout: 'fill',
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                        width: '100%',
                                        height: '100%',
                                        filter: 'blur(2px)',
                                        transform: 'scale(1.05)',
                                        transition: 'all .5s ease-in-out',
                                    }

                                }></img>
                            </Box> */}

                            {/* banner image top */}
                            <Box
                            sx={{
                                width: '100%',
                                height: '60vh',
                            }}>
                                <img
                                style={{
                                    layout: 'fill',
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    width: '100%',
                                    height: '100%',
                                }}
                                // src={selectedEvent.image ? `${import.meta.env.VITE_MAIN_URL+selectedEvent.image}` : mediaBanner[1]}
                                src={selectedEvent.image ? getImageByID(selectedEvent.id).image : mediaBanner[1]}
                                alt="main-banner"/>
                            </Box>

                            {/* content */}
                            <Box
                            sx={{
                                position: 'absolute',
                                bottom: '0px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                            }}>
                                <Paper
                                elevation={5}
                                sx={{
                                    width: '100%',
                                    borderRadius: '0 0 0 0',
                                    padding: '20px',
                                }}>
                                    <Swiper
                                    style={conditionalSwiperDesktopStyle()}
                                    onSwiper={setSwiper}
                                    touchMoveStopPropagation={false}
                                    allowTouchMove={false}
                                    direction={"vertical"}
                                    slidesPerView={1}
                                    slidesPerGroup={1}>
                                        <SwiperSlide>
                                            <Grid
                                            container={true}
                                            direction="column"
                                            spacing={0}
                                            sx={{
                                                display: 'flex',
                                                width: '100%',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                <Box
                                                sx={{
                                                    width: '90%',
                                                }}>
                                                    <Typography
                                                    sx={{
                                                        fontSize: '14px',
                                                    }}
                                                    textAlign={'center'}>
                                                        Saloka Theme Park presents : Saloka Fest – Music & Art 2023
                                                        Konser Festival bertema Music & Art ini akan dilaksanakan selama 4 hari, dari tanggal 22 – 25 Juni
                                                        2023. Deretan artis papan atas seperti Dewa 19, Kahitna, Shaggydog dan artis besar lain nya akan
                                                        memberikan performa terbaik nya di Saloka Fest ini. So, don’t miss it !!
                                                        Cek menu di bawah untuk link pembelian tiket nya !
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <SwiperPilihEvent
                                            func={getSelectedEvent}/>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <PilihTicket
                                            sessionID = {sessionID}
                                            selectedEvent={selectedEvent}
                                            arrivalDate={arrivalDate}
                                            addTicket={addSelectedTicket}
                                            subTicket={subSelectedTicket}
                                            selectedTicket={selectedTicket}
                                            totalBill={totalBill}/>
                                        </SwiperSlide>
                                    </Swiper>
                                </Paper>
                            </Box>
                        </Grid>
                        :
                        <Grid
                        key={"home-mobile"}
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
                            {
                                sessionEX
                                ?
                                <Box
                                sx={{
                                    position: 'absolute',
                                    zIndex: '10002',
                                    top: '0',
                                }}>
                                    <CountdownTimer targetDate={sessionEX}/>
                                </Box>
                                :
                                <Box
                                sx={{
                                    position: 'absolute',
                                    zIndex: '10002',
                                    width: '100%',
                                    top: '0',
                                }}>
                                    <Box
                                    sx={{
                                        width: '100%',
                                        paddingY: '10px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#f1241b',
                                    }}>
                                        <Typography
                                        sx={{
                                        fontSize: '28px',
                                        fontWeight: 600
                                        }}>NO SESSION!!!</Typography>
                                    </Box>
                                </Box>
                            }

                            {/* header */}
                            {/* <Box
                            sx={{
                                position: 'sticky',
                                zIndex: '1002',
                                width: '100%',
                                top: '0',
                            }}>
                                <Header/>
                            </Box> */}

                            {/* banner image */}
                            <Box
                            sx={{
                                height: '50vh',
                                width: '100vw',
                                overflow: 'hidden',
                            }}>
                                <img
                                // src={selectedEvent.image ? `${import.meta.env.VITE_MAIN_URL+selectedEvent.image}` : mediaBanner[1]}
                                src={selectedEvent.image ? getImageByID(selectedEvent.id).image : mediaBanner[1]}
                                alt="banner_salokafest"
                                loading="lazy"
                                style={
                                    {
                                        layout: 'fill',
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                        width: '100%',
                                        height: '100%',
                                        transition: 'all .5s ease-in-out',
                                    }
                                }></img>
                            </Box>

                            {/* content */}
                            <Box
                            sx={{
                                position: 'absolute',
                                bottom: '0',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                            }}>
                                <Paper
                                sx={{
                                    width: '100%',
                                    borderRadius: '30px 30px 0 0',
                                    padding: '20px',
                                }}>
                                    <Swiper
                                    style={conditionalSwiperMobileStyle()}
                                    onSwiper={setSwiper}
                                    touchMoveStopPropagation={false}
                                    allowTouchMove={false}
                                    direction={"vertical"}
                                    slidesPerView={1}
                                    slidesPerGroup={1}>
                                        <SwiperSlide>
                                            <SwiperPilihEvent
                                            func={getSelectedEvent}/>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <PilihTicket
                                            sessionID = {sessionID}
                                            selectedEvent={selectedEvent}
                                            arrivalDate={arrivalDate}
                                            addTicket={addSelectedTicket}
                                            subTicket={subSelectedTicket}
                                            selectedTicket={selectedTicket}
                                            totalBill={totalBill}/>
                                        </SwiperSlide>
                                    </Swiper>
                                </Paper>
                            </Box>
                        </Grid>
                    }
                </div>
            </Zoom>
            {/* sandbox */}
            {/* <Helmet>
                <script type="text/javascript"
                src="https://app.sandbox.midtrans.com/snap/snap.js"
                data-client-key="SB-Mid-client-nxEqAslc-ufQu9az"></script>
            </Helmet> */}
            {/* production */}
            <Helmet>
                <script type="text/javascript"
                src="https://app.midtrans.com/snap/snap.js"
                data-client-key="Mid-client-lYBi_CM3a6fBcx3w"></script>
            </Helmet>
        </>
    );
}
