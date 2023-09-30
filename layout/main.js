import * as React from 'react';
import { useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Listsidebar } from '../components/sidebar';

import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Slide } from '@mui/material';
import { AccountBalance, AccountCircle, Newspaper } from '@mui/icons-material';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';
// import Cookies from 'js-cookie';

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       {/* <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '} */}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const drawerWidth = 240;

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
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme({

    palette:{
        schema: {
            main: "#213555"
        }
    }
});

export default function LayoutDashboard(props) {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const router = useRouter()

  return (
    <> 
    <Head>
    <title>Pelelangan Online</title>
  </Head>

    <ThemeProvider theme={mdTheme} >
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} color="schema">
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon  sx={{ color: "white" }}/>
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="white"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            {/* <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon  sx={{ color: "white" }}/>
              </Badge>
            </IconButton> */}

          <AccountMenu/>

          </Toolbar>
        </AppBar>
        <Drawer 
        PaperProps={{
          sx:{
            backgroundColor: "#213555",
            ...(!open && { display: 'none' }),
          }
        }}
        variant="permanent" open={open} >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: [1],
            }}
          >
            <Box display={"flex"} alignItems="center" sx={{
                              gap: 2,

            }}>

            <Image src="/assets/images/logo.png" alt='logo' width={40} height={40}/>
            <Typography color={"white"}>
               Pelelangan Online
            </Typography>
            </Box>

            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon sx={{ color: "white" }}/>
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <Listsidebar/>
            <Divider sx={{ my: 1 }} />

            {/* <SecondaryListItems/> */}
            {/* {secondaryListItems} */}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            
            {props.children}


            {/* <Copyright sx={{ pt: 4, mt:5 }} /> */}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
    </>
  );
}

function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
        <IconButton onClick={handleClick} color="inherit" sx={{marginLeft: 2}}>
                <AccountCircle  sx={{ color: "white" }}/>
             </IconButton>
             <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem> */}
       <AlertLogout id={""}/>
      </Menu>
    </div>
  );
}


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AlertLogout() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };

  const router = useRouter();
  const handleLogout = async() => {
    try {
     const user = localStorage.getItem("user")
     const fixuser = JSON.parse(user)
     if (fixuser) {
      // console.log(user?.nik)
      const logout = await axios({
        method:"POST",
        url:"/api/user",
        data: {
          method: "logout",
          username: fixuser?.username
        }
    })
    if (logout.data.response) {
      localStorage.removeItem("user");
   router.replace("/")
    }
    
     }
      
  //  localStorage.removeItem("user");
  //  router.replace("/")
    } catch (error) {
      console.log(error)
    }
      
  };
  // const handleLogout = async () => {
  //   localStorage.removeItem("user");
  //  router.replace("/")
  // }

  return (
    <>
       <MenuItem onClick={handleClickOpen}>Keluar</MenuItem>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Peringatan"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Yakin Ingin keluar dari Dashboard
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Batal</Button>
          <Button onClick={handleLogout}>Keluar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
