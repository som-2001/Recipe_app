import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearBuffer() {
    const [progress, setProgress] = React.useState(10);
    const [buffer, setBuffer] = React.useState(15);
    const [hide,setHide]=React.useState(true);

    const progressRef = React.useRef(() => { });

    
    React.useEffect(() => {
        progressRef.current = () => {
            
            if (progress > 100) {
                setProgress(0);
                setBuffer(10);
                setHide(false);
            } else {
                const diff = 50;
                const diff2 = 50;
                setProgress(progress + diff);
                setBuffer(progress + diff + diff2);

                
            }

        };
    });

    React.useEffect(() => {
        const timer = setInterval(()=>{
            progressRef.current();
        },1000)  
        return () => {

            clearInterval(timer);
        };
    }, []);

    return (
        <Box sx={{ width: '100%',height:"2px",position:"fixed",zIndex:'10000000' }}>
            {hide && <LinearProgress variant="buffer" value={progress} valueBuffer={buffer}  />}
        </Box>
    );
}