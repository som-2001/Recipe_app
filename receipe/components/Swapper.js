import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'Japaness Food',
    imgPath:
      'https://media.istockphoto.com/id/1366953086/photo/korean-dishes.jpg?b=1&s=612x612&w=0&k=20&c=EzVmZRb1cZ0IgsxV8kl3gKuAc4c-wnsvDaK5xeSeZt4=',
  },
  {
    label: 'Chiness Food',
    imgPath:
      'https://media.istockphoto.com/id/1398669454/photo/chilli-soya-chunks.jpg?b=1&s=612x612&w=0&k=20&c=FgQxgZvp5pkyf2eEWlBqoRK51d9KUx3_VT5Tcto62FY=',
  },
  {
    label: 'Indian Food',
    imgPath:
      'https://media.istockphoto.com/id/1155238046/photo/sweet-and-sour-chicken-in-a-bowl-with-rice.jpg?b=1&s=612x612&w=0&k=20&c=DiOws_otksK6hK7OF0p_Mjjz8amZymj-e4wo9R0c5Zw=',
  },
  {
    label: 'American Food',
    imgPath:
      'https://images.unsplash.com/photo-1602030638412-bb8dcc0bc8b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW1lcmljYW4lMjBmb29kfGVufDB8fDB8fHww',
     
  },
];

function Swapper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: {xs:345,sm:400,md:600,lg:600}, flexGrow: 1, }}>
      
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 255,
                  display: 'block',
                  maxWidth: 400,
                  overflow: 'hidden',
                  width: '100%',
                  borderRadius:'10px'
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
     
    </Box>
  );
}

export default Swapper;