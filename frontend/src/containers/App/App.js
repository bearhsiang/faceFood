import React, { Component } from 'react';
import webSocket from 'socket.io-client'
import TopNav from '../../components/TopNav';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Auth from '../../components/Home/Auth';
import UsersList from '../../components/User/UsersList';
import Profile from '../../components/Home/Profile';
import Want from '../../components/Home/Want';
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
            <Route path='/users/:id' component={Profile}/>
            <Route path="/:id/wanted" component={Want}/>
            <Route path='/post/:id' component={EachPost}/>
            <Redirect to='/' />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
