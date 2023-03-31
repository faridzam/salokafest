import React from 'react';
import { Head } from '@inertiajs/react';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import {useMediaQuery, Box, Typography, Zoom, Paper, Slide} from '@mui/material';
import { Cases } from '@mui/icons-material';
import { router } from '@inertiajs/react';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {} from "swiper";
// Import Swiper styles
import "swiper/css";

//import main swiper styles
import customStyle from '../Styles/mainSwiper.module.css'

import {media} from '../assets/images';
import {mediaBanner} from '../assets/images/banner';
import { Header, Footer, ToTopButton} from '../Components';
import {SwiperPilihEvent, PilihTicket} from '../Components/Reservation'
import { theme } from "../utils/theme";
import axios from 'axios';

export default function Welcome(props) {

    //media query
    const desktop = useMediaQuery(theme.breakpoints.up('laptop'));
    const [media, setMedia] = React.useState(null);
    const [isMounted, setIsMounted] = React.useState(false);

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

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    const [selectedEvent, setSelectedEvent] = React.useState(
        {
            description: 'ini description'
        }
    );
    const [selectedTicket, setSelectedTicket] = React.useState([]);
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
    const addSelectedTicket = (data) => {

        // check stock
        axios.post('/api/check-available-stock', {
            ticket_id: data.id,
        }).then((response) => {
            let stock_available = response.data.stock_available;
            let stock_pending = response.data.stock_pending;
            let stock_bought = response.data.stock_bought;
            if(selectedTicket.filter(e => e.id === data.id).length <= 0){

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
                }
            } else if (selectedTicket.filter(e => e.id === data.id).length > 0) {
                let oldState = [...selectedTicket]; // copying the old datas array
                let index = oldState.findIndex(e => e.id === data.id);

                let totalQuantity = 0;
                selectedTicket.forEach((ticket, index) => {
                    totalQuantity += ticket.qty;
                });

                if (totalQuantity >= 10) {
                    //
                    oldState[index].stock_available = stock_available;
                    oldState[index].stock_pending = stock_pending;
                    oldState[index].stock_bought = stock_bought;
                    setSelectedTicket(oldState);
                } else if (stock_available <= oldState[index].qty) {
                    oldState[index].qty = stock_available;
                    oldState[index].stock_available = stock_available;
                    oldState[index].stock_pending = stock_pending;
                    oldState[index].stock_bought = stock_bought;
                    setSelectedTicket(oldState);
                } else {
                    oldState[index].qty+=1;
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
        //

    }
    const subSelectedTicket = (data) => {

        // check stock
        axios.post('/api/check-available-stock', {
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
                    oldState.splice(index, 1);
                    setSelectedTicket(oldState);
                } else if (stock_available <= oldState[index].qty) {
                    oldState[index].qty=stock_available;
                    oldState[index].stock_available = stock_available;
                    oldState[index].stock_pending = stock_pending;
                    oldState[index].stock_bought = stock_bought;
                    setSelectedTicket(oldState);
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

    return (
        <>
            <Head title="Welcome"/>
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
                            {/* header */}
                            <Box
                            sx={{
                                position: 'sticky',
                                zIndex: '1002',
                                width: '100%',
                                top: '0',
                            }}>
                                <Header/>
                            </Box>

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
                                src={selectedEvent.image ? `http://127.0.0.1:8000${selectedEvent.image}` : mediaBanner[1]}
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
                                                    textAlign={'center'}>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt massa sit amet purus accumsan, non accumsan mi mattis. Cras gravida rutrum nulla, vitae fermentum dui semper sed. Duis non ipsum blandit, efficitur elit eget, consectetur dolor. Fusce faucibus scelerisque libero, et rutrum felis cursus sit amet
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <SwiperPilihEvent
                                            func={getSelectedEvent}/>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <PilihTicket
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
                            {/* header */}
                            <Box
                            sx={{
                                position: 'sticky',
                                zIndex: '1002',
                                width: '100%',
                                top: '0',
                            }}>
                                <Header/>
                            </Box>

                            {/* banner image */}
                            <Box
                            sx={{
                                height: '50vh',
                                width: '100vw',
                                overflow: 'hidden',
                            }}>
                            <img
                                src={selectedEvent.image ? `http://127.0.0.1:8000${selectedEvent.image}` : mediaBanner[1]}
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
        </>
    );
}
