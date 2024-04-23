import * as React from 'react';
import { styled, useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputBase, Menu, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';
import AlertDialog from './AlertDialog';
import {useSelector,useDispatch} from 'react-redux';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import { profile_id } from '@/reduxtoolkit/Slice';
import { NEXT_APP_URL } from './Env';


const drawerWidth = 240;
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  backgroundColor: 'white',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Appbar() {

  const router=useRouter();
  const theme = useTheme();
  const dispatch=useDispatch();
  const [open, setOpen] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [logout,setLogout]=React.useState(false);

  const logoutFunction=()=>{

    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('username');
    localStorage.removeItem('email');

    router.push('/hi');
  }


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setLogout(!logout);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const {image}= useSelector(state => state.msg)

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: 'whitesmoke' }}>
        <Toolbar>
          
           <Typography variant="h6" noWrap component="div" sx={{ color: "black",fontStretch: 'extra-condensed',
                    fontFamily: 'math',
                    fontWeight: '500',
                    fontVariant: 'small-caps' }}>
            Mom's Recipe
            <Avatar onClick={handleOpenUserMenu} alt="Remy Sharp" src={localStorage.getItem('image') === 'https://mui.com/static/images/avatar/2.jpg' ? 'T' : `../images/${localStorage.getItem('image')}`} sx={{ float: "right", position: "fixed", right: '20px', top: "0.6rem" }} />
            
          </Typography>
          
        </Toolbar>

      </AppBar>
     
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography textAlign="center" onClick={(e)=>{
              if(setting==="Dashboard")router.push('/')
              if(setting==="Profile"){dispatch(profile_id(localStorage.getItem('id')));router.push(`/profileMe/${localStorage.getItem('id')}`)}
              if(setting==="Account")window.location.href=`${NEXT_APP_URL}/account`
              if(setting==="Logout"){setLogout(!logout)}
              }}>{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
{logout && (
      <React.Fragment>
      
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Logout"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <center><div style={{color:"red",alignItems:"center",fontSize:"2.2rem",width:"15rem",overflowX:'hidden'}}><SentimentDissatisfiedOutlinedIcon style={{fontSize:"3.2rem"}}/></div></center>
           <center>Are you sure?</center>  
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={logoutFunction} autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
)}
    </Box>
  );
}