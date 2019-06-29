import React from 'react';
import clsx from 'clsx';
import { makeStyles, fade } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchBar from './SearchBar_multi';
import {Link} from 'react-router-dom'
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


function login(state, status, classes) {
  // console.log(state);
  // console.log(status);
  if (state) {
    let href = "/users/" + state;
    // return <li><a href={href}>{status}</a></li>
    return <Typography className={classes.title} variant="h6" noWrap style={{marginTop: '6px'}}>
            <Link to={href} className='EatingDiary'>{status}</Link>
          </Typography> 
  } else {
    // return (<li><a href="/login">{status}</a></li>)
    return <Typography className={classes.title} variant="h6" noWrap style={{marginTop: '6px'}}>
            <Link to='/login' className='EatingDiary'>{status}</Link>
          </Typography>
  }
}

const TopNav = ({user}) => {
  const state = user._id;
  var show = state ? 'Profile':'Login';
  const classes = useStyles();
  const [open] = React.useState(false);

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
              {/* <a className="EatingDiary" href="/">Eating Diary</a> */}
              <Link to='/' className='EatingDiary'>faceFood</Link>
            </Typography>
            
            <div className={classes.search}>
              <SearchBar/>
            </div>
            
            <div id="nav">
              <ul>
                {login(state,show, classes)}
              </ul>
            </div>       
          </Toolbar>
        </AppBar>
    </div>
    );
}

export default TopNav;
