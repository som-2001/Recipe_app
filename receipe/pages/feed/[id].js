import BasicSpeedDial from "@/components/BasicSpeedDial";
import RecipeReviewCard from "@/components/RecipeReviewCard";
import { Box, Grid } from "@mui/material";
import SearchBar from "@/components/SearchBar";

import axios from "axios";
import ClippedDrawer from "@/components/ClippedDrawer";
import { NEXT_APP_BASE_URL } from "@/components/Env";
import { useSelector } from "react-redux";

const feed = ({ result }) => {
  const { searchText } = useSelector((state) => state.msg);

  console.log(result);

  return (
    <div style={{ background: "whitesmoke", height: "100vh" }}>

      <div>
        <ClippedDrawer />
      </div>


      <center>
        <Box style={{ color: "black", marginTop: "70px" }}>
          <SearchBar />
        </Box>
        <Grid
          container
          spacing={2}
          style={{
            paddingTop: "30px",
            paddingLeft: "60px",
            paddingBottom: "20px",
            overflowX: "hidden",
            justifyContent: "center",
            alignItems: "center",
            background: "whitesmoke",
          }}
        >
          {result.length !== 0 ? (
   
        result.map((data, index) => (
              data.title.toLowerCase().includes(searchText.toLowerCase()) ?(
                <Grid item xs={12} sm={12} md={4} lg={4} key={index}>
                    <RecipeReviewCard item={data} />
                </Grid>
              ):(null)
        ))
  
) : (
    <img
        src="../images/no_data.gif"
        style={{
            width: "310px",
            height: "250px",
            marginTop: "70px",
        }}
        alt=""
    />
)}

        </Grid>
      </center>

      <BasicSpeedDial />
    </div>
  );
}
export default feed;

export async function getServerSideProps(context) {
  try {

    const { id } = context.query;
    const response = await axios.post(`http://localhost:3001/api/feed`, { id: id });


    const result = response.data || [];


    return {
      props: {
        result
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        result: [],
      },
    };
  }
}
