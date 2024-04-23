import ClippedDrawer from "@/components/ClippedDrawer";
import LinearBuffer from "@/components/LinearBuffer";
import MasonryImageList from "@/components/MasonryImageList";
import RecipeReviewCard from "@/components/RecipeReviewCard";
import SwipeableTextMobileStepper from "@/components/SwipeableTextMobileStepper";
import styled from "@emotion/styled";
import { Avatar, Badge, Box, Button, Grid, Hidden, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css"
import Appbar from "@/components/Appbar";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import FollowersGrid from "@/components/FollowersGrid";
import FollowingGrid from "@/components/FollowingGrid";
import { follow, initialFollow, initialResult, profileChange, store, unfollow } from "@/reduxtoolkit/Slice";
import { NEXT_APP_BASE_URL } from "@/components/Env";
import RecipeReviewCardMe from "@/components/RecipeReviewCardMe";
import { Toaster } from "sonner";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        // boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
}));


export default function profile() {

    useGSAP(() => {

        gsap.fromTo('#Grid', {
            opacity: 0,
            y: -150,

        }, {
            opacity: 1,
            y: 0
        })

    });
    const router = useRouter();
    const { profile_id, image, result1,userResult,TrueOrfalse1 } = useSelector(state => state.msg);
    const [result, setResult] = useState([]);
    const dispatch = useDispatch();
    const { follow1 } = useSelector(state => state.msg);
    const [hide, setHide] = useState(false);
    const [open, setOpen] = useState(TrueOrfalse1);


    useEffect(()=>{
        setTimeout(()=>{
            setOpen(false);
            dispatch(profileChange());
           },500)
    },[]);

    useEffect(() => {
        axios.post(`${NEXT_APP_BASE_URL}/getRecipeDetails`, { userid: localStorage.getItem('id') }).then(res => {
           
            dispatch(initialResult(res.data.result));
            setResult(res.data.result);
            // console.log(res.data.result);

            if (res.data[0]?.result?.followers?.length === undefined) {
                dispatch(initialFollow(0))
            } else {
                dispatch(initialFollow(res.data[0]?.result?.followers?.length))
            }
            console.log(res.data[0]?.result?.followers?.length);
        })
    }, [])


    return (
        <Box style={{}}>
            <div>
                <Appbar />
            </div>
            <Box sx={{ 
                marginTop: {lg:"4rem",sm:'3.4rem',xs:'3.4rem'} 
                }}>
                <LinearBuffer />
            </Box>
            <center>
               <Toaster  position="top-right" autoClose={2000}/> 
               
                <div style={{ marginLeft: "0rem", marginTop: "6rem" }} id="Grid">


                    <center className={styles.icon}>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar alt="Remy Sharp" src={`../images/${localStorage.getItem('image')}`} style={{ width: "8rem", height: "8rem" }} />
                        </StyledBadge><br />

                        <Typography variant="p" style={{ fontSize: "1.5rem" }}>{localStorage.getItem('name')}</Typography><br />

                        <Typography variant="p" style={{ fontSize: "1.0rem" }} color="text.secondary">{localStorage.getItem('username')}</Typography><br />

                        <Typography variant="p" color="text.tertiary" >Followers:{follow1}</Typography><br />

                        
                    </center>


                    <Grid container spacing={2} direction="row">


                        <Grid item sm={12} xs={12} md={12} lg={4}>
                            <h2>Recent Pictures</h2>
                            <SwipeableTextMobileStepper style={{ marginRight: "25px" }} item={result} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={4} sx={{ marginTop: "0rem" }} className={styles.profile} >

                            <Typography variant="h5" style={{ marginTop: "2rem" }}>Following</Typography>

                            <FollowingGrid item={result[0]?.result?.following} length={result[0]?.result} />

                        </Grid>


                        <Grid item sm={12} xs={12} md={12} lg={4} >
                            <Typography variant="h5" style={{ marginTop: "2rem" }}>Followers</Typography>
                            <center>
                                <FollowersGrid item={result[0]?.result?.followers} length={result[0]?.result} />
                            </center>
                        </Grid>


                        <Grid item sm={12} xs={12} md={12} lg={4}>
                            <Typography variant="h5" style={{ marginTop: "2rem", marginLeft: "0px" }}>Recipe Book Of {localStorage.getItem('name')}</Typography>
                            <MasonryImageList item={result} />
                        </Grid>


                        <Grid item xs={12} sm={12} md={12} lg={8} className={styles.post} style={{ height: "600px",border:"1px solid whitesmoke" }} >
                            <Typography variant="h5">{result.length} Posts</Typography><br />
                            <div style={{ width: "350px" }}>
                                {userResult?.length!==0 ? (userResult?.map((data, index) => (
                                    <RecipeReviewCardMe item={data} key={index} />
                                ))) : (<img src="../images/posts.gif" style={{width:"280px",height:"380px"}} alt=""/>)}
                            </div>
                        </Grid>

                    </Grid>

                </div>


            </center>
        </Box>
    )
}