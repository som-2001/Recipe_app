import Account from "@/components/Account";
import ClippedDrawer from "@/components/ClippedDrawer";
import { Typography } from "@mui/material";

const account = () => {
    return (
        <div>

            <ClippedDrawer />
            <div style={{ display: "flex", justifyContent: "center",paddingTop:'5rem',paddingLeft:"5rem",background:"linear-gradient(0deg, rgb(243, 255, 232,0.3) 10%, rgb(245, 203, 215,0.8) 80.83%);border-radius: 0px 0px 0px ;"}}>
                <Account />
            </div>
        </div>
    )
}

export default account;

// "linear-gradient(0deg, rgb(201, 188, 244,0.5) 0%, rgb(224, 139, 186,0.2) 90.83%);border-radius: 0px 0px 0px ;"