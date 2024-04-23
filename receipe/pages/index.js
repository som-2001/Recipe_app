import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import ClippedDrawer from "../components/ClippedDrawer";
import BasicSpeedDial from "@/components/BasicSpeedDial";
import RecipeReviewCard from "@/components/RecipeReviewCard";
import { Backdrop, Box, CircularProgress, Grid } from "@mui/material";
import SearchBar from "@/components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { add } from "@/reduxtoolkit/Slice";
import axios from "axios";
import { NEXT_APP_BASE_URL } from "@/components/Env";
import {toast,Toaster} from 'sonner'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState } from "react";



export default function Home({ result }) {

  useGSAP(()=>{
 
    gsap.fromTo('#grid',{
      opacity:0,
      y:-150,
      
    },{
      opacity:1,
      y:0
    })
    
  });
  const { searchText,TrueOrfalse } = useSelector((state) => state.msg);
  
 

  return (
    <div style={{ background: "whitesmoke", height: "100vh" }}>
      <Head>
        <title>Mom's Recipe</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <ClippedDrawer />
      </div>
       
     
       <Toaster  position="bottom-left" autoClose={2000}/>
      <center>
        <Box style={{ color: "black", marginTop: "70px" }}>
          <SearchBar />
        </Box>
        <div id="grid">
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
            result.map((data, index) =>
              data.title.toLowerCase()?.includes(searchText?.toLowerCase()) ? (
                <Grid item xs={12} sm={12} md={4} lg={4} key={index}>
                  <RecipeReviewCard item={data} />
                </Grid>
              ) : null
            )
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
        </div>
      </center>

      <BasicSpeedDial />
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const response = await axios.post(`${NEXT_APP_BASE_URL}/fetching_recipes`, { id: 'segseg' });
    const result = response.data || [];
    return {
      props: {
        result,
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