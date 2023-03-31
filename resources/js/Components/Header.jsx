import React from "react";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import {Box, Typography, Button, SwipeableDrawer, List, Divider, ListItem, ListItemButton, ListItemText, Fade} from '@mui/material';
import {ConfirmationNumber} from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import {media} from '../assets/images'
import { styled } from "@mui/material/styles";
import { useOnHoverOutside } from "../Hooks/useOnHoverOutside";

import './header.css';
import { router } from '@inertiajs/react';
import { ThemeProvider } from "@emotion/react";
import { theme } from "../utils/theme";

import {Helmet} from "react-helmet";

const NavbarMenu = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    [theme.breakpoints.down('laptop')]: {
      display: 'none',
    },
}));

const NavbarMobile = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    [theme.breakpoints.up('laptop')]: {
      display: 'none',
    },
}));

export default function Header() {

    const [drawerState, setDrawerState] = React.useState(false);
    const [activeRoute, setActiveRoute] = React.useState('');

    React.useEffect(() => {
        setActiveRoute(window.location.pathname);
    }, []);

    const redirect = (route) => {
        router.visit(route);
    }

    const externalRedirect = (route) => {
        window.location.href = route
    }

    const [isScrolled, setIsScrolled] = React.useState(false);
    React.useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 200) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        });
    }, []);

    //rombongan dropdown menu
    const dropdownRef = React.useRef(null); // Create a reference for dropdown container
    const [isMenuDropDownOpen, setMenuDropDownOpen] = React.useState(false);

    const closeHoverMenu = () => {
        setMenuDropDownOpen(false);
    };

    useOnHoverOutside(dropdownRef, closeHoverMenu); // Call the hook

    return(
        // header
        <ThemeProvider
        theme={theme}>
            <Fade
            in={isScrolled}
            timeout={250}
            style={{ transitionDelay: isScrolled ? '100ms' : '0ms' }}>
            <Box
            sx={{
                position: 'absolute',
                display: 'inline-block',
                width: '100%',
                height: '100px',
                backgroundColor: 'white',
            }}/>
            </Fade>
            <Grid
            container={true}
            direction="row"
            spacing={0}
            sx={{
                position: 'absolute',
                width: '100%',
                height: '100px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
            }}>
                <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                }}>

                    <Box
                    onClick={() => redirect('/')}
                    // onClick={() => externalRedirect('https://salokapark.com/')}
                    sx={{
                        marginY: '10px',
                        marginLeft: '50px',
                        cursor: 'pointer',
                    }}>
                        <img src={media[0]} alt="logo saloka" width={150} height={75}></img>
                    </Box>

                    <NavbarMenu>
                    <Grid
                    container={true}
                    direction="row"
                    spacing={0}
                    sx={{
                        marginTop: '20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                    }}>

                        <Box
                        sx={{
                        marginY: '10px',
                        marginLeft: '50px',
                        paddingLeft: '15px',
                        paddingRight: '15px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        }}>
                            <Typography
                            className={`navbar-item noselect ${activeRoute.includes("promosi") ? " navbar-item-active" : ""}`}
                            onClick={() => redirect('/promosi')}
                            noWrap={true}
                            sx={
                                isScrolled
                                ?
                                {
                                fontFamily: 'AlrightSans',
                                fontSize: '18px',
                                fontWeight: 700,
                                color: '#333',
                                cursor: 'pointer',
                                "&:hover": {
                                    color: 'secondary.light',
                                },
                                }
                                :
                                {
                                fontFamily: 'AlrightSans',
                                fontSize: '18px',
                                fontWeight: 700,
                                color: '#ddd',
                                cursor: 'pointer',
                                "&:hover": {
                                    color: 'secondary.light',
                                },
                                }
                            }
                            >PROMO</Typography>
                        </Box>

                        <Box
                        sx={{
                        marginY: '10px',
                        paddingLeft: '15px',
                        paddingRight: '15px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        }}>
                            <Typography
                            className={`navbar-item noselect ${activeRoute.includes("zona") ? " navbar-item-active" : ""}`}
                            onClick={() => redirect('/zona')}
                            noWrap={true}
                            sx={
                                isScrolled
                                ?
                                {
                                fontFamily: 'AlrightSans',
                                fontSize: '18px',
                                fontWeight: 700,
                                color: '#333',
                                cursor: 'pointer',
                                "&:hover": {
                                    color: 'secondary.light',
                                },
                                }
                                :
                                {
                                fontFamily: 'AlrightSans',
                                fontSize: '18px',
                                fontWeight: 700,
                                color: '#ddd',
                                cursor: 'pointer',
                                "&:hover": {
                                    color: 'secondary.light',
                                },
                                }
                            }
                            >ZONA</Typography>
                        </Box>

                        <Box
                        sx={{
                        marginY: '10px',
                        paddingLeft: '15px',
                        paddingRight: '15px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        }}>
                            <Typography
                            className={`navbar-item noselect ${activeRoute.includes("show-event") ? " navbar-item-active" : ""}`}
                            onClick={() => redirect('/show-event')}
                            // onClick={() => externalRedirect('https://salokapark.com/event')}
                            noWrap={true}
                            sx={
                                isScrolled
                                ?
                                {
                                fontFamily: 'AlrightSans',
                                fontSize: '18px',
                                fontWeight: 700,
                                color: '#333',
                                cursor: 'pointer',
                                "&:hover": {
                                    color: 'secondary.light',
                                },
                                }
                                :
                                {
                                fontFamily: 'AlrightSans',
                                fontSize: '18px',
                                fontWeight: 700,
                                color: '#ddd',
                                cursor: 'pointer',
                                "&:hover": {
                                    color: 'secondary.light',
                                },
                                }
                            }
                            >SHOW & EVENT</Typography>
                        </Box>

                        <Box
                        sx={{
                        marginY: '10px',
                        paddingLeft: '15px',
                        paddingRight: '15px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        }}>
                            <Typography
                            className={`navbar-item noselect ${activeRoute.includes("restaurant") ? " navbar-item-active" : ""}`}
                            onClick={() => redirect('/restaurant')}
                            // onClick={() => externalRedirect('https://salokapark.com/kuliner')}
                            noWrap={true}
                            sx={
                                isScrolled
                                ?
                                {
                                fontFamily: 'AlrightSans',
                                fontSize: '18px',
                                fontWeight: 700,
                                color: '#333',
                                cursor: 'pointer',
                                "&:hover": {
                                    color: 'secondary.light',
                                },
                                }
                                :
                                {
                                fontFamily: 'AlrightSans',
                                fontSize: '18px',
                                fontWeight: 700,
                                color: '#ddd',
                                cursor: 'pointer',
                                "&:hover": {
                                    color: 'secondary.light',
                                },
                                }
                            }
                            >RESTO & CAFE</Typography>
                        </Box>

                        <Box
                        sx={{
                        marginY: '10px',
                        paddingLeft: '15px',
                        paddingRight: '15px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        }}
                        ref={dropdownRef}>
                            <Typography
                            className={`navbar-item noselect ${activeRoute.includes("group") ? " navbar-item-active" : ""}`}
                            // onClick={() => redirect('/group')}
                            onMouseOver={() => setMenuDropDownOpen(true)}
                            sx={
                                isScrolled
                                ?
                                {
                                fontFamily: 'AlrightSans',
                                fontSize: '18px',
                                fontWeight: 700,
                                color: '#333',
                                cursor: 'pointer',
                                "&:hover": {
                                    color: 'secondary.light',
                                },
                                }
                                :
                                {
                                fontFamily: 'AlrightSans',
                                fontSize: '18px',
                                fontWeight: 700,
                                color: '#ddd',
                                cursor: 'pointer',
                                "&:hover": {
                                    color: 'secondary.light',
                                },
                                }
                            }
                            >ROMBONGAN</Typography>
                            {isMenuDropDownOpen &&
                                <Grid
                                className="dropdown-menu"
                                container={true}
                                direction="column"
                                spacing={0}
                                sx={{
                                    paddingX: '15px',
                                    position:'relative',
                                    zIndex:1,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    alignSelf: 'flex-start',
                                    justifySelf: 'flex-start',
                                    backgroundColor: 'white.lightest',
                                    borderRadius: '10px'
                                }}>

                                    <Box
                                    sx={{
                                    paddingY: '10px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                    }}>
                                        <Typography
                                        // className={`navbar-item noselect ${activeRoute.includes("group") ? " navbar-item-active" : ""}`}
                                        onClick={() => redirect('/group')}
                                        sx={{
                                            fontFamily: 'AlrightSans',
                                            fontSize: '14px',
                                            fontWeight: 500,
                                            color: '#333',
                                            cursor: 'pointer',
                                            "&:hover": {
                                                color: 'secondary.light',
                                            },
                                        }}
                                        >Info Rombongan</Typography>
                                    </Box>

                                    {/* ticket-order*/}
                                    <Box
                                    sx={{
                                    paddingY: '10px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                    }}>
                                        <Typography
                                        // className={`navbar-item noselect ${activeRoute.includes("group-ticket") ? " navbar-item-active" : ""}`}
                                        onClick={() => redirect('/group-ticket/pilih-ticket')}
                                        sx={{
                                            fontFamily: 'AlrightSans',
                                            fontSize: '14px',
                                            fontWeight: 500,
                                            color: '#333',
                                            cursor: 'pointer',
                                            "&:hover": {
                                                color: 'secondary.light',
                                            },
                                        }}
                                        >Beli Tiket Rombongan</Typography>
                                    </Box>

                                </Grid>
                            }

                        </Box>

                    </Grid>
                    </NavbarMenu>
                </Box>

                <NavbarMenu>
                    <Box
                    sx={{
                        marginY: '20px',
                    }}>
                        <Button
                        onClick={() => {activeRoute.includes("group")?redirect('/group-ticket/pilih-ticket'):redirect('/ticket')}}
                        // onClick={() => externalRedirect('https://webdev.salokapark.com/ticket')}
                        className="ticket-cta-button"
                        variant="contained"
                        sx={{
                            backgroundColor: 'red.light',
                            height: '50px',
                            marginRight: '50px',
                            borderRadius: '10px',
                            '&:hover': {
                                backgroundColor: 'red.light',
                            },
                        }}
                        >
                            <ConfirmationNumber/>
                            <Grid
                            container={true}
                            direction="column"
                            spacing={0}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                            }}>
                                <Typography
                                sx={{
                                    fontFamily: 'AlrightSans',
                                    marginLeft: '10px',
                                    fontWeight: 700
                                }}>TIKET</Typography>
                                {
                                    activeRoute.includes("group")
                                    ?
                                    <Typography
                                    sx={{
                                        fontFamily: 'AlrightSans',
                                        marginLeft: '10px',
                                        fontSize: '10px',
                                        fontWeight: 400
                                    }}>ROMBONGAN</Typography>
                                    :
                                    <div></div>
                                }
                            </Grid>
                        </Button>

                    </Box>
                </NavbarMenu>

                <NavbarMobile>
                    <Box>
                        <Button
                        onClick={() => {setDrawerState(true)}}>
                            <MenuIcon/>
                        </Button>
                    </Box>
                    <SwipeableDrawer
                        anchor="right"
                        open={drawerState}
                        onClose={() => {setDrawerState(false)}}
                        onOpen={() => {setDrawerState(true)}}
                        sx={{
                            width: '100%',
                        }}
                    >
                        <List
                        sx={{
                            width: '320px',
                            paddingX: '20px',
                        }}>

                            <ListItem key="promosi">
                                <ListItemButton
                                className={`navbar-item noselect ${activeRoute.includes("promosi") ? " navbar-item-active" : ""}`}
                                onClick={() => redirect('/promosi')}>
                                    <ListItemText primary="Promo" sx={{textAlign: 'center'}}/>
                                </ListItemButton>
                            </ListItem>

                            <ListItem key="zona">
                                <ListItemButton
                                className={`navbar-item noselect ${activeRoute.includes("zona") ? " navbar-item-active" : ""}`}
                                onClick={() => redirect('/zona')}>
                                    <ListItemText primary="Zona" sx={{textAlign: 'center'}}/>
                                </ListItemButton>
                            </ListItem>

                            <ListItem key="show&event">
                                <ListItemButton
                                className={`navbar-item noselect ${activeRoute.includes("show-event") ? " navbar-item-active" : ""}`}
                                onClick={() => redirect('/show-event')}
                                // onClick={() => externalRedirect('https://salokapark.com/event')}
                                >
                                    <ListItemText primary="Show & Event" sx={{textAlign: 'center'}}/>
                                </ListItemButton>
                            </ListItem>
                            <ListItem key="restaurant">
                                <ListItemButton
                                className={`navbar-item noselect ${activeRoute.includes("restaurant") ? " navbar-item-active" : ""}`}
                                onClick={() => redirect('/restaurant')}
                                // onClick={() => externalRedirect('https://salokapark.com/kuliner')}
                                >
                                    <ListItemText primary="Resto & Cafe" sx={{textAlign: 'center'}}/>
                                </ListItemButton>
                            </ListItem>

                            <ListItem key="group-info">
                                <ListItemButton
                                className={`navbar-item noselect ${activeRoute.includes("group") ? " navbar-item-active" : ""}`}
                                onClick={() => redirect('/group')}>
                                    <ListItemText primary="Info Rombongan" sx={{textAlign: 'center'}}/>
                                </ListItemButton>
                            </ListItem>
                            <ListItem key="group-ticket">
                                <ListItemButton
                                className={`navbar-item noselect ${activeRoute.includes("group") ? " navbar-item-active" : ""}`}
                                onClick={() => redirect('/group-ticket/pilih-ticket')}>
                                    <ListItemText primary="Beli Tiket Rombongan" sx={{textAlign: 'center'}}/>
                                </ListItemButton>
                            </ListItem>

                            <Divider/>

                            <ListItem key="ticket">
                                <ListItemButton
                                onClick={() => {activeRoute.includes("group") ? redirect('/group-ticket/pilih-ticket') : redirect('/ticket')}}
                                // onClick={() => externalRedirect('https://webdev.salokapark.com/ticket')}
                                >
                                    <ListItemText primary="Tiket" sx={{textAlign: 'center', color: 'red.light'}}/>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </SwipeableDrawer>
                </NavbarMobile>

            </Grid>

            <Helmet>
                <script type="text/javascript"
                src="https://app.sandbox.midtrans.com/snap/snap.js"
                data-client-key="SB-Mid-client-nxEqAslc-ufQu9az"></script>
            </Helmet>

        </ThemeProvider>
    )
}
