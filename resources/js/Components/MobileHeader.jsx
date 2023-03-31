import React from "react";
import { Link } from '@inertiajs/react';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import {Box, Typography} from '@mui/material';
import {media} from '../assets/images'
import { useTheme, styled } from "@mui/material/styles";

import './header.css';

const NavbarMenu = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    [theme.breakpoints.down('laptop')]: {
      display: 'none',
    },
}));

export default function Header() {
    const theme = useTheme();
    return(
        // header
        <Grid
        container={true}
        direction="row"
        spacing={0}
        sx={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
            <NavbarMenu>
            <Grid
            container={true}
            direction="row"
            spacing={0}
            sx={{
              //
            }}>
                <Link
                href={route('welcome')}
                >
                    <Box
                    sx={{
                        marginLeft: '50px',
                        cursor: 'pointer',
                    }}>
                        <img src={media[0]} alt="logo saloka" width={150} height={75}></img>
                    </Box>
                </Link>

                <Box
                sx={{
                  marginY: '10px',
                  marginLeft: '50px',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                    <Link
                    href={route('welcome')}
                    >
                        <Typography
                        noWrap={true}
                        sx={{
                            fontFamily: 'AlrightSans',
                            fontSize: '18px',
                            fontWeight: 700,
                            color: '#333',
                            cursor: 'pointer',
                            "&:hover": {
                                color: 'secondary.light',
                            },
                        }}
                        >HOME</Typography>
                    </Link>
                </Box>
                <Box
                sx={{
                  marginY: '10px',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Typography
                  noWrap={true}
                  sx={{
                    fontFamily: 'AlrightSans',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#333',
                    cursor: 'pointer',
                    "&:hover": {
                        color: 'secondary.light',
                    },
                  }}
                  >PROMOSI</Typography>
                </Box>
                <Box
                sx={{
                  marginY: '10px',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Typography
                  noWrap={true}
                  sx={{
                    fontFamily: 'AlrightSans',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#333',
                    cursor: 'pointer',
                    "&:hover": {
                        color: 'secondary.light',
                    },
                  }}
                  >ZONA</Typography>
                </Box>
                <Box
                sx={{
                  marginY: '10px',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Typography
                  noWrap={true}
                  sx={{
                    fontFamily: 'AlrightSans',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#333',
                    cursor: 'pointer',
                    "&:hover": {
                        color: 'secondary.light',
                    },
                  }}
                  >SHOW & EVENT</Typography>
                </Box>
                <Box
                sx={{
                  marginY: '10px',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Typography
                  noWrap={true}
                  sx={{
                    fontFamily: 'AlrightSans',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#333',
                    cursor: 'pointer',
                    "&:hover": {
                        color: 'secondary.light',
                    },
                  }}
                  >RESTAURANT</Typography>
                </Box>
                <Box
                sx={{
                  marginY: '10px',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Typography
                  noWrap={true}
                  sx={{
                    fontFamily: 'AlrightSans',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#333',
                    cursor: 'pointer',
                    "&:hover": {
                        color: 'secondary.light',
                    },
                  }}
                  >MERCHANDISE</Typography>
                </Box>

              </Grid>
            </NavbarMenu>


        </Grid>
    )
}
