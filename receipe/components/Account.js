import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button, Grid } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BadgeIcon from '@mui/icons-material/Badge';
import ScreenLockPortraitIcon from '@mui/icons-material/ScreenLockPortrait';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import styles from "../styles/Home.module.css"
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import PermScanWifiOutlinedIcon from '@mui/icons-material/PermScanWifiOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import PrivacyTipOutlinedIcon from '@mui/icons-material/PrivacyTipOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ManIcon from '@mui/icons-material/Man';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SettingsPhoneOutlinedIcon from '@mui/icons-material/SettingsPhoneOutlined';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux';
import { imageChange } from '@/reduxtoolkit/Slice';
import { NEXT_APP_BASE_URL } from './Env';


export default function Account() {
 
    const dispatch=useDispatch();
    const {image}= useSelector(state => state.msg)

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        console.log(file);
        
        var formdata=new FormData();
        formdata.append('image',file);
        formdata.append('id',localStorage.getItem('id'));

        axios.post(`${NEXT_APP_BASE_URL}/change`,formdata).then(res=>{
            
            localStorage.setItem('image',res.data);
            dispatch(imageChange(res.data));
        })
        alert("Profile picture changed successfully");
    };

    
    return (
        <List sx={{ width: '100%', maxWidth: 900, background: "transparent",fontStretch: 'extra-condensed',
        fontFamily: 'math',
        fontWeight: '500',
        fontVariant: 'small-caps'}}>

            <div style={{ alignItems: "center" }}>
                <Typography variant='h5' style={{ marginLeft: "-5px", marginBottom: "1rem", fontWeight: "700", color: "#0d47a1" }}>Your Account</Typography>
                <Divider variant="inset" component="li" style={{ marginLeft: "-100px", marginBottom: "20px" }} />
                <ListItem alignItems="flex-start">
                    <Grid container spacing={2} justifyContent="center">

                        <Grid item xs={6} sm={6} md={6} lg={6}>

                            {/* <Typography style={{ marginLeft: "-20px", color: "#448aff" }} >Your profile info is now secure</Typography> */}
                            <div style={{ display: "flex" }}>
                                <span style={{ marginLeft: "-20px", paddingTop: "3px", paddingRight: "6px", color: "#2962ff" }}><PrivacyTipOutlinedIcon /></span>
                                <Typography variant='h6' style={{ color: "#448aff" }} >Your profile info is now secure</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <ListItemAvatar style={{ display: 'flex', justifyContent: 'center' }}>

                                <ScreenLockPortraitIcon style={{ marginTop: "-25px", width: "50px", height: "50px", color: "#64b5f6" }} />
                            </ListItemAvatar>
                        </Grid>
                    </Grid>

                </ListItem>
                <Typography variant='h6' style={{ marginBottom: "20px" }} >Personal info and options to manage it. You can make some of this info, like your contact details, visible to others so they can reach you easily. You can also see a summary of yours profiles.</Typography>

            </div>

            <Divider variant="inset" component="li" style={{ marginLeft: "-100px", marginBottom: "20px" }} />
            <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex" }}>
                    <span style={{ paddingTop: "3px", paddingRight: "6px", color: "#2962ff" }}><InfoOutlinedIcon /></span>
                    <Typography variant='h6' style={{ color: "#448aff" }} >Basic info</Typography>
                </div>

                <Typography
                    variant='span' class={styles.account}
                >
                    Some info may visible to other people.
                </Typography><br />

                <div style={{ marginBottom: "20px", marginTop: "30px" }} class={styles.account}>
                    <div style={{ display: "flex" }}>
                        <span style={{ paddingTop: "3px", paddingRight: "6px", color: "#2962ff" }}><AccountCircleOutlinedIcon /></span>
                        <Typography variant='h6' style={{ color: "#448aff" }} >PROFILE ICON</Typography>
                    </div>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Typography class={styles.account}>A profile picture personalize your account</Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <ListItemAvatar style={{ display: 'flex', justifyContent: 'center', position: 'relative' }} >
                                <Avatar
                                    alt="Travis Howard"
                                    src={localStorage.getItem('image') === 'https://mui.com/static/images/avatar/2.jpg' ? localStorage.getItem('name').charAt(0) : `../images/${localStorage.getItem('image')}`}
                                    style={{ width: "70px", height: "70px", marginLeft: "30px" }}
                                    
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, zIndex: 1 }}
                                    onChange={handleImageChange}
                                    // ref={fileInputRef} // Reference to file input element
                                />
                            </ListItemAvatar>

                        </Grid>
                    </Grid>
                </div>


                <div style={{ marginBottom: "20px" }}>
                    <div style={{ display: "flex" }}>
                        <span style={{ paddingTop: "3px", paddingRight: "6px", color: "#2962ff" }}><DriveFileRenameOutlineOutlinedIcon /></span>
                        <Typography variant='h6' style={{ color: "#448aff" }} >NAME</Typography>
                    </div>

                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Typography variant='h6'>{localStorage.getItem('name')}</Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Typography variant='h6' style={{ display: 'flex', justifyContent: 'center', marginTop: "-35px", color: "#0d47a1" }}>{">"}</Typography>
                        </Grid>
                    </Grid>

                </div>

                <div style={{ marginBottom: "20px" }}>
                    <div style={{ display: "flex" }}>
                        <span style={{ paddingTop: "3px", paddingRight: "6px", color: "#2962ff" }}><DriveFileRenameOutlineOutlinedIcon /></span>
                        <Typography variant='h6' style={{ color: "#448aff" }} >User NAME</Typography>
                    </div>

                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Typography variant='h6'>{localStorage.getItem('username')}</Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Typography variant='h6' style={{ display: 'flex', justifyContent: 'center', marginTop: "-35px", color: "#0d47a1" }}>{">"}</Typography>
                        </Grid>
                    </Grid>

                </div>

                <div style={{ marginBottom: "20px" }}>
                    <div style={{ display: "flex" }}>
                        <span style={{ paddingTop: "3px", paddingRight: "6px", color: "#2962ff" }}><CakeOutlinedIcon /></span>
                        <Typography variant='h6' style={{ color: "#448aff" }} >BIRTHDAY</Typography>
                    </div>

                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Typography>NOVEMBER 5, 2001</Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Typography variant='h6' style={{ display: 'flex', justifyContent: 'center', color: "#0d47a1" }}>{">"}</Typography>
                        </Grid>
                    </Grid>

                </div>


                <div style={{ marginBottom: "20px" }}>
                    <div style={{ display: "flex" }}>
                        <span style={{ paddingTop: "3px", paddingRight: "6px", color: "#2962ff" }}><ManIcon /></span>
                        <Typography variant='h6' style={{ color: "#448aff" }} >GENDER</Typography>
                    </div>

                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Typography variant='h6'>Male</Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Typography variant='h6' style={{ display: 'flex', justifyContent: 'center', color: "#0d47a1" }}>{">"}</Typography>
                        </Grid>
                    </Grid>

                </div>

            </div>

            <Divider variant="inset" color='black' component="li" style={{ marginLeft: "-100px", marginBottom: "20px" }} />



            <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex" }}>
                    <span style={{ paddingTop: "3px", paddingRight: "6px", color: "#2962ff" }}><PermContactCalendarIcon /></span>
                    <Typography variant='h6' style={{ color: "#448aff" }} >Contact info</Typography>
                </div>

                <Typography class={styles.account}>
                    Contact information is private and securely stored in your account.
                </Typography><br />


                <div style={{ marginBottom: "20px", marginTop: "20px" }}>

                    <div style={{ display: "flex" }}>
                        <span style={{ paddingTop: "3px", paddingRight: "6px", color: "#2962ff" }}><EmailOutlinedIcon /></span>
                        <Typography variant='h6' style={{ color: "#448aff" }} >EMAIL</Typography>
                    </div>

                    <Grid container spacing={2} sx={{ flexWrap: "wrap" }}>
                        <Grid item xs={7} sm={6} md={6} lg={6} sx={{ flexWrap: "wrap" }}>
                            <Typography variant='h6' style={{ wordWrap: 'break-word' }}>{localStorage.getItem('email')}</Typography>
                        </Grid>
                        <Grid item xs={4} sm={6} md={6} lg={6}>
                            <Typography variant='h6' style={{ display: 'flex', justifyContent: 'center', marginTop: "-35px", color: "#0d47a1" }}>{">"}</Typography>
                        </Grid>
                    </Grid>

                </div>

                <div style={{ marginBottom: "20px" }}>
                    <div style={{ display: "flex" }}>
                        <span style={{ paddingTop: "3px", paddingRight: "6px", color: "#2962ff" }}><SettingsPhoneOutlinedIcon /></span>
                        <Typography variant='h6' style={{ color: "#448aff" }} >PHONE</Typography>
                    </div>

                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Typography variant='h6'>7718456257</Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Typography variant='h6' style={{ display: 'flex', justifyContent: 'center', color: "#0d47a1" }}>{">"}</Typography>
                        </Grid>
                    </Grid>

                </div>

            </div   >

            <Divider variant="inset" color='black' component="li" style={{ marginLeft: "-100px", marginBottom: "20px" }} />

            <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex" }}>
                    <span style={{ paddingTop: "3px", paddingRight: "6px", color: "#2962ff" }}><ImportContactsOutlinedIcon /></span>
                    <Typography variant='h6' style={{ color: "#448aff" }} >Address</Typography>
                </div>

                <Typography class={styles.account}>
                    You can share your address with others.
                </Typography><br />

                <div style={{ marginBottom: "20px", marginTop: "20px" }}>
                    <div style={{ display: "flex" }}>
                        <span style={{ paddingTop: "3px", paddingRight: "6px", color: "#2962ff" }}><HomeOutlinedIcon /></span>
                        <Typography variant='h6' style={{ color: "#448aff" }} >HOME</Typography>
                    </div>

                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Typography variant='h6' >Katjuridanga, Bankura, West Bengal</Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Typography variant='h6' style={{ display: 'flex', justifyContent: 'center', color: "#0d47a1" }}>{">"}</Typography>
                        </Grid>
                    </Grid>

                </div>

                <div style={{ marginBottom: "20px" }}>
                    <div style={{ display: "flex" }}>
                        <span style={{ paddingTop: "3px", paddingRight: "6px", color: "#2962ff" }}><BusinessOutlinedIcon /></span>
                        <Typography variant='h6' style={{ color: "#448aff" }} >Other address</Typography>
                    </div>

                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Typography>None</Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Typography variant='h6' style={{ display: 'flex', justifyContent: 'center', color: "#0d47a1" }}>{">"}</Typography>
                        </Grid>
                    </Grid>

                </div>

            </div>


            <Divider variant="inset" color='black' component="li" style={{ marginLeft: "-100px", marginBottom: "20px" }} />

            <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex" }}>
                    <span style={{ paddingTop: "3px", paddingRight: "6px", color: "#2962ff" }}><PermScanWifiOutlinedIcon /></span>
                    <Typography variant='h6' style={{ color: "#448aff" }} >Other info</Typography>
                </div>

                <div style={{ marginBottom: "20px", marginTop: "20px" }}>
                    <div style={{ display: "flex" }}>
                        <span style={{ paddingTop: "3px", paddingRight: "6px", color: "#2962ff" }}><KeyOutlinedIcon /></span>
                        <Typography variant='h6' style={{ color: "#448aff" }} >PASSWORD</Typography>
                    </div>
                    <Typography class={styles.account} >A secure password helps protect your Account</Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Typography variant='h6'>123456789</Typography><br />
                       
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Typography variant='h6' style={{ display: 'flex', justifyContent: 'center', color: "#0d47a1" }}>{">"}</Typography>
                        </Grid>
                    </Grid>

                </div>
            </div>

        </List>
    );
}