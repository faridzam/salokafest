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
                    
                </Box>

            </Grid>

            <Helmet>
                <script type="text/javascript"
                src="https://app.sandbox.midtrans.com/snap/snap.js"
                data-client-key="SB-Mid-client-nxEqAslc-ufQu9az"></script>
            </Helmet>

        </ThemeProvider>
    )
}
