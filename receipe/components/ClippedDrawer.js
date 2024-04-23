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
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { profile_id, progressChange } from '@/reduxtoolkit/Slice';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { NEXT_APP_URL } from './Env';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PortraitIcon from '@mui/icons-material/Portrait';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import LogoutIcon from '@mui/icons-material/Logout';

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

export default function ClippedDrawer() {

  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [logout, setLogout] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleClose1 = () => {
    setLogout(!logout);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const logoutFunction = () => {

    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('username');
    localStorage.removeItem('email');

    router.push('/hi');
  }
  const progressChange = () => {
    setOpen1(true);

    setTimeout(() => {

      localStorage.setItem('index',1);
      router.push('/favourite');
      setOpen1(false);
    }, 500)

  }

  const progressChange1 = () => {
    setOpen1(true);

    setTimeout(() => {
      
      localStorage.setItem('index',0);
      router.push('/');
      setOpen1(false);
    }, 500)

  }

  const progressChange2 = () => {
    setOpen1(true);

    setTimeout(() => {

      localStorage.setItem('index',2);
      router.push(`/followers/${localStorage.getItem('id')}`)
      setOpen1(false);
    }, 500)

  }

  const progressChange3 = () => {
    setOpen1(true);

    setTimeout(() => {


      localStorage.setItem('index',3);
      router.push(`/following/${localStorage.getItem('id')}`)
      setOpen1(false);
    }, 500)

  }

  const progressChange4 = () => {
    setOpen1(true);

    setTimeout(() => {

      localStorage.setItem('index',5);
      dispatch(profile_id(localStorage.getItem('id')));
      router.push(`/profileMe/${localStorage.getItem('id')}`)
      setOpen1(false);
    }, 500)

  }


  const progressChange5 = () => {
    setOpen1(true);

    setTimeout(() => {

      localStorage.setItem('index',6);
      window.location.href = `${NEXT_APP_URL}/account`
      setOpen1(false);
    }, 500)

  }


  const progressChange6 = () => {
    setOpen1(true);

    setTimeout(() => {

      localStorage.setItem('index',7);
      setLogout(!logout)
      setOpen1(false);
    }, 500)

  }

  const progressChange7 = () => {
    setOpen1(true);

    setTimeout(() => {

      localStorage.setItem('index',4);
      router.push(`/feed/${localStorage.getItem('id')}`)
      setOpen1(false);
    }, 500)

  }
  const handleClose = () => {

  }
  return (
    <Box sx={{ display: 'flex',fontStretch: 'extra-condensed',
    fontFamily: 'math',
    fontWeight: '500',
    fontVariant: 'small-caps' }}>
      <CssBaseline />



      {open1 && <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      }

      <AppBar position="fixed" open={open} sx={{ backgroundColor: 'whitesmoke' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}

            edge="start"
            sx={{
              marginRight: 5,
              color: 'black',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ color: "black",fontStretch: 'extra-condensed',
                    fontFamily: 'math',
                    fontWeight: '500',
                    fontVariant: 'small-caps' }}>
            Mom's Recipe
            <Avatar onClick={handleOpenUserMenu} alt="Remy Sharp" src={localStorage.getItem('image') === 'https://mui.com/static/images/avatar/2.jpg' ? 'T' : `../images/${localStorage.getItem('image')}`} sx={{ float: "right", position: "fixed", right: '20px', top: "0.6rem" }} />

          </Typography>

        </Toolbar>

      </AppBar>
      <Drawer variant="permanent" open={open} >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Dashboard', 'Favourite', 'Followers', 'Following', 'Feed'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }} onClick={(e) => {
              if (text === 'Favourite') { progressChange() }
              if (text === 'Dashboard') { progressChange1(); }
              if (text === 'Followers') { progressChange2(); }
              if (text === 'Following') { progressChange3() }
              if (text === 'Feed') { progressChange7() }
            }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
               
                
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',

                  }}
                >

                  {index === 0 ? <SpaceDashboardIcon id="dashboard" style={{color:localStorage.getItem('index')=== '0'?'red':'inherit'}}/> : null}
                  {index === 1 ? <FavoriteIcon id="fav" style={{color:localStorage.getItem('index')=== '1'?'red':'inherit'}}/> : null}
                  {index === 2 ? <GroupAddIcon style={{color:localStorage.getItem('index')=== '2'?'red':'inherit'}}/> : null}
                  {index === 3 ? <PeopleAltIcon style={{color:localStorage.getItem('index')=== '3'?'red':'inherit'}}/> : null}
                  {index === 4 ? <DynamicFeedIcon style={{color:localStorage.getItem('index')=== '4'?'red':'inherit'}}/> : null}

                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List >
          {['Profile', 'Account', 'Logout'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }} onClick={(e) => {
              if (text === 'Profile') { progressChange4() }
              if (text === 'Account') { progressChange5() }
              if (text === 'Logout') { progressChange6() }
            }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}

              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index === 0 ? <PortraitIcon style={{color:localStorage.getItem('index')=== '5'?'red':'inherit'}}/> : null}
                  {index === 1 ? <AccountCircleIcon style={{color:localStorage.getItem('index')=== '6'?'red':'inherit'}} /> : null}
                  {index === 2 ? <LogoutIcon style={{color:localStorage.getItem('index')=== '7'?'red':'inherit'}}/> : null}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

      </Drawer>

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
            <Typography textAlign="center" onClick={(e) => {
              if (setting === "Dashboard") router.push('/')
              if (setting === "Profile") { dispatch(profile_id(localStorage.getItem('id'))); router.push(`/profileMe/${localStorage.getItem('id')}`) }
              if (setting === "Logout") setLogout(!logout)
              if (setting === "Account") window.location.href = `${NEXT_APP_URL}/account`

            }}

            >{setting}</Typography>

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
                <center><div style={{ color: "red", alignItems: "center", fontSize: "2.2rem", width: "16rem" }}><SentimentDissatisfiedOutlinedIcon style={{ fontSize: "3.2rem" }} /></div></center>
                <center>Are you sure?</center>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose1}>Cancel</Button>
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