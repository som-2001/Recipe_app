import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { NEXT_APP_BASE_URL } from './Env';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { ratingStore } from '@/reduxtoolkit/Slice';


const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" sx={{ fontSize: "3.5rem" }} />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" sx={{ fontSize: "2.5rem" }} />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" sx={{ fontSize: "2.5rem" }} />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" sx={{ fontSize: "2.5rem" }} />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" sx={{ fontSize: "2.5rem" }} />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  
  const { value, ...other } = props;

  return <span {...other} >{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function RadioGroupRating({item}) {


  var array=[];
 

  const [rating, setRatings] = React.useState('Give this recipe your valuable rating');
  const [rate,setRate]=React.useState(0);
  const [ratingStore,setRatingStore]=React.useState([]);
  React.useEffect(()=>{
     
      async function fetch(){

       const response = await axios.post(`${NEXT_APP_BASE_URL}/getMethod`, { id: item._id });
        const recipeData = response.data.result || {};
      
        // console.log(recipeData?.rating?.length);

        if(recipeData?.rating?.length===undefined)
        {
          setRatingStore('');
        }
        recipeData?.rating?.map((data,index)=>{
          
          if(!array.includes(data?.userid)){
            setRatingStore(prevRatingStore=>[...prevRatingStore,data?.userid]);
            array.push(data?.userid);
          }
          if(localStorage.getItem('id')===data?.userid)
          {
            setRatings(data?.rating);
         
            if(data?.rating==='Very Dissatisfied'){
              setRate(1);
            }else if (data?.rating==='Dissatisfied'){
              setRate(2);
            } else if (data?.rating==='Neutral'){
              setRate(3);
            }else if (data?.rating==="Satisfied"){
              setRate(4);
            }else if (data?.rating==="Very Satisfied"){
              setRate(5);
            }
          }
        })
     }

     fetch();  
  },[]);
  
  const Rating=(rate2)=>{
   
    // console.log(ratingStore);
    
    if(!ratingStore?.includes(localStorage.getItem('id'))){

      if(rate2==='Very Dissatisfied'){
        setRate(1);
      }else if (rate2==='Dissatisfied'){
        setRate(2);
      } else if (rate2==='Neutral'){
        setRate(3);
      }else if (rate2==="Satisfied"){
        setRate(4);
      }else if (rate2==="Very Satisfied"){
        setRate(5);
      }

    axios.post(`${NEXT_APP_BASE_URL}/rating` ,{recipeId : item._id,userId:localStorage.getItem("id"),rating:rate2});
    setRatings(rate2)
    toast.success('Thank you for your feedback')
    if(!ratingStore.includes(localStorage.getItem('id'))){
      array.push(localStorage.getItem('id'));
      setRatingStore(prevRatingStore=>[...prevRatingStore,localStorage.getItem('id')]);
    }
    }else{
      toast.error('You have already rated this recipe')
    }
  }
// console.log(rate);
  return (
    <div style={{width:"15rem"}}>
      <div style={{marginLeft:"3px"}}>
      <StyledRating
       style={{fontSize:"2.5rem"}}
        name="highlight-selected-only"
        getLabelText={(value) => customIcons[value].label}
        onChange={(e)=>Rating(customIcons[e.target.value].label)}
        value={rate}
      />
      </div>
      <div>
      {rating === 'Give this recipe your valuable rating' ? (
        <p style={{ fontWeight: "100", fontSize: "1.1rem" }}>{rating}</p>
      ) : (
        <p style={{ fontWeight: "100", fontSize: "1.1rem" }}>
          {rating === 'Satisfied' || rating === 'Very Satisfied' ? (
            <> 
              Thank you. You look <span style={{ color: "green" }}>{rating}</span> with the recipe!
            </>
          ) : (
            <> 
              Thank you. You look <span style={{ color: "red" }}>{rating}</span> with the recipe!
            </>
          )}
        </p>
      )}
       </div>

    </div>
  );
}