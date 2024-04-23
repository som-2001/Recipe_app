import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Button, Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import  Axios  from 'axios';
import {useDispatch,useSelector} from 'react-redux';
import { addcommentList, commentList, deleteCommentList } from '@/reduxtoolkit/Slice';
import ClearIcon from '@mui/icons-material/Clear';
import {toast,Toaster} from 'sonner';
import { NEXT_APP_BASE_URL } from './Env';

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function BottomAppBar({ item }) {

  const [open, setOpen] = React.useState(false);
  const [comment,setComment]=React.useState('');
  const {id}=useSelector(state=>state.msg)
  const dispatch=useDispatch();
  const inputRef=React.useRef(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Comment=()=>{

    const date=new Date();
    dispatch(addcommentList({unique_id:date,id:localStorage.getItem('id'),recipe_id:id,name:localStorage.getItem('name'),image:localStorage.getItem('image'),comment:comment}));

    Axios.post(`${NEXT_APP_BASE_URL}/comment`,{unique_id:date,id:localStorage.getItem('id'),recipe_id:id,name:localStorage.getItem('name'),image:localStorage.getItem('image'),comment:comment});
    
    toast.success('Review posted successfully');
    inputRef.current.value=''
    setComment('');
    setOpen(false);
  }

  const deleteComment=(e)=>{
   
    console.log(e);
    dispatch(deleteCommentList(e));
    Axios.post(`${NEXT_APP_BASE_URL}/deleteComment`,{id:e,recipe_id:id}).then((res)=>console.log(res)).catch((err)=>console.error(err));

  }
  
  return (
    <>
      <React.Fragment>

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Add Your Review"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Let the user know what you think of this recipe!
            </DialogContentText>
            <TextField
              required
              id="outlined-required"
              label="Review"
              multiline
              rows={4}
              style={{ marginBottom: "20px", width: "90%", marginLeft: "15px",marginTop:"20px" }}
              placeholder="Recipe method"
              onChange={(e) => setComment(e.target.value)}
              ref={inputRef}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={Comment}>Submit</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

      <React.Fragment>
        <CssBaseline />
        <Paper square sx={{ pl: "13px", pr: "33px" }}>
          <div style={{}}>
            <Typography variant="h5" color="text.secondary" gutterBottom component="div" sx={{ p: 4, position: "relative", textAlign: "left" }}>
              Reviews
            </Typography>
            <div>
              <Button variant="outlined" gutterBottom component="div" sx={{ my: -4, mx: 5, float: "right" }} onClick={handleClickOpen}>
                Add Review
              </Button>
            </div>
          </div>

           
          <List sx={{ mb: 2 }}>
            {item?.length>0 ? item?.map((data, index) => (
              <React.Fragment key={index}>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar alt="Profile Picture" src={`../images/${data?.image}`} />
                  </ListItemAvatar>
                  <ListItemText primary={data?.name} secondary={data?.comment} style={{wordBreak:"break-word"}}/>
                  {localStorage.getItem('id')===data?.user_id &&  <ClearIcon onClick={(e)=>deleteComment(data?.unique_id)}/>}
                </ListItemButton>
              </React.Fragment>
            )) : (
              <Typography varient="p" style={{ fontSize: "1.1rem", fontWeight: "100", textAlign: "center", marginTop: "40px", marginLeft: "20px",marginBottom:"40px" }}>No Comments yet!! Be the first reviewer</Typography>
            )}
          </List>
        </Paper>

      </React.Fragment>
    </>

  );
}