import ClippedDrawer from "@/components/ClippedDrawer";
import { NEXT_APP_BASE_URL } from "@/components/Env";
import FollowersPeople from "@/components/FollowersPeople";
import { Typography } from "@mui/material";
import axios from "axios";

const following = ({result}) => {

    return (
        <div style={{fontFamily:"cursive"}}>
            <ClippedDrawer />
            <div style={{ marginLeft: "4rem", marginTop: "5rem", textAlign: "center",marginRight:'6px' }}>
                <Typography variant="h4" >
                    <span style={{ color: "#B22222" }}>{result===null ? '0' : result?.length}</span>
                    <span style={{ color: "#B22222" }}> F</span>
                    <span style={{ color: "#B22222" }}>o</span>
                    <span style={{ color: "#DC143C" }}>l</span>
                    <span style={{ color: "#FF4500" }}>l</span>
                    <span style={{ color: "#CD5C5C" }}>o</span>
                    <span style={{ color: "#FF6347" }}>w</span>
                    <span style={{ color: "#B22222" }}>e</span>
                    <span style={{ color: "#FF8C00" }}>r</span>
                    <span style={{ color: "#B22222" }}>s</span>
                </Typography>

                <center style={{marginTop: "2rem" }}>
                    {result ? (result?.map((data, index) => (
                        <FollowersPeople key={index} item={data} />
                    ))):(<img src="../images/no_data.gif" style={{width:"310px",height:"250px",marginTop:"70px"}} alt=""/>)}

                </center>
            </div>
        </div>
    )
}

export default following;

export async function getServerSideProps(context){
    
    const {id}=context.query;
    const response= await axios.post(`${NEXT_APP_BASE_URL}/users`, { userid: id });
    
    return{
        props:{
            result: response?.data?.followers===undefined ? null:response.data.followers
        } 
    };  
    
}