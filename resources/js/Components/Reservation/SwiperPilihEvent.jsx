import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
//
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../utils/theme";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import {useMediaQuery, Box, Typography, Paper} from '@mui/material';
import {CalendarMonth, Place, ArrowBackIos, ArrowForwardIos} from '@mui/icons-material';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./reservation.css";
import customStyle from "./SwiperPilihEvent.module.css";

import {getImageByID} from "../../assets/images/events";
import {mediaBanner} from '../../assets/images/banner';

// import required modules
import { Pagination, Navigation } from "swiper";

export default function App(props) {
    //media query
    const desktop = useMediaQuery(theme.breakpoints.up('laptop'));

    const [events, setEvents] = React.useState("");
    React.useEffect(() => {
        axios.get('/api/get-events')
        .then((response) => {
            //
            let Obj = response.data.events;
            var result=[];
            for(var i=0;i<Obj.length;i++){
                result.push({id: Obj[i].id, name: Obj[i].name, title: Obj[i].title, subtitle: Obj[i].subtitle, location: Obj[i].location, date: Obj[i].date, time: Obj[i].time, description: Obj[i].description, image: Obj[i].image, available_start: Obj[i].available_start, available_end: Obj[i].available_end, start_from: Obj[i].start_from, isActive: Obj[i].isActive});
            }
            setEvents(result);

        }).catch((error) => {
            //
            console.log(error);
        })
    }, []);

    const SLIDE_COUNT = events.length;
    const slides = Array.from(Array(SLIDE_COUNT).keys());

    const [hovered, setHovered] = React.useState(false);
    const handleHovered = (id) => {
        setHovered(id);
    };
    const handleUnhovered = () => {
        setHovered(false);
    };

    const hoveredImageStyle = {
        layout: 'fill',
        objectFit: 'cover',
        objectPosition: 'top',
        width: '100%',
        height: '200px',
        transform: 'scale(1.2)',
        animation: "inHoveredImageAnimation 250ms ease-in"
    };
    const unhoveredImageStyle = {
        layout: 'fill',
        objectFit: 'cover',
        objectPosition: 'top',
        width: '100%',
        height: '200px',
        animation: "outHoveredImageAnimation 270ms ease-out",
        animationFillMode: "forwards"
    };

    const titleHoveredStyle = {
        //
        color: '#000'
    }
    const titleUnhoveredStyle = {
        color: '#333'
    }
    const textHoveredStyle = {
        //
        color: '#555'
    }
    const textUnhoveredStyle = {
        //
        color: '#777'
    }

    const handleSelectEvent = (data) => {
        props.func(data);
    }

    return (
        <>
        <ThemeProvider
        theme={theme}>
            {
                desktop
                ?
                <Swiper
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                key={"pilih-event-desktop"}
                slidesPerView={4}
                slidesPerGroup={1}
                pagination={{
                    dynamicBullets: true,
                    el: '.swiper-pilih-event-pagination',
                }}
                modules={[Pagination]}
                className="pilihEventSwiperDesktop"
                >
                    <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%'
                    }}>
                        {slides.map((index) => (
                            <SwiperSlide
                            className={`swiper-${events[index].id}`}
                            key={events[index].name}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%',
                                padding: '5px',
                            }}>
                                <Paper
                                onMouseOver={() => handleHovered(events[index].id)}
                                onMouseOut={handleUnhovered}
                                onClick={() => handleSelectEvent(events[index])}
                                elevation={hovered === events[index].id ? 5 : 3}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    padding: '10px',
                                    borderRadius: '20px',
                                }}>
                                    <Grid
                                    container={true}
                                    direction="column"
                                    spacing={0}
                                    sx={{
                                        cursor: 'pointer',
                                        display: 'flex',
                                        height: '100%',
                                        width: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Box
                                        sx={{
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            Width: '100%',
                                            maxHeight: '20vh',
                                            borderRadius: '20px',
                                            overflow: 'hidden',
                                        }}>
                                            {
                                                events[index].image
                                                ?
                                                <img
                                                style={hovered === events[index].id ? hoveredImageStyle : unhoveredImageStyle}
                                                // src={import.meta.env.VITE_MAIN_URL+events[index].image}
                                                src={getImageByID(events[index].id).image}
                                                alt="event_image" />
                                                :
                                                <img
                                                style={hovered === events[index].id ? hoveredImageStyle : unhoveredImageStyle}
                                                src={mediaBanner[0]}
                                                alt="event_image" />
                                            }
                                        </Box>
                                        <Grid
                                        container={true}
                                        direction="row"
                                        spacing={0}
                                        sx={{
                                            marginTop: '20px',
                                            display: 'flex',
                                            height: '100%',
                                            width: '100%',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-end',
                                        }}>
                                            <Box>
                                                <Typography
                                                style={hovered === events[index].id ? titleHoveredStyle : titleUnhoveredStyle}
                                                sx={{
                                                    fontSize: '18px',
                                                    fontWeight: 600,
                                                }}>
                                                    {events[index].title}
                                                </Typography>
                                                <Typography
                                                style={hovered === events[index].id ? textHoveredStyle : textUnhoveredStyle}
                                                sx={{
                                                    marginTop: '10px',
                                                    fontSize: '14px',
                                                    fontWeight: 400,
                                                }}>
                                                    <CalendarMonth/>     {events[index].date}
                                                </Typography>
                                                <Typography
                                                style={hovered === events[index].id ? textHoveredStyle : textUnhoveredStyle}
                                                sx={{
                                                    fontSize: '14px',
                                                    fontWeight: 400,
                                                    color: '#555'
                                                }}>
                                                    <Place/>     {events[index].location}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography
                                                style={hovered === events[index].id ? textHoveredStyle : textUnhoveredStyle}
                                                textAlign={"right"}
                                                sx={{
                                                    fontSize: '14px',
                                                    fontWeight: 400,
                                                    color: '#555'
                                                }}>
                                                    start from
                                                </Typography>
                                                <Typography
                                                style={hovered === events[index].id ? textHoveredStyle : textUnhoveredStyle}
                                                textAlign={"right"}
                                                sx={{
                                                    fontSize: '16px',
                                                    fontWeight: 500,
                                                    color: '#555'
                                                }}>
                                                    Rp. {events[index].start_from.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </SwiperSlide>
                        ))}
                    </Box>
                    <div className={`swiper-pilih-event-pagination ${customStyle.swiperPilihEventPagination}`}/>
                </Swiper>
                :
                <Swiper
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                navigation={{
                    prevEl: '.prev-main-events',
                    nextEl: '.next-main-events',
                }}
                key={"pilih-event-mobile"}
                slidesPerView={1}
                slidesPerGroup={1}
                pagination={{
                    dynamicBullets: true,
                    el: '.swiper-pilih-event-pagination',
                }}
                modules={[Pagination, Navigation]}
                className="pilihEventSwiperDesktop"
                >
                    <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                    }}>
                        {slides.map((index) => (
                            <SwiperSlide
                            className={`swiper-${events[index].id}`}
                            key={events[index].name}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%',
                            }}>
                                <Grid
                                onMouseOver={() => handleHovered(events[index].id)}
                                onMouseOut={handleUnhovered}
                                onClick={() => handleSelectEvent(events[index])}
                                container={true}
                                direction="column"
                                spacing={0}
                                sx={{
                                    cursor: 'pointer',
                                    display: 'flex',
                                    height: '100%',
                                    width: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginX: '10px',
                                }}>
                                    <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        Width: '100%',
                                        Height: '300px',
                                        borderRadius: '20px',
                                        overflow: 'hidden',
                                    }}>
                                        {
                                            events[index].image
                                            ?
                                            <img
                                            style={hovered === events[index].id ? hoveredImageStyle : unhoveredImageStyle}
                                            // src={import.meta.env.VITE_MAIN_URL+events[index].image}
                                            src={getImageByID(events[index].id).image}
                                            alt="event_image" />
                                            :
                                            <img
                                            style={hovered === events[index].id ? hoveredImageStyle : unhoveredImageStyle}
                                            src={mediaBanner[0]}
                                            alt="event_image" />
                                        }
                                    </Box>
                                    <Grid
                                    container={true}
                                    direction="row"
                                    spacing={0}
                                    sx={{
                                        marginTop: '20px',
                                        display: 'flex',
                                        height: '100%',
                                        width: '100%',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-end',
                                    }}>
                                        <Box>
                                            <Typography
                                            style={hovered === events[index].id ? titleHoveredStyle : titleUnhoveredStyle}
                                            sx={{
                                                fontSize: '18px',
                                                fontWeight: 600,
                                            }}>
                                                {events[index].title}
                                            </Typography>
                                            <Typography
                                            style={hovered === events[index].id ? textHoveredStyle : textUnhoveredStyle}
                                            sx={{
                                                marginTop: '10px',
                                                fontSize: '14px',
                                                fontWeight: 400,
                                            }}>
                                                <CalendarMonth/>     {events[index].date}
                                            </Typography>
                                            <Typography
                                            style={hovered === events[index].id ? textHoveredStyle : textUnhoveredStyle}
                                            sx={{
                                                fontSize: '14px',
                                                fontWeight: 400,
                                                color: '#555'
                                            }}>
                                                <Place/>     {events[index].location}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography
                                            style={hovered === events[index].id ? textHoveredStyle : textUnhoveredStyle}
                                            textAlign={"right"}
                                            sx={{
                                                fontSize: '14px',
                                                fontWeight: 400,
                                                color: '#555'
                                            }}>
                                                start from
                                            </Typography>
                                            <Typography
                                            style={hovered === events[index].id ? textHoveredStyle : textUnhoveredStyle}
                                            textAlign={"right"}
                                            sx={{
                                                fontSize: '16px',
                                                fontWeight: 500,
                                                color: '#555'
                                            }}>
                                                Rp. {events[index].start_from.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </SwiperSlide>
                        ))}
                    </Box>
                    <div className={`swiper-pilih-event-pagination ${customStyle.swiperPilihEventPagination} ${customStyle.swiperPaginationBulletActiveMain}`}/>
                    <div className={`prev-main-events ${customStyle.prevMainEvents}`}>
                        <Box
                        sx={{
                            display: 'flex',
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                        }}>
                            <ArrowBackIos
                            sx={{
                                fontSize: 28,
                                fontWeight: 600,
                                color: 'primary.main'
                            }}/>
                        </Box>
                    </div>
                    <div className={`next-main-events ${customStyle.nextMainEvents}`}>
                        <Box
                        sx={{
                            display: 'flex',
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                        }}>
                            <ArrowForwardIos
                            sx={{
                                fontSize: 28,
                                fontWeight: 600,
                                color: 'primary.main'
                            }}/>
                        </Box>
                    </div>
                </Swiper>
            }
        </ThemeProvider>
        </>
    );
}
