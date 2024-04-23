import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';
import LinearBuffer from './LinearBuffer';
import { id, profileChange, profile_id, stateChange, wishlist } from '@/reduxtoolkit/Slice';
import { useDispatch, useSelector } from 'react-redux';
import {toast} from 'sonner';
import { Backdrop, CircularProgress } from '@mui/material';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({ item }) {
  const [expanded, setExpanded] = React.useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { favourite } = useSelector(state => state.msg);
  var user_id = [];
  
  //  console.log(item);

  favourite.map((data, index) => (
    user_id.push(data._id)
  ))

  const Clicked = (e) => {
    dispatch(id(item._id));
    dispatch(stateChange());
    
    router.push(`/recipe/${item._id}`)
    
   
  }
  const AddToFav = (id) => {

    if(user_id.includes(item._id)) return toast.error("This recipe is already in your Favorites")
    const selectedCard = document.getElementById(id);
    toast.success('Added to favourite')
    selectedCard.style.color = "red";
    dispatch(wishlist(item));

  }
  const Profile = (e) => {
    
    dispatch(profileChange());
    dispatch(profile_id(item.user_id))
    router.push(`/profile/${item.user_id}`)
  }
  return (
    <>
    
    <Card sx={{ maxWidth: 300, marginBottom: '25px', marginRight: '5px',border:'0.5px solid grey',background: 'rgba(0, 0, 0, 0.8)',color:'white',fontStretch:'normal',
    fontFamily: 'math',
    fontWeight: '500',
    fontVariant: 'small-caps' }}>



      <CardHeader
      
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" onClick={(e) => Profile(e)}>
            {item.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">

          </IconButton>
        }
        title={item.name}
        subheader={item.created_at}
        subheaderTypographyProps={{style: { color: 'white' } }}
        style={{color:"white"}}
      />
      <CardMedia
        component="img"
        height="224"
        image={`../images/${item.Recipe_pic}`}
        alt="Paella dish"
        id='home'
        onClick={(e) => Clicked(e)}
        className={styles.home}
      />
     
      <CardContent>
        <Typography variant="h5" >
          {item.title}
        </Typography>
        <Typography variant="body2"   style={{
          wordBreak: 'break-all', overflow: 'hidden', textOverflow: 'ellipsis',WebkitLineClamp:4,display:"-webkit-box",
          WebkitBoxOrient: 'vertical',  whiteSpace: 'wrap', 
        }} >
          {item.Desc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing style={{float:"right"}}>
        <IconButton aria-label="add to favorites">
          {user_id.includes(item._id) ? (
            <FavoriteIcon id={item._id} style={{ color: "red" }} onClick={(e) => AddToFav(item._id)} />
          ) : (<FavoriteIcon id={item._id} style={{color:"white"}} onClick={(e) => AddToFav(item._id)} />)}

        </IconButton>
        <IconButton aria-label="share" style={{color:"white"}}>
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          //   onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          {/* <ExpandMoreIcon /> */}
        </ExpandMore>
      </CardActions>
     
    </Card>
    </>
  );
}