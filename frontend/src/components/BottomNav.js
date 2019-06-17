import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import HomeIcon from '@material-ui/icons/Home';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import MenuList from './Menu/todos-list';
import CreateList from './Menu/create-todo';
import EditList from './Menu/edit-todo';
import Auth from './Home/Auth';

const useStyles = makeStyles({
  root: {
    width: 1000,
    textAlign: "center"
  },
});

export default function BottomNav() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  console.log('bottomnav create');
  return (
  <div style={{marginTop: '3em', position:'relative'}}>
  <Router>
    {/* <BottomNavigation
      style={{margin: 'auto', height: '100%', width:'100%'}}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction component={Link} to='/' label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction component={Link} to="/record" label="Favorites" icon={<FavoriteIcon />} />
      <BottomNavigationAction component={Link} to="/create"label="Nearby" icon={<LocationOnIcon />} />
    </BottomNavigation> */}

    <Switch>
      {/* <Route path="/" exact component={FoodSearch} /> */}
      <Route path='/' exact component={Auth} />
      <Route path="/record" component={MenuList}></Route>
      <Route path="/create" component={CreateList}></Route>
      <Route path="/edit/:id" component={EditList} />
    </Switch>
  </Router>
  
  </div>
    
  );
}