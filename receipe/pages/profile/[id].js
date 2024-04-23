import ClippedDrawer from "@/components/ClippedDrawer";
import LinearBuffer from "@/components/LinearBuffer";
import MasonryImageList from "@/components/MasonryImageList";
import RecipeReviewCard from "@/components/RecipeReviewCard";
import SwipeableTextMobileStepper from "@/components/SwipeableTextMobileStepper";
import styled from "@emotion/styled";
import { Avatar, Backdrop, Badge, Box, Button, CircularProgress, Grid, Hidden, Skeleton, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css"
import Appbar from "@/components/Appbar";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import FollowersGrid from "@/components/FollowersGrid";
import FollowingGrid from "@/components/FollowingGrid";
import { follow, initialFollow, profileChange, removeStore, store, unfollow } from "@/reduxtoolkit/Slice";
import { NEXT_APP_BASE_URL } from "@/components/Env";
import { Toaster, toast } from "sonner";
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


export default function profile({ result2 }) {

    useGSAP(() => {

        gsap.fromTo('#Grid', {
            opacity: 0,
            y: -150,

        }, {
            opacity: 1,
            y: 0
        })

    });

    const { profile_id, result1,TrueOrfalse1 } = useSelector(state => state.msg);
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

        dispatch(initialFollow(result2?.followers?.length === undefined ? 0 : result2.followers.length));

        axios.post(`${NEXT_APP_BASE_URL}/getRecipeDetails`, { userid: profile_id }).then(res => {
            setResult(res.data.result);
        });

    }, [profile_id])

    useEffect(() => {

        axios.post(`${NEXT_APP_BASE_URL}/userDetails`, { userid: localStorage.getItem('id') }).then(res => {

            res?.data?.following?.map((data, index) => {
                !result1.includes(data?.userid) ? dispatch(store(data?.userid)) : null;
            })

        })
    }, [profile_id])

    const unFollow = () => {

        axios.post(`${NEXT_APP_BASE_URL}/unfollow`, { userid: profile_id, id: localStorage.getItem('id') })
        dispatch(unfollow());
        dispatch(removeStore(profile_id));
        toast.success("Unfollowed Successfully");
        setHide(!hide);
    }

    const Follow = () => {

        toast.success("Followed Successfully");
        dispatch(store(profile_id));

        axios.post(`${NEXT_APP_BASE_URL}/follow`, { userid: profile_id, id: localStorage.getItem('id'), name: localStorage.getItem('name'), image: localStorage.getItem('image'), followername: result[0]?.result?.name, username: localStorage.getItem('username'), userimage: result[0]?.result?.image })

        setHide(!hide);
        dispatch(follow(result[0]?.result?.following?.length));

    }

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

            {open && <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
           
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            }

            <center>

                <Toaster position="top-right" autoClose={2000} />
                <div style={{ marginLeft: "0rem", marginTop: "6rem" }} id="Grid">


                    <center className={styles.icon}>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar alt="Remy Sharp" src={`../images/${result.length !== 0 ? result[0]?.result?.image : result2.image}`} style={{ width: "8rem", height: "8rem" }}

                            />
                        </StyledBadge><br />

                        <Typography variant="p" style={{
                            fontSize: "1.5rem", fontStretch: 'extra-condensed',
                            fontFamily: 'math',
                            fontWeight: '500',
                            fontVariant: 'small-caps'
                        }}>{result.length !== 0 ? result[0]?.result?.name : result2?.name}</Typography><br />

                        <Typography variant="p" style={{
                            fontSize: "1.0rem", fontStretch: 'extra-condensed',
                            fontFamily: 'math',
                            fontWeight: '500',
                            fontVariant: 'small-caps'
                        }} color="text.secondary">{result.length !== 0 ? result[0]?.result?.username : result2.username}</Typography><br />

                        <Typography variant="p" color="text.tertiary" style={{
                            fontStretch: 'extra-condensed',
                            fontFamily: 'math',
                            fontWeight: '500',
                            fontVariant: 'small-caps'
                        }}>Followers:{follow1}</Typography><br />

                        {result2.username !== localStorage.getItem('username') ? (

                            result1?.includes(profile_id) ? (
                                <Button variant="contained" style={{ marginBottom: "50px" }} onClick={unFollow}>
                                    Unfollow
                                </Button>
                            ) : (
                                <Button variant="contained" style={{ marginBottom: "50px" }} onClick={Follow}>
                                    Follow
                                </Button>
                            )
                        ) : (<div style={{ marginBottom: "80px" }}></div>)
                        }
                    </center>


                    <Grid container spacing={2} direction="row">


                        <Grid item sm={12} xs={12} md={12} lg={4}>
                            <h2 style={{
                                fontStretch: 'extra-condensed',
                                fontFamily: 'math',
                                fontWeight: '500',
                                fontVariant: 'small-caps'
                            }}>Recent Pictures</h2>
                            <SwipeableTextMobileStepper style={{ marginRight: "25px" }} item={result} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={4} sx={{ marginTop: "0rem" }} className={styles.profile} >

                            <Typography variant="h5" style={{
                                marginTop: "2rem", fontStretch: 'extra-condensed',
                                fontFamily: 'math',
                                fontWeight: '500',
                                fontVariant: 'small-caps'
                            }}>Following</Typography>

                            <FollowingGrid item={result[0]?.result?.following} length={result[0]?.result} />

                        </Grid>


                        <Grid item sm={12} xs={12} md={12} lg={4} >
                            <Typography variant="h5" style={{
                                marginTop: "2rem", fontStretch: 'extra-condensed',
                                fontFamily: 'math',
                                fontWeight: '500',
                                fontVariant: 'small-caps'
                            }}>Followers</Typography>
                            <center>
                                <FollowersGrid item={result[0]?.result?.followers} length={result[0]?.result} />
                            </center>
                        </Grid>


                        <Grid item sm={12} xs={12} md={12} lg={4}>
                            <Typography variant="h5" style={{
                                marginTop: "4rem", marginLeft: "0px", fontStretch: 'extra-condensed',
                                fontFamily: 'math',
                                fontWeight: '500',
                                fontVariant: 'small-caps'
                            }}>Recipe Book Of {result2?.name}</Typography>
                            <MasonryImageList item={result} />
                        </Grid>


                        <Grid item xs={12} sm={12} md={12} lg={8} className={styles.post} style={{ height: "600px", boxShadow: '1px 1px 1px 1px' }} >
                            <Typography variant="h5" style={{
                                fontStretch: 'extra-condensed',
                                fontFamily: 'math',
                                fontWeight: '500',
                                fontVariant: 'small-caps'
                            }}>{result.length} Posts</Typography><br />
                            <div style={{ width: "350px" }}>
                                {result.length !== 0 ? (result?.map((data, index) => (
                                    <RecipeReviewCard item={data} key={index} />
                                ))) : (<img src="../images/posts.gif" style={{ width: "280px", height: "380px" }} alt="" />)}
                            </div>
                        </Grid>

                    </Grid>

                </div>


            </center>
        </Box>
    )
}
export async function getServerSideProps(context) {

    const { id } = context.query;
    try {
        const response = await axios.post(`${NEXT_APP_BASE_URL}/getFollowersLength`, { id: id });
        const result2 = response.data || [];
        return {
            props: {
                result2,
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: {
                result2: [],
            },
        };
    }
}