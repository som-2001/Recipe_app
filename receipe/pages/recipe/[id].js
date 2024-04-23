import { Avatar, Backdrop, Button, Card, CardContent, CardHeader, CardMedia, CircularProgress, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { red } from "@mui/material/colors";
import ClippedDrawer from "@/components/ClippedDrawer";
import CustomPaginationActionsTable from "@/components/CustomPaginationActionsTable";
import PieChart from "@/components/PieChart";
import RadioGroupRating from "@/components/RadioGroupRating";
import BottomAppBar from "@/components/BottomAppBar";
import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import { useDispatch } from 'react-redux';
import axios from "axios";
import { commentList, stateChange } from "@/reduxtoolkit/Slice";
import { NEXT_APP_BASE_URL } from "@/components/Env";
import { Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import { Toaster } from "sonner";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Recipe({ recipeData }) {

    const router = useRouter();
    const dispatch = useDispatch();
    const { comment } = useSelector(state => state.msg);
    const [IsImageLoaded, setIsImageLoaded] = useState(false);
    const [video, setVideo] = useState(true);
    const [videostream, setVideoStream] = useState('');
    const { id,TrueOrfalse } = useSelector(state => state.msg);
    const [open, setOpen] = useState(TrueOrfalse);

    useGSAP(() => {

        gsap.fromTo('#grid', {
            opacity: 0,
            y: -150,

        }, {
            opacity: 1,
            y: 0
        })

    });

    useEffect(()=>{
        setTimeout(()=>{
            setOpen(false);
            dispatch(stateChange());
           },500)
    },[]);

    useEffect(() => {
    
        dispatch(commentList(recipeData.comments))

    }, [id]);

    return (
        <div style={{ overflowY: 'auto', height: '100vh', overflowX: "hidden", background: "whitesmoke" }}>
            <div>
                <ClippedDrawer />
            </div>
            {open && <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
           
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            }
            <div style={{ paddingTop: "60px", paddingLeft: "50px" }} id="grid">

                <Toaster position="top-right" autoClose={2000} />
                <center style={{
                    paddingTop: "20px", paddingBottom: "20px", fontStretch: 'extra-condensed',
                    fontFamily: 'math',
                    fontWeight: '500',
                    fontVariant: 'small-caps'
                }}><Typography variant="h4" color="text.secondary">{recipeData.title}</Typography></center>
                <Grid container spacing={2} style={{ paddingBottom: "20px", overflowX: 'hidden', justifyContent: "center", alignItems: "center", }}>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <center>
                            <Card sx={{ maxWidth: 345 }} style={{ transition: "linear 1s" }}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                            R
                                        </Avatar>
                                    }
                                    title={recipeData.name}
                                    subheader={recipeData.created_at}
                                />
                                {video ? (<CardMedia
                                    component="img"
                                    height="244"
                                    image={`../images/${recipeData.Recipe_pic}`}
                                    alt="Recipe Image"

                                    onLoad={() => {
                                        setIsImageLoaded(true);
                                    }}
                                    {...!IsImageLoaded && (
                                        <Skeleton
                                            variant="rectangular"
                                            width="100%"
                                            height={244}
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                zIndex: 1,

                                            }}
                                        />
                                    )}
                                />) : (
                                    recipeData?.video !== null && recipeData?.video !== "null" ?
                                        <video style={{ width: '100%', height: "344", borderRadius: '10px' }} autoPlay controls >
                                            <source src={`${NEXT_APP_BASE_URL}/video/${id}`} type="video/mp4"></source>
                                        </video> : <img src="../images/no_data.gif" style={{ width: "310px", height: "244px" }} alt="" />
                                )}

                            </Card>
                            <Button variant="outlined" style={{ marginTop: "20px" }} onClick={(e) => setVideo(!video)}>Show Video</Button>
                        </center>
                    </Grid>
                    <Grid item xs={12} sm={12} md={7} lg={7}>
                        <Card>
                            <CardContent style={{ overflowY: 'scroll', height: "500px", overflowX: 'hidden' }}>
                                <center><Typography paragraph style={{ fontFamily: 'math' }}>Method</Typography></center>
                                <div style={{ maxWidth: '830px', minWidth: "250px", whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                                    <Typography style={{ fontFamily: 'math' }}>
                                        {recipeData.recipe_method}
                                    </Typography>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <center style={{ paddingBottom: "50px" }}>
                    <Typography variant="h5" color="text.secondary" sx={{
                        marginBottom: "20px", fontStretch: 'extra-condensed',
                        fontFamily: 'math',
                        fontWeight: '500',
                        fontVariant: 'small-caps'
                    }}>Ingredients</Typography>
                    <CustomPaginationActionsTable item={recipeData.ingredients} />
                </center>
                <center><Typography variant="h5" color="text.secondary" style={{
                    fontStretch: 'extra-condensed',
                    fontFamily: 'math',
                    fontWeight: '500',
                    fontVariant: 'small-caps'
                }}>Ratings</Typography></center>
                <Grid container style={{ marginTop: "50px" }} >
                    <Grid item xs={12} sm={12} md={7} lg={8} >
                        <center>
                            <PieChart item={recipeData} />
                        </center>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={3} style={{ marginLeft: "20px" }}>
                        <Typography variant="h5" sx={{
                            marginBottom: "25px", marginTop: "35px", fontStretch: 'extra-condensed',
                            fontFamily: 'math',
                            fontWeight: '500',
                            fontVariant: 'small-caps'
                        }}>Rate Recipe</Typography>
                        <RadioGroupRating item={recipeData} />
                    </Grid>
                </Grid>
                <BottomAppBar item={comment} />
            </div>
        </div>
    )
}

export default Recipe;

export async function getServerSideProps(context) {
    try {
        const { id } = context.query;

        const response = await axios.post(`${NEXT_APP_BASE_URL}/getMethod`, { id: id });
        const recipeData = response.data.result || {};
        // console.log(recipeData);
        return {
            props: {
                recipeData,
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: {
                recipeData: {},
            },
        };
    }
}
