import { NEXT_APP_BASE_URL } from "@/components/Env";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function otp() {
    const [hide, setHide] = useState(true);
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(30);
    const [otpHeader, setOtpHeader] = useState('');
    const router=useRouter();
    var intervalId;

    const GetOtp = () => {
        
        axios.get(`${NEXT_APP_BASE_URL}/otp`, {
            headers: {
                'Content-Type': 'application/json',
                'email': 'somgorai726@gmail.com' // Example authorization header
            }
        }).then(response => {
            console.log(response);
            setOtpHeader(response.data.otp)
        });
        setHide(!hide);

        intervalId = setInterval(() => {
            setTimer(prev => prev - 1);
        }, 1000);

        setTimeout(() => {
            clearInterval(intervalId); // Clear the interval
            setTimer(10);
            setHide(true);
        }, 30000);
    }

    const onSubmit = () => {
        axios.post(`${NEXT_APP_BASE_URL}/verify-otp`, { otp: otp }, {
            headers: {
                'Content-Type': 'application/json',
                'email': 'somgorai726@gmail.com',
                'otp': otpHeader
            }
        }).then(response => {
            console.log(response);
            if(response.data==='Otp verified')
            {
                router.push('/');
            }else{
                alert('not varified');
            }
        });
    };

    return (

        <div className="otp-container" style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
            <Box>
                <Typography variant="p" style={{ fontSize: "1.5rem", fontWeight: 100, paddingTop: "5rem" }}>
                    Tap the button to receive a one-time password for verification.
                </Typography>
            </Box>
            {!hide && timer}
            <Box style={{ marginTop: "2rem" }}>
                <TextField
                    id="outlined-basic"
                    label="OTP"
                    onChange={(e) => setOtp(e.target.value)}
                />
            </Box>
            <Box style={{ marginTop: "0.6rem" }}>
                {hide ? (<Button variant="contained" onClick={GetOtp}>Get otp</Button>) : (<Button variant="contained" onClick={onSubmit}>Submit</Button>)}
            </Box>
        </div>

    )
}
