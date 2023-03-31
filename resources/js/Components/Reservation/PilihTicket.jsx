import React from 'react';
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../utils/theme";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import {useMediaQuery, Box, Typography, Paper, Card, Fab, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, AppBar, Toolbar, IconButton, Slide, Divider, TextField, InputAdornment, Chip, Checkbox, FormControlLabel, iconButtonClasses} from '@mui/material';
import {Place, CalendarMonth, AccessTime, Remove, Add, Close, ShoppingCart, AccountCircle, Phone, Email, LocationOn} from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
// import dayjs from 'dayjs';

//import locale
import 'dayjs/locale/id';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {} from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

import { FreeMode, Scrollbar, Mousewheel } from "swiper";

import {Helmet} from "react-helmet";

import {media} from '../../assets/images';
import {mediaBanner} from '../../assets/images/banner';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function App(props) {
    //media query
    const [dateNow, setDateNow] = React.useState(new Date());
    const desktop = useMediaQuery(theme.breakpoints.up('laptop'));
    const initialMountRef = React.useRef(true);

    const [tickets, setTickets] = React.useState("");
    React.useEffect(() => {
        axios.post('/api/get-tickets-by-event', {
            event_id: props.selectedEvent.id,
        })
        .then((response) => {
            //
            let Obj = response.data.tickets;
            var result=[];
            for(var i=0;i<Obj.length;i++){
                result.push(
                    {
                        id: Obj[i].id,
                        event_id: Obj[i].event_id,
                        name: Obj[i].name,
                        description: Obj[i].description,
                        price: Obj[i].price,
                        min_qty: Obj[i].min_qty,
                        max_qty: Obj[i].max_qty,
                        qty: 0,
                        stock_available: Obj[i].stock_available,
                        stock_pending: Obj[i].stock_pending,
                        stock_bought: Obj[i].stock_bought,
                    }
                );
            }
            setTickets(result);

        }).catch((error) => {
            //
            console.log(error);
        })
    }, [props.selectedEvent]);

    const CONTENT_COUNT = tickets.length;
    const tickets_content = Array.from(Array(CONTENT_COUNT).keys());

    const handleAddTicket = (data) => {
        props.addTicket(data);
    }
    const handleSubTicket = (data) => {
        props.subTicket(data);
    }

    const handleCheckoutButton = () => {
        slideTo(2);
    };

    const [swiper, setSwiper] = React.useState(0);
    const slideTo = (index) => swiper.slideTo(index);

    const conditionalSwiperMobileStyle = () => {
        let style = {};
        switch (swiper.activeIndex) {
            case 0:
                style = {
                    width: '100%',
                    height: '100%',
                    transition: 'all .5s ease-in-out',
                }
                break;
            case 1:
                style = {
                    width: '100%',
                    height: '100%',
                    transition: 'all .5s ease-in-out',
                }
                break;
            default:
                style = {
                    width: '100%',
                    height: '100%',
                    transition: 'all .5s ease-in-out',
                }
                break;
        }
        return style;
    }

    const [name, setName] = React.useState("");
    const handleChangeName = (value) => {
        setName(value.target.value);
    }
    const [phone, setPhone] = React.useState("");
    const handleChangePhone = (value) => {
        setPhone(value.target.value);
    }
    const [address, setAddress] = React.useState("");
    const handleChangeAddress = (value) => {
        setAddress(value.target.value);
    }
    const [dateOfBirth, setDateOfBirth] = React.useState();
    const [dateOfBirthValid, setDateOfBirthValid] = React.useState(true);
    const [dateOfBirthInvalidMessage, setDateOfBirthInvalidMessage] = React.useState("");
    const [clearDate, setClearDate] = React.useState();
    const handleChangeDateOfBirth = (value) => {
        //
        var maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 5));
        var today = new Date();
        var myDateOfBirth = new Date(value.$d);
        if ((today - myDateOfBirth) / (1000 * 3600 * 24 * 365) >= 5) {
            //
            setDateOfBirth(value);
            setDateOfBirthValid(true);
            setDateOfBirthInvalidMessage("");
        } else {
            setDateOfBirth(value);
            setDateOfBirthValid(false);
            setDateOfBirthInvalidMessage("usia minimal 5 tahun");
        }
    };
    const [email, setEmail] = React.useState("");
    const [emailTyping, setEmailTyping] = React.useState(true);
    const [emailValid, setEmailValid] = React.useState(false);
    const [emailInvalidMessage, setEmailInvalidMessage] = React.useState('kode booking akan dikirim melalui alamat email!');
    const [emailActive, setEmailActive] = React.useState(false);
    const [emailConfirmation, setEmailConfirmation] = React.useState("");
    const [emailConfirmationTyping, setEmailConfirmationTyping] = React.useState(true);
    const [emailConfirmationValid, setEmailConfirmationValid] = React.useState(false);
    const [emailConfirmationInvalidMessage, setEmailConfirmationInvalidMessage] = React.useState('kode booking akan dikirim melalui alamat email!');
    const [emailConfirmationActive, setEmailConfirmationActive] = React.useState(false);
    React.useEffect(() => {
        if (initialMountRef.current) {
            //initialMountRef.current = false;
            return;
        } else {
            setEmailTyping(true);
            const timeoutId = setTimeout(() => setEmailTyping(false), 500);
            return () => clearTimeout(timeoutId);
        }
    }, [email]);
    React.useEffect(() => {
        if (emailTyping === false) {
            if (email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                setEmailValid(true);
                setEmailInvalidMessage("")
            } else {
                setEmailValid(false);
                setEmailInvalidMessage("email format is not valid")
            }
        } else {
            //
        }
    }, [emailTyping, emailConfirmationTyping]);
    const handleChangeEmail = (value) => {
        if (initialMountRef.current) {
            initialMountRef.current = false;
        }
        setEmail(value.target.value);
    }

    //emailConfirmation
    React.useEffect(() => {
        if (initialMountRef.current) {
            //initialMountRef.current = false;
            return;
        } else {
            setEmailConfirmationTyping(true);
            const timeoutId = setTimeout(() => setEmailConfirmationTyping(false), 500);
            return () => clearTimeout(timeoutId);
        }
    }, [emailConfirmation]);
    React.useEffect(() => {
        if (emailConfirmationTyping === false) {

            if (emailConfirmation.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                setEmailValid(true);
                setEmailInvalidMessage("")
            } else {
                setEmailConfirmationValid(false);
                setEmailConfirmationInvalidMessage("email format is not valid")
            }

            if (emailConfirmation != email) {
                setEmailConfirmationValid(false);
                setEmailConfirmationInvalidMessage("email confirmation isn't match")
            } else {
                setEmailConfirmationValid(true);
                setEmailConfirmationInvalidMessage("")
            }

        } else {
            //
        }
    }, [emailConfirmationTyping, emailTyping]);
    const handleChangeEmailConfirmation = (value) => {
        if (initialMountRef.current) {
            initialMountRef.current = false;
        }
        setEmailConfirmation(value.target.value);
    }

    const [isTNC, setIsTNC] = React.useState(false);
    const handleCheckTNC = () => {
        setIsTNC(!isTNC);
    }

    //submit button
    const [canSubmit, setCanSubmit] = React.useState(false);
    const submitConditionsArray = [
        name,
        dateOfBirth,
        dateOfBirthValid,
        phone,
        email,
        address,
        emailConfirmation,
        isTNC,
    ]
    const validator = [""];

    function multipleValidator(arr, values) {
        return values.every(value => {
          return arr.includes(value);
        });
    }

    React.useEffect(() => {
        if (multipleValidator(submitConditionsArray, validator) === true || emailValid === false || emailConfirmationValid === false || isTNC === false || dateOfBirthValid === false) {
            setCanSubmit(false);
        } else {
            setCanSubmit(true)
        }
    }, [name, dateOfBirth, dateOfBirthValid, phone, email, emailValid, emailActive, emailConfirmation, emailConfirmationValid, emailConfirmationActive, address, isTNC]);

    // confirmation dialog
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleDialogOpen = () => {
      setOpenDialog(true);
    };
    const handleDialogClose = () => {
      setOpenDialog(false);
    };

    // tnc dialog
    const [openDialogTNC, setOpenDialogTNC] = React.useState(false);

    const handleDialogOpenTNC = () => {
      setOpenDialogTNC(true);
    };
    const handleDialogCloseTNC = () => {
      setOpenDialogTNC(false);
    };

    const handleBayar = () => {
        //
        axios.post('/api/create-reservation', {
            event_id: props.selectedEvent.id,
            session_code: 1,
            name: name,
            dateOfBirth: dateOfBirth,
            phone: phone,
            email: email,
            address: address,
            ticketOrder: props.selectedTicket,
        })
        .then((response) => {
            //
            window.snap.pay(
                response.data.token,
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
        }).catch((error) => {
            //
            console.log(error);
        });
    }

    const [dialogBayar, setDialogBayar] = React.useState(false);

    const handleOpenDialogBayar = () => {
        setDialogBayar(true);
    };

    const handleCloseDialogBayar = () => {
        setDialogBayar(false);
    };

    const handlePreventCopyPaste = (e) => {
        e.preventDefault();
    }

    const COUNT_TICKET_PAYMENT = props.selectedTicket.length;
    const ticket_payment_length = Array.from(Array(COUNT_TICKET_PAYMENT).keys());

    return(
        <>
            <ThemeProvider
            theme={theme}>
            {
                desktop
                ?
                <Grid
                key={"pilih-ticket-desktop"}
                container={true}
                direction="row"
                spacing={0}
                sx={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {/* modal pembayaran */}
                    <Dialog
                    fullScreen
                    open={dialogBayar}
                    onClose={handleCloseDialogBayar}
                    TransitionComponent={Transition}
                >
                    <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleCloseDialogBayar}
                        aria-label="close"
                        >
                        <Close/>
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Pembayaran
                        </Typography>
                    </Toolbar>
                    </AppBar>
                    {/* body */}
                    <Grid
                    container={true}
                    direction="row"
                    spacing={0}
                    sx={{
                        display: 'flex',
                        width: '100%',
                        height: '100%',
                        padding: '50px',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start'
                    }}>
                        {/* customer data form */}
                        <Grid
                        container={true}
                        direction="column"
                        spacing={0}
                        sx={{
                            display: 'flex',
                            width: '50%',
                            height: '100%',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start'
                        }}>
                            <Grid
                            container={true}
                            direction="column"
                            spacing={0}
                            sx={{
                                display: 'flex',
                                width: '100%',
                                paddingY: '10px',
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end'
                            }}>
                                <Box
                                sx={{
                                    width: '100%',
                                    padding: '10px',
                                }}>
                                    <TextField
                                    value={name}
                                    onChange={value => handleChangeName(value)}
                                    autoComplete='off'
                                    label="Nama"
                                    placeholder='Loka'
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle/>
                                        </InputAdornment>
                                    ),
                                    }}
                                    sx={{
                                        width: '100%',
                                    }}
                                    variant="outlined"
                                    />
                                </Box>

                                <Box
                                sx={{
                                    width: '100%',
                                    padding: '10px',
                                }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="id" sx={{width: '100%'}}>
                                    <DatePicker
                                    value={dateOfBirth ? dateOfBirth : clearDate}
                                    onChange={value => handleChangeDateOfBirth(value)}
                                    format="DD-MM-YYYY"
                                    sx={{
                                        width: '100%'
                                    }}
                                    label="tanggal lahir"
                                    placeholder="31 Maret 1997"
                                    slotProps={{
                                        textField: {
                                          helperText: dateOfBirthInvalidMessage,
                                          error: !dateOfBirthValid,
                                          InputProps: { startAdornment: <CalendarMonth sx={{color: 'rgba(0, 0, 0, 0.54)', marginRight: '8px'}}/> }
                                        },
                                    }}
                                    renderInput={(params) => <TextField {...params} />}/>
                                    </LocalizationProvider>
                                </Box>

                                <Box
                                sx={{
                                    width: '100%',
                                    padding: '10px',
                                }}>
                                    <TextField
                                    value={phone}
                                    onChange={value => handleChangePhone(value)}
                                    autoComplete='off'
                                    label="Nomor Telepon"
                                    placeholder='08993011870'
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Phone/>
                                        </InputAdornment>
                                    ),
                                    }}
                                    sx={{
                                        width: '100%',
                                    }}
                                    variant="outlined"
                                    />
                                </Box>

                                <Box
                                sx={{
                                    width: '100%',
                                    padding: '10px',
                                }}>
                                    <TextField
                                    value={email}
                                    onChange={value => handleChangeEmail(value)}
                                    autoComplete='off'
                                    label="Email"
                                    placeholder='yourname@mail.com'
                                    helperText={emailInvalidMessage}
                                    error={!emailValid}
                                    onCut={handlePreventCopyPaste}
                                    onCopy={handlePreventCopyPaste}
                                    onPaste={handlePreventCopyPaste}
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email/>
                                        </InputAdornment>
                                    ),
                                    }}
                                    sx={{
                                        width: '100%',
                                    }}
                                    variant="outlined"
                                    />
                                </Box>

                                <Box
                                sx={{
                                    width: '100%',
                                    padding: '10px',
                                }}>
                                    <TextField
                                    value={emailConfirmation}
                                    onChange={value => handleChangeEmailConfirmation(value)}
                                    autoComplete='off'
                                    label="Email Confirmation"
                                    placeholder='yourname@mail.com'
                                    helperText={emailConfirmationInvalidMessage}
                                    error={!emailConfirmationValid}
                                    onCut={handlePreventCopyPaste}
                                    onCopy={handlePreventCopyPaste}
                                    onPaste={handlePreventCopyPaste}
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email/>
                                        </InputAdornment>
                                    ),
                                    }}
                                    sx={{
                                        width: '100%',
                                    }}
                                    variant="outlined"
                                    />
                                </Box>

                                <Box
                                sx={{
                                    width: '100%',
                                    padding: '10px',
                                }}>
                                    <TextField
                                    value={address}
                                    onChange={value => handleChangeAddress(value)}
                                    autoComplete='off'
                                    label="Alamat"
                                    placeholder='Jalan Fatmawati no. 154 Lopait'
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocationOn/>
                                        </InputAdornment>
                                    ),
                                    }}
                                    sx={{
                                        width: '100%',
                                    }}
                                    variant="outlined"
                                    />
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        width: '100%',
                                        padding: '5px',
                                    }}>
                                        <Checkbox
                                        value={isTNC}
                                        onChange={() => handleCheckTNC()}
                                        />
                                        <Typography
                                        sx={{
                                            width: '100%',
                                            display: 'inline',
                                            fontSize: '14px',
                                        }}
                                        component='div'>I agree with <a onClick={() => handleDialogOpenTNC()} style={{fontSize: '14px', color: '#4b78bf', cursor: 'pointer'}}>Term And Condition</a> and Privacy Policy of Saloka Theme Park</Typography>
                                    </Box>

                                <Card
                                elevation={5}
                                sx={{
                                    marginX: '20px',
                                    borderRadius: '30px'
                                }}>
                                    <Box
                                    sx={{
                                        width: '400px',
                                        height: '50px',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                        <Box
                                        sx={{
                                            marginLeft: '10px'
                                        }}>
                                            <Typography
                                            sx={{
                                                fontWeight: 500
                                            }}>Rp. {props.totalBill.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Typography>
                                        </Box>

                                        {!canSubmit
                                            ?
                                            <Button
                                            disabled
                                            key={"checkout-button-enabled"}
                                            variant='contained'
                                            sx={{
                                                width: '200px',
                                                borderRadius: '30px',
                                                height: '100%',
                                            }}>
                                                <Typography
                                                sx={{
                                                    fontSize: '18px',
                                                    fontWeight: 600
                                                }}>Bayar</Typography>
                                            </Button>
                                            :
                                            <Button
                                            onClick={() => handleDialogOpen()}
                                            key={"checkout-button-disabled"}
                                            variant='contained'
                                            sx={{
                                                width: '200px',
                                                borderRadius: '30px',
                                                height: '100%',
                                            }}>
                                                <Typography
                                                sx={{
                                                    fontSize: '18px',
                                                    fontWeight: 600
                                                }}>Bayar</Typography>
                                            </Button>
                                        }

                                    </Box>
                                </Card>
                            </Grid>
                        </Grid>
                        {/* e-ticket display */}
                        <Grid
                        container={true}
                        direction="column"
                        spacing={0}
                        sx={{
                            display: 'flex',
                            width: '50%',
                            height: '100%',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}>
                            <Paper
                            elevation={5}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                margin: '20px',
                                width: '350px',
                                backgroundColor: 'white.lightest',
                                borderRadius: '20px',
                                border: '12px solid #45ad8d',
                                boxSizing: 'border-box',
                            }}>
                                {/* order description */}
                                <Grid
                                container={true}
                                direction="column"
                                spacing={0}
                                sx={{
                                    display: 'flex',
                                    width: '100%',
                                    paddingTop: '20px',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center'
                                }}>
                                    <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        height: '30px',
                                        width: '80%',
                                    }}>
                                        <Box
                                        sx={{
                                            height: '100%'
                                        }}>
                                            <img
                                            src={media[13]}
                                            alt="logo_salokafest"
                                            loading="lazy"
                                            style={{
                                                layout: 'fill',
                                                objectFit: 'cover',
                                                objectPosition: 'center',
                                                width: '100%',
                                                height: '100%',
                                            }}></img>
                                        </Box>
                                        <Box
                                        sx={{
                                            height: '100%'
                                        }}>
                                            <Typography
                                            style={{
                                                fontSize: '16px',
                                                fontWeight: 600
                                            }}>
                                                e-Ticket
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box
                                    sx={{
                                        width: '80%',
                                        marginY: '10px',
                                    }}>
                                        <Divider />
                                    </Box>
                                    <Grid
                                    container={true}
                                    direction="row"
                                    spacing={0}
                                    sx={{
                                        display: 'flex',
                                        width: '80%',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Grid
                                        container={true}
                                        direction="column"
                                        spacing={0}
                                        sx={{
                                            display: 'flex',
                                            width: '50%',
                                            paddingRight: '10px',
                                            height: '100%',
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-end'
                                        }}>
                                            <Box>
                                                <Typography
                                                sx={{
                                                    fontSize: '16px',
                                                    fontWeight: 600
                                                }}>
                                                    Event
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography
                                                sx={{
                                                    fontSize: '12px',
                                                    fontWeight: 500
                                                }}>
                                                    {props.selectedEvent.name}
                                                </Typography>
                                            </Box>
                                            <Box
                                            sx={{
                                                marginTop: '10px',
                                            }}>
                                                <Typography
                                                sx={{
                                                    fontSize: '16px',
                                                    fontWeight: 600
                                                }}>
                                                    Location
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography
                                                sx={{
                                                    fontSize: '12px',
                                                    fontWeight: 500
                                                }}>
                                                    {props.selectedEvent.location}
                                                </Typography>
                                            </Box>
                                            <Box
                                            sx={{
                                                marginTop: '10px',
                                            }}>
                                                <Typography
                                                sx={{
                                                    fontSize: '16px',
                                                    fontWeight: 600
                                                }}>
                                                    Date & Time
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography
                                                textAlign={'right'}
                                                sx={{
                                                    fontSize: '12px',
                                                    fontWeight: 500
                                                }}>
                                                    {props.arrivalDate.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })},
                                                </Typography>
                                                <Typography
                                                textAlign={'right'}
                                                sx={{
                                                    fontSize: '12px',
                                                    fontWeight: 500
                                                }}>
                                                    {props.selectedEvent.time}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid
                                        container={true}
                                        direction="row"
                                        spacing={0}
                                        sx={{
                                            display: 'flex',
                                            width: '50%',
                                            height: '100%',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                            <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                border: '1px solid',
                                                width: '100%',
                                                height: '100%',
                                            }}>
                                                <Typography>
                                                    gambar
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Box
                                    sx={{
                                        width: '80%',
                                        marginY: '10px',
                                    }}>
                                        <Divider />
                                    </Box>
                                    <Grid
                                    container={true}
                                    direction="column"
                                    spacing={0}
                                    sx={{
                                        display: 'flex',
                                        width: '80%',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start'
                                    }}>
                                        {ticket_payment_length.map((index) => (
                                            <Box
                                            key={`ordered-item-${index}`}
                                            sx={{
                                                width: '100%',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}>
                                                <Box
                                                sx={{
                                                    maxWidth: '100%',
                                                }}>
                                                    <Typography
                                                    noWrap={true}
                                                    sx={{
                                                        fontSize: '12px'
                                                    }}>
                                                        {props.selectedTicket[index].name}
                                                    </Typography>
                                                </Box>
                                                <Box
                                                sx={{
                                                    borderBottom: '1px dotted #999',
                                                    width: '100%',
                                                    marginX: '10px',
                                                }}></Box>
                                                <Box
                                                sx={{
                                                    maxWidth: '100%',
                                                }}></Box>
                                                <Typography
                                                sx={{
                                                    fontSize: '12px'
                                                }}>
                                                    {props.selectedTicket[index].qty}x
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Grid>
                                </Grid>
                                {/* divider */}
                                <Grid
                                container={true}
                                direction="row"
                                spacing={0}
                                sx={{
                                    display: 'flex',
                                    width: '100%',
                                    marginY: '10px',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <Box
                                    sx={{
                                        width: '16px',
                                        height: '32px',
                                        backgroundColor: '#45ad8d',
                                        borderRadius: '0px 50px 50px 0px',
                                        border: '1px solid #45ad8d',
                                    }}></Box>
                                    <Box
                                    sx={{
                                        width: '70%',
                                    }}>
                                        <Divider textAlign='center'>
                                            <Chip
                                            sx={{
                                                backgroundColor: '#45ad8d',
                                                color: '#fff',
                                                fontSize: '12px',
                                                fontWeight: 500,
                                                letterSpacing: 1.5
                                            }}
                                            label={"INV/20230622/SF/XXXXXX"}></Chip>
                                        </Divider>
                                    </Box>
                                    <Box
                                    sx={{
                                        width: '16px',
                                        height: '32px',
                                        backgroundColor: '#45ad8d',
                                        borderRadius: '50px 0px 0px 50px',
                                        border: '1px solid #45ad8d',
                                    }}></Box>
                                </Grid>
                                {/* booking code */}
                                <Grid
                                container={true}
                                direction="row"
                                spacing={0}
                                sx={{
                                    display: 'flex',
                                    width: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Box
                                    sx={{
                                        height: '150px',
                                        width: '150px',
                                    }}>
                                        <img
                                        src={media[18]}
                                        alt="logo_salokafest"
                                        loading="lazy"
                                        style={{
                                            layout: 'fill',
                                            objectFit: 'cover',
                                            objectPosition: 'center',
                                            width: '100%',
                                            height: '100%',
                                        }}></img>
                                    </Box>
                                    <Grid
                                    container={true}
                                    direction="column"
                                    spacing={0}
                                    sx={{
                                        display: 'flex',
                                        width: '50%',
                                        height: '100%',
                                        paddingY: '10px',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start'
                                    }}>
                                        <Box>
                                            <Box>
                                                <Typography
                                                sx={{
                                                    fontSize: '14px',
                                                    fontWeight: 600
                                                }}>
                                                    ORDERED BY
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography
                                                sx={{
                                                    fontSize: '12px',
                                                    fontWeight: 500
                                                }}>
                                                    {name ? name : "- nama anda -"}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography
                                                sx={{
                                                    fontSize: '12px',
                                                    fontWeight: 500
                                                }}>
                                                    {dateNow.toLocaleString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography
                                                sx={{
                                                    fontSize: '12px',
                                                    fontWeight: 500
                                                }}>
                                                    Pukul {dateNow.toLocaleString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box>
                                            <Typography
                                            sx={{
                                                fontSize: '13px',
                                                fontWeight: 500
                                            }}>
                                                *this is your e-ticket
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                    </Dialog>
                    {/* description */}
                    <Grid
                    container={true}
                    direction="row"
                    spacing={0}
                    sx={{
                        display: 'flex',
                        width: '55%',
                        height: '100%',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        overflow: 'auto'
                    }}>
                        <Box
                        sx={{
                            width: '100%',
                        }}>
                            <Typography
                            sx={{
                                letterSpacing: 0.25,
                                fontSize: '34px',
                                fontWeight: 600,
                            }}>
                                {props.selectedEvent.name}
                            </Typography>
                        </Box>
                        <Box
                        sx={{
                            width: '100%',
                        }}>
                            <Typography
                            sx={{
                                letterSpacing: 0.15,
                                fontSize: '16px',
                                fontWeight: 500,
                                color: '#999'
                            }}>
                                {props.selectedEvent.subtitle}
                            </Typography>
                        </Box>
                        <Box
                        sx={{
                            width: '100%',
                            marginY: '10px',
                        }}>
                        <hr
                        style={{
                            color: '#333',
                            backgroundColor: '#333',
                            height: 2,
                            borderColor : '#333',
                            opacity: '0.1'
                        }}/>
                        </Box>
                        <Box
                        sx={{
                            width: '100%',
                        }}>
                            <Typography
                            sx={{
                                lineHeight: 2,
                                fontSize: '24px',
                                fontWeight: 600,
                                color: '#333'
                            }}>
                                {props.selectedEvent.title}
                            </Typography>
                        </Box>
                        <Box
                        sx={{
                            width: '100%',
                        }}>
                            <Typography
                            paragraph={true}
                            textAlign={'justify'}
                            sx={{
                                letterSpacing: 0.5,
                                fontSize: '16px',
                                fontWeight: 500,
                                color: '#999'
                            }}>
                                {props.selectedEvent.description.length > 500 ? props.selectedEvent.description.substring(0, 500)+"..." : props.selectedEvent.description}
                            </Typography>
                        </Box>
                        <Box
                        sx={{
                            width: '100%',
                            marginY: '10px',
                        }}>
                        <hr
                        style={{
                            color: '#333',
                            backgroundColor: '#333',
                            height: 2,
                            borderColor : '#333',
                            opacity: '0.1'
                        }}/>
                        </Box>
                        <Grid
                        container={true}
                        direction="row"
                        spacing={0}
                        sx={{
                            display: 'flex',
                            width: '100%',
                            padding: '10px',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start'
                        }}>
                            <Box>
                                <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    marginY: '5px',
                                }}>
                                    <Typography
                                    sx={{
                                        fontSize: '16px',
                                        fontWeight: 500,
                                        color: '#999',
                                    }}>
                                        <CalendarMonth/>
                                    </Typography>
                                    <Typography
                                    sx={{
                                        fontSize: '16px',
                                        fontWeight: 500,
                                        marginLeft: '10px',
                                        color: '#999',
                                    }}>
                                        {props.selectedEvent.date}
                                    </Typography>
                                </Box>
                                <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    marginY: '5px',
                                }}>
                                    <Typography
                                    sx={{
                                        fontSize: '16px',
                                        fontWeight: 500,
                                        color: '#999',
                                    }}>
                                        <Place/>
                                    </Typography>
                                    <Typography
                                    sx={{
                                        fontSize: '16px',
                                        fontWeight: 500,
                                        marginLeft: '10px',
                                        color: '#999',
                                    }}>
                                        {props.selectedEvent.location}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                marginY: '5px',
                            }}>
                                <Box>
                                    <Typography
                                    sx={{
                                        fontSize: '16px',
                                        fontWeight: 500,
                                        color: '#999'
                                    }}>
                                        <AccessTime/>
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography
                                    sx={{
                                        fontSize: '16px',
                                        fontWeight: 500,
                                        marginLeft: '10px',
                                        color: '#999',
                                    }}>
                                        {props.selectedEvent.time}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    {/* tickets */}
                    <Grid
                    container={true}
                    direction="column"
                    spacing={0}
                    sx={{
                        display: 'flex',
                        marginLeft: '3%',
                        paddingX: '2%',
                        width: '40%',
                        height: '95%',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        borderLeft: '2px solid #ddd'
                    }}>
                        <Grid
                        container={true}
                        direction="column"
                        spacing={0}
                        sx={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            {tickets_content.map((index) => (
                                <Paper
                                key={`ticket-by-event-${index}`}
                                elevation={2}
                                sx={{
                                    marginY: '5px',
                                    width: '100%',
                                    borderRadius: '10px',
                                }}>
                                    <Grid
                                    container={true}
                                    direction="row"
                                    spacing={0}
                                    sx={{
                                        display: 'flex',
                                        width: '100%',
                                        paddingX: '10px',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                        <Grid
                                        container={true}
                                        direction="column"
                                        spacing={0}
                                        sx={{
                                            display: 'flex',
                                            width: '50%',
                                            paddingX: '10px',
                                            paddingY: '5px',
                                            justifyContent: 'center',
                                            alignItems: 'space-between',
                                        }}>
                                            <Box>
                                                <Typography
                                                sx={{
                                                    fontSize: '16px',
                                                    fontWeight: 600
                                                }}>
                                                    {tickets[index].name}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography
                                                sx={{
                                                    fontSize: '10px',
                                                    fontWeight: 400
                                                }}>
                                                    {tickets[index].description}
                                                </Typography>
                                            </Box>
                                            <Divider/>
                                            <Box
                                            sx={{
                                                width: '100%',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'space-between',
                                            }}>
                                                <Typography
                                                sx={{
                                                    fontSize: '12px',
                                                    fontWeight: 400
                                                }}>
                                                    stock: {props.selectedTicket.filter(e => e.id === tickets[index].id).length > 0 ? props.selectedTicket.find(e => e.id === tickets[index].id).stock_available.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : tickets[index].stock_available.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                </Typography>
                                                <Typography
                                                sx={{
                                                    fontSize: '12px',
                                                    fontWeight: 400
                                                }}>
                                                    Rp. {tickets[index].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid
                                        container={true}
                                        direction="row"
                                        spacing={0}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                            <Fab
                                            onClick={() => handleSubTicket(tickets[index])}
                                            size="small"
                                            variant='outlined'
                                            color='primary'
                                            sx={{
                                                minWidth: '30px',
                                                width: '30px',
                                                minHeight: '30px',
                                                height: '30px',
                                                marginX: '20px'
                                            }}>
                                                <Remove
                                                sx={{
                                                    margin: 0,
                                                    padding: 0,
                                                }}/>
                                            </Fab>
                                            <Typography
                                            sx={{
                                                fontSize: '24px',
                                                fontWeight: 600
                                            }}>{props.selectedTicket.filter(e => e.id === tickets[index].id).length > 0 ? props.selectedTicket.find(e => e.id === tickets[index].id).qty.toString() : 0}</Typography>
                                            <Fab
                                            onClick={() => handleAddTicket(tickets[index])}
                                            size="small"
                                            variant='outlined'
                                            color='primary'
                                            sx={{
                                                minWidth: '30px',
                                                width: '30px',
                                                minHeight: '30px',
                                                height: '30px',
                                                marginX: '20px'
                                            }}>
                                                <Add
                                                sx={{
                                                    margin: 0,
                                                    padding: 0,
                                                }}/>
                                            </Fab>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            ))}
                        </Grid>
                            <Card
                            elevation={5}
                            sx={{
                                borderRadius: '30px'
                            }}>
                                <Box
                                sx={{
                                    width: '300px',
                                    height: '50px',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                    <Box
                                    sx={{
                                        marginLeft: '10px'
                                    }}>
                                        <Typography
                                        sx={{
                                            fontWeight: 500
                                        }}>Rp. {props.totalBill.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Typography>
                                    </Box>

                                    {props.totalBill <= 0
                                        ?
                                        <Button
                                        disabled
                                        key={"checkout-button-enabled"}
                                        variant='contained'
                                        sx={{
                                            borderRadius: '30px',
                                            height: '100%',
                                        }}>
                                            <Typography
                                            sx={{
                                                fontSize: '18px',
                                                fontWeight: 600
                                            }}>Checkout</Typography>
                                        </Button>
                                        :
                                        <Button
                                        onClick={() => handleOpenDialogBayar()}
                                        key={"checkout-button-disabled"}
                                        variant='contained'
                                        sx={{
                                            borderRadius: '30px',
                                            height: '100%',
                                        }}>
                                            <Typography
                                            sx={{
                                                fontSize: '18px',
                                                fontWeight: 600
                                            }}>Checkout</Typography>
                                        </Button>
                                    }

                                </Box>
                            </Card>
                    </Grid>
                </Grid>
                :
                <Grid
                key={"pilih-ticket-mobile"}
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
                    <Swiper
                    style={conditionalSwiperMobileStyle()}
                    onSwiper={setSwiper}
                    touchMoveStopPropagation={false}
                    allowTouchMove={false}
                    autoHeight={true}
                    slidesPerView={1}
                    slidesPerGroup={1}>
                        {/* description slide */}
                        <SwiperSlide
                        style={{
                            width: '100%',
                            maxHeight: '100%',
                            overflow: 'auto'
                        }}>
                            <Grid
                            container={true}
                            direction="column"
                            spacing={0}
                            sx={{
                                display: 'flex',
                                width: '100%',
                                height: '100%',
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start'
                            }}>
                                <Box
                                sx={{
                                    width: '100%',
                                    overflow: 'hidden',
                                    borderRadius: '20px',
                                }}>
                                <img
                                    src={props.selectedEvent.image ? `http://127.0.0.1:8000${props.selectedEvent.image}` : mediaBanner[1]}
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
                                <Box
                                sx={{
                                    width: '100%',
                                    marginTop: '10px',
                                }}>
                                    <Typography
                                    sx={{
                                        letterSpacing: 0.25,
                                        fontSize: '20px',
                                        fontWeight: 600,
                                    }}>
                                        {props.selectedEvent.name}
                                    </Typography>
                                </Box>
                                <Box
                                sx={{
                                    width: '100%',
                                }}>
                                    <Typography
                                    sx={{
                                        letterSpacing: 0.15,
                                        fontSize: '16px',
                                        fontWeight: 500,
                                        color: '#999'
                                    }}>
                                        {props.selectedEvent.subtitle}
                                    </Typography>
                                </Box>
                                <Box
                                sx={{
                                    width: '100%',
                                    marginY: '10px',
                                }}>
                                <hr
                                style={{
                                    color: '#333',
                                    backgroundColor: '#333',
                                    height: 2,
                                    borderColor : '#333',
                                    opacity: '0.1'
                                }}/>
                                </Box>
                                <Grid
                                container={true}
                                direction="column"
                                spacing={0}
                                sx={{
                                    display: 'flex',
                                    width: '100%',
                                    padding: '10px',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start'
                                }}>
                                    <Box>
                                        <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            marginY: '5px',
                                        }}>
                                            <Typography
                                            sx={{
                                                fontSize: '12px',
                                                fontWeight: 500,
                                                color: '#999',
                                            }}>
                                                <CalendarMonth/>
                                            </Typography>
                                            <Typography
                                            sx={{
                                                fontSize: '12px',
                                                fontWeight: 500,
                                                marginLeft: '10px',
                                                color: '#999',
                                            }}>
                                                {props.selectedEvent.date}
                                            </Typography>
                                        </Box>
                                        <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            marginY: '5px',
                                        }}>
                                            <Typography
                                            sx={{
                                                fontSize: '12px',
                                                fontWeight: 500,
                                                color: '#999',
                                            }}>
                                                <Place/>
                                            </Typography>
                                            <Typography
                                            sx={{
                                                fontSize: '12px',
                                                fontWeight: 500,
                                                marginLeft: '10px',
                                                color: '#999',
                                            }}>
                                                {props.selectedEvent.location}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        marginY: '5px',
                                    }}>
                                        <Box>
                                            <Typography
                                            sx={{
                                                fontSize: '12px',
                                                fontWeight: 500,
                                                color: '#999'
                                            }}>
                                                <AccessTime/>
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography
                                            sx={{
                                                fontSize: '12px',
                                                fontWeight: 500,
                                                marginLeft: '10px',
                                                color: '#999',
                                            }}>
                                                {props.selectedEvent.time}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box
                                    sx={{
                                        marginTop: '20px',
                                        width: '100%',
                                    }}>
                                        <Button
                                        onClick={() => slideTo(1)}
                                        variant='contained'
                                        sx={{
                                            width: '100%',
                                            borderRadius: '20px',
                                        }}>
                                            <Grid
                                            container={true}
                                            direction="row"
                                            spacing={0}
                                            sx={{
                                                display: 'flex',
                                                width: '100%',
                                                height: '100%',
                                                padding: '10px',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}>
                                                <Box>
                                                    <Typography>
                                                        Beli Tiket
                                                    </Typography>
                                                </Box>
                                                <Box>
                                                    <ShoppingCart/>
                                                </Box>
                                            </Grid>
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </SwiperSlide>
                        {/* ticket slide */}
                        <SwiperSlide
                        style={{
                            width: '100%',
                            maxHeight: '100%',
                            overflow: 'auto'
                        }}>
                            <Grid
                            container={true}
                            direction="column"
                            spacing={0}
                            sx={{
                                display: 'flex',
                                width: '100%',
                                height: '540px',
                                paddingY: '10px',
                                justifyContent: 'space-between',
                                alignItems: 'flex-end',
                            }}>
                                <Grid
                                container={true}
                                direction="column"
                                spacing={0}
                                sx={{
                                    display: 'flex',
                                    width: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    {tickets_content.map((index) => (
                                        <Paper
                                        key={`ticket-by-event-${index}`}
                                        elevation={2}
                                        sx={{
                                            marginY: '10px',
                                            width: '95%',
                                            borderRadius: '10px',
                                        }}>
                                            {/* ticket */}
                                            <Grid
                                            container={true}
                                            direction="row"
                                            spacing={0}
                                            sx={{
                                                display: 'flex',
                                                width: '100%',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}>
                                                <Grid
                                                container={true}
                                                direction="column"
                                                spacing={0}
                                                sx={{
                                                    display: 'flex',
                                                    maxWidth: '40%',
                                                    padding: '10px',
                                                    justifyContent: 'center',
                                                    alignItems: 'space-between',
                                                }}>
                                                    <Box>
                                                        <Typography
                                                        sx={{
                                                            fontSize: '14px',
                                                            fontWeight: 600
                                                        }}>
                                                            {tickets[index].name}
                                                        </Typography>
                                                    </Box>
                                                    <Box>
                                                        <Typography
                                                        sx={{
                                                            fontSize: '10px',
                                                            fontWeight: 400
                                                        }}>
                                                            {tickets[index].description}
                                                        </Typography>
                                                    </Box>
                                                    <Box>
                                                        <Typography
                                                        sx={{
                                                            fontSize: '10px',
                                                            fontWeight: 400
                                                        }}>
                                                            stock: {props.selectedTicket.filter(e => e.id === tickets[index].id).length > 0 ? props.selectedTicket.find(e => e.id === tickets[index].id).stock_available.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : tickets[index].stock_available.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                        </Typography>
                                                    </Box>
                                                    <Divider/>
                                                    <Box>
                                                        <Typography
                                                        sx={{
                                                            fontSize: '12px',
                                                            fontWeight: 600
                                                        }}>
                                                            Rp. {tickets[index].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid
                                                container={true}
                                                direction="row"
                                                spacing={0}
                                                sx={{
                                                    display: 'flex',
                                                    width: '60%',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                }}>
                                                    <Fab
                                                    onClick={() => handleSubTicket(tickets[index])}
                                                    size="small"
                                                    variant='outlined'
                                                    color='primary'
                                                    sx={{
                                                        minWidth: '30px',
                                                        width: '30px',
                                                        minHeight: '30px',
                                                        height: '30px',
                                                        marginX: '20px'
                                                    }}>
                                                        <Remove
                                                        sx={{
                                                            margin: 0,
                                                            padding: 0,
                                                        }}/>
                                                    </Fab>
                                                    <Box>
                                                        <Typography
                                                        sx={{
                                                            fontSize: '24px',
                                                            fontWeight: 600
                                                        }}>{props.selectedTicket.filter(e => e.id === tickets[index].id).length > 0 ? props.selectedTicket.find(e => e.id === tickets[index].id).qty.toString() : 0}</Typography>
                                                    </Box>
                                                    <Fab
                                                    onClick={() => handleAddTicket(tickets[index])}
                                                    size="small"
                                                    variant='outlined'
                                                    color='primary'
                                                    sx={{
                                                        minWidth: '30px',
                                                        width: '30px',
                                                        minHeight: '30px',
                                                        height: '30px',
                                                        marginX: '20px'
                                                    }}>
                                                        <Add
                                                        sx={{
                                                            margin: 0,
                                                            padding: 0,
                                                        }}/>
                                                    </Fab>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    ))}
                                </Grid>
                                <Card
                                elevation={5}
                                sx={{
                                    marginX: '10px',
                                    borderRadius: '30px'
                                }}>
                                    <Box
                                    sx={{
                                        width: '250px',
                                        height: '50px',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                        <Box
                                        sx={{
                                            marginLeft: '10px'
                                        }}>
                                            <Typography
                                            sx={{
                                                fontWeight: 500
                                            }}>Rp. {props.totalBill.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Typography>
                                        </Box>

                                        {props.totalBill <= 0
                                            ?
                                            <Button
                                            disabled
                                            key={"checkout-button-enabled"}
                                            variant='contained'
                                            sx={{
                                                borderRadius: '30px',
                                                height: '100%',
                                            }}>
                                                <Typography
                                                sx={{
                                                    fontSize: '18px',
                                                    fontWeight: 600
                                                }}>Checkout</Typography>
                                            </Button>
                                            :
                                            <Button
                                            onClick={() => handleCheckoutButton()}
                                            key={"checkout-button-disabled"}
                                            variant='contained'
                                            sx={{
                                                borderRadius: '30px',
                                                height: '100%',
                                            }}>
                                                <Typography
                                                sx={{
                                                    fontSize: '18px',
                                                    fontWeight: 600
                                                }}>Checkout</Typography>
                                            </Button>
                                        }

                                    </Box>
                                </Card>
                            </Grid>
                        </SwiperSlide>
                        {/* bayar */}
                        <SwiperSlide
                        style={{
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
                                justifyContent: 'space-evenly',
                                alignItems: 'flex-end'
                            }}>
                                <Grid
                                container={true}
                                direction="column"
                                spacing={0}
                                sx={{
                                    display: 'flex',
                                    width: '100%',
                                    paddingY: '0px',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start'
                                }}>
                                    <Box
                                    sx={{
                                        width: '100%',
                                        padding: '8px',
                                    }}>
                                        <TextField
                                        value={name}
                                        onChange={value => handleChangeName(value)}
                                        autoComplete='off'
                                        label="Nama"
                                        placeholder='Loka'
                                        size="small"
                                        InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle/>
                                            </InputAdornment>
                                        ),
                                        }}
                                        sx={{
                                            width: '100%',
                                        }}
                                        variant="outlined"
                                        />
                                    </Box>

                                    <Box
                                    sx={{
                                        width: '100%',
                                        padding: '8px',
                                    }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="id" sx={{width: '100%'}}>
                                            <DatePicker
                                            value={dateOfBirth ? dateOfBirth : clearDate}
                                            onChange={value => handleChangeDateOfBirth(value)}
                                            format="DD-MM-YYYY"
                                            sx={{
                                                width: '100%'
                                            }}
                                            label="tanggal lahir"
                                            placeholder="31 Maret 1997"
                                            slotProps={{
                                                textField: {
                                                  helperText: dateOfBirthInvalidMessage,
                                                  error: !dateOfBirthValid,
                                                  size: 'small',
                                                  InputProps: { startAdornment: <CalendarMonth sx={{color: 'rgba(0, 0, 0, 0.54)', marginRight: '8px'}}/> }
                                                },
                                            }}
                                            renderInput={(params) => <TextField {...params} />}/>
                                        </LocalizationProvider>
                                    </Box>

                                    <Box
                                    sx={{
                                        width: '100%',
                                        padding: '8px',
                                    }}>
                                        <TextField
                                        value={phone}
                                        onChange={value => handleChangePhone(value)}
                                        autoComplete='off'
                                        label="Nomor Telepon"
                                        placeholder='08993011870'
                                        size="small"
                                        InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Phone/>
                                            </InputAdornment>
                                        ),
                                        }}
                                        sx={{
                                            width: '100%',
                                        }}
                                        variant="outlined"
                                        />
                                    </Box>

                                    <Box
                                    sx={{
                                        width: '100%',
                                        padding: '8px',
                                    }}>
                                        <TextField
                                        value={email}
                                        onChange={value => handleChangeEmail(value)}
                                        autoComplete='off'
                                        label="Email"
                                        placeholder='yourname@mail.com'
                                        size="small"
                                        helperText={emailInvalidMessage}
                                        error={!emailValid}
                                        InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Email/>
                                            </InputAdornment>
                                        ),
                                        }}
                                        sx={{
                                            width: '100%',
                                        }}
                                        variant="outlined"
                                        />
                                    </Box>

                                    <Box
                                    sx={{
                                        width: '100%',
                                        padding: '8px',
                                    }}>
                                        <TextField
                                        value={emailConfirmation}
                                        onChange={value => handleChangeEmailConfirmation(value)}
                                        autoComplete='off'
                                        label="Email Confirmation"
                                        placeholder='yourname@mail.com'
                                        size="small"
                                        helperText={emailConfirmationInvalidMessage}
                                        error={!emailConfirmationValid}
                                        InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Email/>
                                            </InputAdornment>
                                        ),
                                        }}
                                        sx={{
                                            width: '100%',
                                        }}
                                        variant="outlined"
                                        />
                                    </Box>

                                    <Box
                                    sx={{
                                        width: '100%',
                                        padding: '8px',
                                    }}>
                                        <TextField
                                        value={address}
                                        onChange={value => handleChangeAddress(value)}
                                        autoComplete='off'
                                        label="Alamat"
                                        placeholder='Jalan Fatmawati no. 154 Lopait'
                                        size="small"
                                        InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LocationOn/>
                                            </InputAdornment>
                                        ),
                                        }}
                                        sx={{
                                            width: '100%',
                                        }}
                                        variant="outlined"
                                        />
                                    </Box>
                                    <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        width: '100%',
                                        padding: '8px',
                                    }}>
                                        <Checkbox
                                        value={isTNC}
                                        onChange={() => handleCheckTNC()}
                                        />
                                        <Typography
                                        sx={{
                                            width: '100%',
                                            display: 'inline',
                                            fontSize: '10px',
                                        }}
                                        component='div'>I agree with <a onClick={() => handleDialogOpenTNC()} style={{fontSize: '10px', color: '#4b78bf', cursor: 'pointer'}}>Term And Condition</a> and Privacy Policy of Saloka Theme Park</Typography>
                                    </Box>

                                </Grid>
                                <Card
                                elevation={5}
                                sx={{
                                    marginX: '10px',
                                    borderRadius: '30px'
                                }}>
                                    <Box
                                    sx={{
                                        width: '250px',
                                        height: '50px',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                        <Box
                                        sx={{
                                            marginLeft: '10px'
                                        }}>
                                            <Typography
                                            sx={{
                                                fontWeight: 500
                                            }}>Rp. {props.totalBill.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Typography>
                                        </Box>

                                        {!canSubmit
                                            ?
                                            <Button
                                            disabled
                                            key={"checkout-button-enabled"}
                                            variant='contained'
                                            sx={{
                                                borderRadius: '30px',
                                                height: '100%',
                                            }}>
                                                <Typography
                                                sx={{
                                                    fontSize: '18px',
                                                    fontWeight: 600
                                                }}>Bayar</Typography>
                                            </Button>
                                            :
                                            <Button
                                            onClick={() => handleDialogOpen()}
                                            key={"checkout-button-disabled"}
                                            variant='contained'
                                            sx={{
                                                borderRadius: '30px',
                                                height: '100%',
                                            }}>
                                                <Typography
                                                sx={{
                                                    fontSize: '18px',
                                                    fontWeight: 600
                                                }}>Bayar</Typography>
                                            </Button>
                                        }

                                    </Box>
                                </Card>
                            </Grid>
                        </SwiperSlide>
                    </Swiper>
                </Grid>
            }
            {/* Warning Email */}
            <Dialog
            open={openDialog}
            onClose={handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                Perhatian!!!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Typography
                        paragraph={true}
                        textAlign={'justify'}
                        >
                            Kami akan mengirimkan e-ticket ke alamat email anda. Pastikan alamat email aktif dan dapat menerima email kami
                        </Typography>
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        <Box
                        sx={{
                            marginTop: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Typography
                            sx={{
                                fontSize: '24px',
                                fontWeight: 600,
                                color: 'secondary.main'
                            }}>
                                {email}
                            </Typography>
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>cancel</Button>
                    <Button onClick={handleBayar} autoFocus>
                        next
                    </Button>
                </DialogActions>
            </Dialog>

            {/* TNC */}
            <Dialog
            open={openDialogTNC}
            onClose={handleDialogCloseTNC}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                Term and Condition
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Grid
                        container={true}
                        direction="column"
                        spacing={0}
                        sx={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Box>
                                <Typography
                                sx={{
                                    fontSize: '18px',
                                    fontWeight: 600
                                }}>
                                    Ketentuan Penggunaan E-Ticket Tiketapasaja.Com :
                                </Typography>
                            </Box>

                            <Box
                            sx={{
                                width: '80%'
                            }}>
                                <Typography
                                textAlign={'justify'}
                                paragraph={true}
                                sx={{
                                    marginTop: '10px',
                                    fontSize: '14px',
                                    fontWeight: 400,
                                    lineHeight: 1.5,
                                }}>
                                    E-ticket Tiketapasaja.com yang sah adalah e-ticket yang dibeli dengan tata cara yang telah ditentukan yaitu pembelian secara online melalui transaksi elektronik pada website www.tiketapasaja.com, ataupun autorized partner resmi.
                                    Pembeli dianjurkan untuk mencetak e-ticket satu kali untuk satu id transaksi yang dibelinya, untuk menghindari resiko penggunaan e-ticket oleh pihak lain.
                                    E-ticket menggunakan barcode dan berlaku untuk satu kali penggunaan.
                                </Typography>
                                <Typography
                                textAlign={'justify'}
                                paragraph={true}
                                sx={{
                                    fontSize: '14px',
                                    fontWeight: 400,
                                    lineHeight: 1.5,
                                }}>
                                    Penyelenggara berhak untuk memproses dan menuntut secara hukum sesuai dengan ketentuan perundangan yang berlaku baik secara perdata maupun pidana terhadap orang-orang yang memperoleh e-ticket dengan cara yang tidak sah termasuk tapi tidak terbatas dengan cara melakukan pemalsuan atau menggandakan e-ticket yang sah atau memperoleh e-ticket dengan cara yang tidak sesuai.
                                    Dilarang menggandakan e-ticket. Penyelenggara dan Tiketapasaja.Com tidak bertanggungjawab atas kelalaian pembeli tiket yang mengakibatkan e-ticket jatuh ke tangan orang lain (dalam penguasaan orang lain) untuk dipergunakan sebagai tanda masuk tempat pertunjukan yang menghilangkan hak dari pembeli tiket.
                                    E-ticket tidak dapat ditukar dan tidak dapat diuangkan kembali.
                                </Typography>
                                <Typography
                                textAlign={'justify'}
                                paragraph={true}
                                sx={{
                                    fontSize: '14px',
                                    fontWeight: 400,
                                    lineHeight: 1.5,
                                }}>
                                    Penukaran tiket asli yang diwakilkan oleh orang lain harus disertai dengan surat kuasa dan fotocopy identitas pembeli.
                                    Informasi waktu dan tempat penukaran tiket asli akan selalu diupdate di instagram @tiketapasaja
                                    Tiket yang sah adalah e-ticket yang sudah ditukarkan dengan tiket asli sebagai tanda masuk acara.
                                </Typography>
                                <Typography
                                textAlign={'justify'}
                                paragraph={true}
                                sx={{
                                    fontSize: '14px',
                                    fontWeight: 400,
                                    lineHeight: 1.5,
                                }}>
                                    Teliti terlebih dahulu dalam pembelian, karena apabila ada kesalahan yang disebabkan oleh peng inputan data oleh pembeli, maka e ticket / e voucher tidak dapat di refund.
                                    Billing yang tercatat adalah Nicepay Online Payment.
                                </Typography>
                            </Box>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogCloseTNC}>cancel</Button>
                </DialogActions>
            </Dialog>

            </ThemeProvider>
        </>
    )
}
