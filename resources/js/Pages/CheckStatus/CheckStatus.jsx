import React from 'react';
import { Head } from '@inertiajs/react';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import {useMediaQuery, Box, Typography, Zoom, Paper, Slide, Button, TextField} from '@mui/material';
import {Search} from '@mui/icons-material';
import { router, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { EncryptStorage } from 'encrypt-storage';

import {media} from '../../assets/images';
import {mediaBanner} from '../../assets/images/banner';
import {mediaLoka} from '../../assets/images/loka';
import { Header, Footer, ToTopButton} from '../../Components';
import {SwiperPilihEvent, PilihTicket} from '../../Components/Reservation';
import { theme } from "../../utils/theme";
import { ThemeProvider } from '@emotion/react';

export default function CheckStatus(props) {

    const desktop = useMediaQuery(theme.breakpoints.up('laptop'));

    const { reservations } = usePage().props;
    // Laravel's pagination data object = data
    const [query, setQuery] = React.useState({
        search: props.filter.search
    });

    console.log(props);
    // useEffect(() => {
    //     Inertia.get(route(route().current()), query, {
    //         preserveState: true,
    //         replace: true,
    //     });
    // }, [query]);

    const search = (e) => {

        router.get(
            '/check-status', query,
            {
                preserveState: true,
                replace: true,
            },
        );
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
                                            search: e.target.value
                                        })}
                                        // value={data.email}
                                        // onChange={e => setData('email', e.target.value)}
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
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Paper
                            elevation={3}
                            sx={{
                                width: '50%',
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
                                    <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}>
                                        {reservations?.data?.map((reservation, index) => (
                                            <Grid
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
                                                <Box>
                                                    <Typography>
                                                        {reservation.id}
                                                    </Typography>
                                                </Box>
                                                <Box>
                                                    <Typography>
                                                        {reservation.customer.name}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Box>
                                </Grid>
                            </Paper>
                            <Paper
                            elevation={3}
                            sx={{
                                width: '40%',
                                height: '100%'
                            }}></Paper>
                        </Grid>
                    </Grid>
                    :
                    null
                }
            </ThemeProvider>
        </>
    )
}