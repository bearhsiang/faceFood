import React, { useEffect } from 'react';
import clsx from 'clsx';
import Cookie from 'js-cookie';
import { makeStyles, fade } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchBar from './SearchBar';
import "./FoodSearch.css";
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const state = Cookie.get('user');
var show = "";
var searchInput = "";

function login(status) {
  if (state) {
    let href = "/users/" + state;
    return (<li><a href={href}>{status}</a></li>)
  } else {
    return (<li><a href="/login">{status}</a></li>)
  }
}

const TopNav = e => {
  const classes = useStyles();
  const [open] = React.useState(false);
  const [loginStatus, updateStatus] = React.useState("Login");
  const [href, updateHref] = React.useState("/login");
  
  if (state) {
    show = "Profile";
  }
  useEffect(() => {
    if(e.socket){
      //連線成功在 console 中打印訊息
      console.log('success connect!')
      //設定監聽
      initWebSocket()
    }
  },[e.socket])

  const initWebSocket = () => {
    //對 getMessage 設定監聽，如果 server 有透過 getMessage 傳送訊息，將會在此被捕捉
    e.socket.on('loginStatus', ({status, msg}) => {
      if(status === 'Fail') {
        console.log(msg);
      } else if (status === 'Success') {
        updateStatus("Profile");
        let href = "/users/" + Cookie.get('user');
        updateHref(href);
      }
    })
    e.socket.on('logoutStatus', () => {
      show = "";
      updateStatus("Login");
      updateHref("/login");
      window.location.href = "http://localhost:3000";
    })
  }

  const search = (e) => {
    console.log('Search key: ' + e.target.value);
    // insert the socket emit and on here
  }
  return (
    <div className={classes.root}>
    
      <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
          style={{backgroundColor: '#f39823'}}
        >
          <Toolbar style={{marginLeft: '100px'}}>
            <Typography className={classes.title} variant="h6" noWrap style={{marginTop: '6px'}}>
              <a className="EatingDiary" href="/">Eating Diary</a>
            </Typography>
            
            <div className={classes.search}>
              <SearchBar />
            </div>
            
            <div id="nav">
              <ul>
                {login(show || loginStatus)}
              </ul>
            </div>       
          </Toolbar>
        </AppBar>
    </div>
    );
}

export default TopNav;
