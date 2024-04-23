import ClippedDrawer from "@/components/ClippedDrawer";
import LinearBuffer from "@/components/LinearBuffer";
import RecipeReviewCard from "@/components/RecipeReviewCard";
import Wishlist from "@/components/WishList";
import { Grid } from "@mui/material";
import { useSelector } from 'react-redux';

export default function favourite() {

    const { favourite } = useSelector(state => state.msg);


    return (
        <div>
            <ClippedDrawer />
            <div style={{ marginTop: "4rem" }}>
                <LinearBuffer />
            </div>
            <div style={{ marginLeft: "3rem", marginTop: "6rem" }}>
                {favourite.length===0 ?(<center><img src="../images/no_data.gif" style={{width:"310px",height:"250px",marginTop:"70px"}} alt=""/></center>):(
                <center> 
                <Grid container spacing={2} >
                    {favourite.map(item => (
                        <Grid item xs={12} sm={12} md={4} lg={4} key={item._id}>
                            <Wishlist item={item} />
                        </Grid>
                    ))}
                </Grid>
                </center>
            )}
            </div>
        </div>
    )
}