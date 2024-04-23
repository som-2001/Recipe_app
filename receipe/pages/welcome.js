import * as React from 'react';
import MiniDrawer from '../components/MiniDrawer';
import { Box, Button, CardMedia, Grid, TextField, Typography } from '@mui/material';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import GoogleIcon from '@mui/icons-material/Google';
import styles from '../styles/Home.module.css'
import LockPersonIcon from '@mui/icons-material/LockPerson';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast, Toaster } from 'sonner';
import { NEXT_APP_BASE_URL } from '@/components/Env';
import Swapper from '@/components/Swapper';

export default function SplitButton() {


    const [input, setInput] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [Otp, setOtp] = React.useState(null);
    const [token, setToken] = React.useState(null);
    const [text, setText] = React.useState(false);
    const [show, setShow] = React.useState(true);


    const router = useRouter();

    const timeline = gsap.timeline({
        repeat: -1,
        repeatDelay: 1,
        scaleX: 1,
        y: -70
    });

    useGSAP(() => {

        gsap.fromTo("#button", {
            opacity: 0,
            y: -50
        }, {
            opacity: 1,
            y: 0,
            delay: 0.5
        })

        gsap.fromTo("#title", {
            opacity: 0,
            y: -50
        }, {
            opacity: 1,
            y: 0,
            delay: 1.2
        })

        gsap.fromTo("#form", {
            opacity: 0,
            y: -50
        }, {
            opacity: 1,
            y: 0,
            delay: 1.4
        })

        gsap.fromTo("#button", {
            opacity: 0,
            y: -50
        }, {
            opacity: 1,
            y: 0,
            delay: 1.6
        })



    }, [])

    const verifyOtp = () => {
            
        axios.post(`${NEXT_APP_BASE_URL}/verify-otp`, { email: input, password: password, name: name, username: username, otp: Otp, token: token }).then(response => {

            console.log(response);
            if (response.data.error) {
                toast(response.data.error);
            } 
            if(response.data==='User registered Successfully')
                router.push('/hi');
            
        })

    }
    const getOtp = () => {

        console.log(NEXT_APP_BASE_URL);
        axios.post(`${NEXT_APP_BASE_URL}/otp`, { email: input, password: password, name: name, username: username }).then(response => {

            if (response.data.error) {

                toast.warning(response.data.error);
            } else {
                setShow(!show);
                toast.success('Otp has sent to your email')
                setToken(response.data.token);
            }
        })
    }
    return (
        <Box style={{ background: "black", color: 'white', backgroundRepeat: "no-repeat", backgroundSize: 'contain', overflowX: 'hidden' }} sx={{
            height: { xs: '100vh', lg: '100vh' },
            marginTop: { xs: '3rem', lg: "3.5rem" },
            paddingBottom: '1rem',
            overflow: { lg: 'hidden' },
            fontStretch: 'extra-condensed',
                    fontFamily: 'math',
                    fontWeight: '500',
                    fontVariant: 'small-caps'
        }}>
            <MiniDrawer />

            <Grid container spacing={2} id="form">

                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={7}
                    style={{
                        justifyContent: 'center',
                        textAlign: "center",

                    }}

                >
                    <center id='form'><Box sx={{
                        marginTop:{sm:'2rem',xs:'2rem',md:'8rem',lg: "10rem"},
                       
                    }}>
                    <Swapper/>
                    </Box></center>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={5} style={{ justifyContent: "center", textAlign: "center" }}>
                    <Box sx={{ marginTop: "2rem" }}>

                        <Toaster position='top-right' reverseOrder={false} autoClosing={3000} style={{ marginTop: '0.2rem' }} />

                        <Typography variant='h4' id="title" style={{ margin: "40px 0px 0px 0px", display: "flex", justifyContent: "center", color: "#86868b" }}>Welcome !!!<Typography variant='span' > <InsertEmoticonIcon style={{ fontSize: "2.5rem", marginLeft: '5px', color: '#86868b' }} /></Typography></Typography>
                        <Typography variant='p' id="title" style={{ display: "flex", justifyContent: "center", marginBottom: "20px", color: '#86868b',fontSize:'1.0rem' }}>Keep connected with us </Typography>

                    </Box>

                    {show ? <Box><Box style={{ color: "white" }}>
                        <TextField
                            id="outlined-basic"
                            label="Email"
                            type="email"
                            helperText=" "
                            varient="outlined"
                            placeholder='johndoe@gmail.com'
                            color="success"
                            onChange={(e) => { setInput(e.target.value); }}
                            InputProps={{ // Use InputProps to customize input properties
                                startAdornment: ( // Use startAdornment to add an icon at the start
                                    <AttachEmailIcon style={{ color: 'white', position: 'relative', right: '5px', marginRight: "5px", color: "#8FEDF3" }} /> // Add the icon component here
                                )
                            }}
                            sx={{
                                width: { xs: '300px', sm: "350px", lg: "450px", md: "400px" },
                                '& .MuiOutlinedInput-root': { // targeting the root element of the outlined input
                                    '& fieldset': { // targeting the fieldset element
                                        borderColor: 'white',
                                        // color: 'white !important'// setting border color to white
                                    },
                                    '&:hover fieldset': { // targeting the fieldset element on hover
                                        borderColor: 'white', // setting border color to white on hover
                                    },
                                    '&.Mui-focused fieldset': { // targeting the fieldset element when focused
                                        borderColor: 'white',
                                        // setting border color to white when focused
                                    },
                                    '& input': { // targeting the input element within the outlined input
                                        color: 'white', // setting text color to white
                                    },
                                },
                                '& .MuiInputLabel-root': { // targeting the root element of the input label
                                    color: 'white', // setting label color to white
                                },

                            }}
                        />
                    </Box>

                        <Box>
                            <TextField

                                id="outlined-basic1"
                                type={text ? ('text') : ('password')}
                                label="password"
                                helperText=" "
                                varient="outlined"
                                color="success"
                                placeholder='password...'
                                onChange={(e) => { setPassword(e.target.value); }}
                                InputProps={{ // Use InputProps to customize input properties
                                    startAdornment: ( // Use startAdornment to add an icon at the start
                                        <LockPersonIcon style={{ color: 'white', position: 'relative', right: '5px', marginRight: "5px", color: "#8FEDF3" }} /> // Add the icon component here
                                    ),
                                    endAdornment: (
                                        text ? (<VisibilityOffIcon onClick={(e) => { setText(!text) }} style={{ color: 'white', position: 'relative', right: '0px', marginRight: "5px", color: "#8FEDF3", cursor: "pointer" }} />) : (<RemoveRedEyeIcon onClick={(e) => { setText(!text) }} style={{ color: 'white', position: 'relative', right: '0px', marginRight: "5px", color: "#8FEDF3", cursor: "pointer" }} />)

                                    )
                                }}
                                sx={{
                                    width: { xs: '300px', sm: "350px", lg: "450px", md: "400px" },
                                    '& .MuiOutlinedInput-root': { // targeting the root element of the outlined input
                                        '& fieldset': { // targeting the fieldset element
                                            borderColor: 'white', // setting border color to white
                                        },
                                        '&:hover fieldset': { // targeting the fieldset element on hover
                                            borderColor: 'white', // setting border color to white on hover
                                        },
                                        '&.Mui-focused fieldset': { // targeting the fieldset element when focused
                                            borderColor: 'white', // setting border color to white when focused
                                        },
                                        '& input': { // targeting the input element within the outlined input
                                            color: 'white', // setting text color to white
                                        },
                                    },
                                    '& .MuiInputLabel-root': { // targeting the root element of the input label
                                        color: 'white', // setting label color to white
                                    },
                                }}
                            />
                        </Box>
                        <Box style={{ color: "white" }}>
                            <TextField
                                id="outlined-basic"
                                label="name"
                                type="text"
                                helperText=" "
                                varient="outlined"
                                placeholder='john  doe...'
                                color="success"
                                onChange={(e) => { setName(e.target.value); }}
                                InputProps={{ // Use InputProps to customize input properties
                                    startAdornment: ( // Use startAdornment to add an icon at the start
                                        <AttachEmailIcon style={{ color: 'white', position: 'relative', right: '5px', marginRight: "5px", color: "#8FEDF3" }} /> // Add the icon component here
                                    )
                                }}
                                sx={{
                                    width: { xs: '300px', sm: "350px", lg: "450px", md: "400px" },
                                    '& .MuiOutlinedInput-root': { // targeting the root element of the outlined input
                                        '& fieldset': { // targeting the fieldset element
                                            borderColor: 'white',
                                            // color: 'white !important'// setting border color to white
                                        },
                                        '&:hover fieldset': { // targeting the fieldset element on hover
                                            borderColor: 'white', // setting border color to white on hover
                                        },
                                        '&.Mui-focused fieldset': { // targeting the fieldset element when focused
                                            borderColor: 'white',
                                            // setting border color to white when focused
                                        },
                                        '& input': { // targeting the input element within the outlined input
                                            color: 'white', // setting text color to white
                                        },
                                    },
                                    '& .MuiInputLabel-root': { // targeting the root element of the input label
                                        color: 'white', // setting label color to white
                                    },

                                }}
                            />
                        </Box>
                        <Box style={{ color: "white" }}>
                            <TextField
                                id="outlined-basic"
                                label="username"
                                type="text"
                                helperText=" "
                                varient="outlined"
                                placeholder='john_doe@2001...'
                                color="success"
                                onChange={(e) => { setUsername(e.target.value); }}

                                InputProps={{ // Use InputProps to customize input properties
                                    startAdornment: ( // Use startAdornment to add an icon at the start
                                        <AttachEmailIcon style={{ color: 'white', position: 'relative', right: '5px', marginRight: "5px", color: "#8FEDF3" }} /> // Add the icon component here
                                    )
                                }}
                                sx={{
                                    width: { xs: '300px', sm: "350px", lg: "450px", md: "400px" },
                                    '& .MuiOutlinedInput-root': { // targeting the root element of the outlined input
                                        '& fieldset': { // targeting the fieldset element
                                            borderColor: 'white',
                                            // color: 'white !important'// setting border color to white
                                        },
                                        '&:hover fieldset': { // targeting the fieldset element on hover
                                            borderColor: 'white', // setting border color to white on hover
                                        },
                                        '&.Mui-focused fieldset': { // targeting the fieldset element when focused
                                            borderColor: 'white',
                                            // setting border color to white when focused
                                        },
                                        '& input': { // targeting the input element within the outlined input
                                            color: 'white', // setting text color to white
                                        },
                                    },
                                    '& .MuiInputLabel-root': { // targeting the root element of the input label
                                        color: 'white', // setting label color to white
                                    },

                                }}
                            />
                        </Box>
                        <Button type="submit" variant='contained' id="button" style={{ marginBottom: "1rem" }} color='primary' sx={{
                            width:
                                { xs: '150px', sm: '150px', md: '200px', lg: '200px' }
                        }} onClick={getOtp}>Get Otp</Button>
                        <Box>
                            <Typography variant='p' style={{ color: 'white' }}>Already exist? <span style={{ color: '#82b1ff' }} onClick={(e)=>router.push('/hi')}>Log in</span></Typography>
                        </Box>
                    </Box> : <Box style={{marginTop:"5rem"}}>

                        <Typography variant='h6'>
                            Put the OTP received in your email here :
                        </Typography>
                        <Box>
                            <TextField  type="text"
                                onChange={(e) => { setOtp(e.target.value) }} 
                                sx={{
                                    width: { xs: '300px', sm: "350px", lg: "400px", md: "400px" },
                                    marginBottom:'20px',
                                    marginTop:"20px",
                                    '& .MuiOutlinedInput-root': { // targeting the root element of the outlined input
                                        '& fieldset': { // targeting the fieldset element
                                            borderColor: 'white',
                                            // color: 'white !important'// setting border color to white
                                        },
                                        '&:hover fieldset': { // targeting the fieldset element on hover
                                            borderColor: 'white', // setting border color to white on hover
                                        },
                                        '&.Mui-focused fieldset': { // targeting the fieldset element when focused
                                            borderColor: 'white',
                                            // setting border color to white when focused
                                        },
                                        '& input': { // targeting the input element within the outlined input
                                            color: 'white', // setting text color to white
                                        },
                                    },
                                    '& .MuiInputLabel-root': { // targeting the root element of the input label
                                        color: 'white', // setting label color to white
                                    },

                                }}   
                                />

                        </Box>
                        <Button variant='contained' onClick={verifyOtp} >Verify</Button>
                    </Box>}

                </Grid>
            </Grid>

        </Box>
    );
}