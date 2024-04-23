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
import { NEXT_APP_BASE_URL } from '@/components/Env';
import Swapper from '@/components/Swapper';
import {toast,Toaster} from 'sonner'


export default function SplitButton() {


    const [input, setInput] = React.useState("");
    const [password, setPassword] = React.useState('');
    const [text, setText] = React.useState(false);

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

        timeline.to(
            "#progress",
            {
                y: 9,
                rotate: "0",
                ease: "bounce.out",
                duration: 5
            }
        )
        timeline.to("#progress", {
            x: 430,
            rotate: "0",
            ease: 'power1.in',
            duration: 9
        })
        timeline.to("#progress", {
            y: 300,
            x: 580,
            ease: 'back.Out',
            transform: 'scaleX(-1)',
            duration: 9
        })

        timeline.to("#progress", {
            x: 100,
            duration: 5,
            ease: 'bounce.in'
        })

        timeline.to("#progress", {
            x: 0,
            y: 0,
            transform: 'scaleX(1) scaleY(1)',
            duration: 5,

        })

    }, [])

    const login = () => {

        if(input==='') return toast.error('email is required');
        if(password==='') return toast.error('password is required');
  

        axios.post(`${NEXT_APP_BASE_URL}/login`, { email: input, password: password }).then(res => {
            console.log(res.data)

           

            if (res.data.success === 'success') {
               
                localStorage.setItem('id', res.data.result._id);
                localStorage.setItem('email', res.data.result.email);
                localStorage.setItem('name', res.data.result.name);
                localStorage.setItem('username', res.data.result.username);
                localStorage.setItem('image', res.data.result.image);
                router.push('/');
            }else{
                toast.error(res.data.error);
            }
        })
    }
    return (
        <Box style={{ background: "black", color: 'white', backgroundRepeat: "no-repeat", backgroundSize: 'contain', overflowX: 'hidden' }} sx={{
            height: { xs: '100%', lg: '100%' },
            marginTop: { xs: '3rem', lg: "3.5rem" },
            paddingBottom: '1rem',
            overflow: { lg: 'hidden' },
            fontStretch: 'extra-condensed',
                    fontFamily: 'math',
                    fontWeight: '500',
                    fontVariant: 'small-caps'
        }}>
            <MiniDrawer />

            <Toaster position='top-right' autoClose={3000}/>

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
                        marginTop:{sm:'2rem',xs:'2rem',md:'8rem',lg: "10rem"}
                    }}>
                    <Swapper/>
                    </Box></center>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={5} style={{ justifyContent: "center", textAlign: "center" }}>
                    <Box>
                        <Typography variant='h4' id="title" style={{ margin: "40px 0px 0px 0px", display: "flex", justifyContent: "center", color: "#86868b",fontSize:"2.7rem" }}>Welcome Back<Typography variant='span' > <InsertEmoticonIcon style={{ fontSize: "2.5rem", marginLeft: '5px', color: '#86868b',marginTop:'4px' }} /></Typography></Typography>
                        <Typography variant='p' id="title" style={{ display: "flex", justifyContent: "center", marginBottom: "20px", color: '#86868b' }}>Keep connected with us please login with personal info</Typography>
                        <div id="progress" style={{ display: "flex", justifyContent: "center", marginBottom: "10px", backgroundColor: "transparent", width: "50px", height: "50px", borderRadius: "10px" }}><DirectionsBikeIcon style={{ fontSize: "3.5rem", marginLeft: '5px', color: "#86868b", marginLeft: "200px" }} /></div>
                    </Box>

                    <Box style={{ color: "white" }}>
                        <TextField
                            id="outlined-basic"
                            label="Email"
                            type="email"
                            helperText=" "
                            varient="outlined"
                            placeholder='johndoe@gmail.com'
                            color="success"
                            onChange={(e) => { setInput(e.target.value); }}
                            InputProps={{
                                startAdornment: ( 
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
                            onChange={(e) => setPassword(e.target.value)}
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
                    <Button type="submit" variant='outlined' id="button" style={{ marginBottom: "1rem" }} color='primary' sx={{
                        width:
                            { xs: '150px', sm: '150px', md: '200px', lg: '200px' }
                    }} onClick={login}>Submit</Button>
                    <Box>
                        <Typography variant='p' style={{ color: 'white' }}>New member? <span style={{ color: '#82b1ff' }} onClick={(e) => router.push('/welcome')}>Register Now</span></Typography>
                    </Box>
                    <hr style={{ marginTop: "57px", width: "85%", color: '#8FEDF3' }}></hr>
                    <Button variant='outlined'>sign in with <GoogleIcon style={{ color: "white", fontSize: "2.0rem", marginLeft: '5px' }} /></Button>
                    <div style={{ marginBottom: "100px" }}></div>

                </Grid>
            </Grid>

        </Box>
    );
}