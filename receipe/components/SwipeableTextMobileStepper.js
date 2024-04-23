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



function SwipeableTextMobileStepper({item}) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);


  const images = item?.slice(0,4).map((data, index) => ({
    imgPath: `../images/${data.Recipe_pic}?auto=format&fit=crop&w=100&h=150&q=60`,
  }));

  
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
    <Box sx={{ width: 325,marginTop:"5px",marginLeft:'5px',borderRadius:"50%"}}>
      
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {item.length>0 ? (images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 250,
                  display: 'block',
                  maxWidth:318,
                  overflow: 'hidden',
                  width: '100%',
                  borderRadius:"10px"
                 
                }}
                src={step.imgPath}
                
              />
            ) : null}
          </div>
        ))):(<img src="../images/step.gif" style={{width:"310px",height:"250px"}} alt=""/>)}
      </AutoPlaySwipeableViews>
      
    </Box>
  );
}

export default SwipeableTextMobileStepper;