import React, { Component } from 'react';
import webSocket from 'socket.io-client'

// import BottomNav from '../../components/BottomNav';
import TopNav from '../../components/TopNav';
// import BotBtn from '../../components/BotBtn';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
// import MenuList from '../../components/Menu/todos-list';
// import CreateList from '../../components/Menu/create-todo';
// import EditList from '../../components/Menu/edit-todo';
import Auth from '../../components/Home/Auth';
import UsersList from '../../components/User/UsersList';
import Profile from '../../components/Home/Profile';
import Want from '../../components/Home/Want';
import CreatePost from '../../components/UserPosts/CreatePosts';
import EachPost from '../../components/UserPosts/EachPost';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {socket: webSocket('http://localhost:3001')};
  }

  render() {
    return (
      <div style={{marginTop: '2em'}}>
        <TopNav socket={this.state.socket}/>
        {/* <BotBtn /> */}
        {/* <BottomNav/> */}
        <Router>
          <Switch>
            {/* <Route path="/" exact component={FoodSearch} /> */}
            <Route path="/" exact component={UsersList}/>
            <Route path='/login' component={Auth}/>
            <Route path='/users/:id' exact component={Profile}/>
            <Route path='/post/:id' exact component={Profile}/>
            <Route path="/:id/wanted" component={Want}/>
            <Route path='/post/:id' exact component={EachPost}/>
            <Redirect to='/' />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
