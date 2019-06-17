import React, { Component } from 'react';
// import BottomNav from '../../components/BottomNav';
import TopNav from '../../components/TopNav';
// import BotBtn from '../../components/BotBtn';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import MenuList from '../../components/Menu/todos-list';
import CreateList from '../../components/Menu/create-todo';
import EditList from '../../components/Menu/edit-todo';
import Auth from '../../components/Home/Auth';
import UsersList from '../../components/User/UsersList';
import Profile from '../../components/Profile';

class App extends Component {
  render() {
    return (
      <div style={{marginTop: '2em'}}>
        <TopNav /><br/><br/>
        {/* <BotBtn /> */}
        {/* <BottomNav/> */}
        <Router>
        <Switch>
          {/* <Route path="/" exact component={FoodSearch} /> */}
          <Route path='/login' exact component={Auth} />
          <Route path="/record" component={MenuList}></Route>
          <Route path="/create" component={CreateList}></Route>
          <Route path="/edit/:id" component={EditList} />
          <Route path="/" exact component={UsersList} />
          <Route path="/:id/wanted" component={UsersList} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </Router>
      </div>
    )
  }
}

export default App
