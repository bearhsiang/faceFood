import React, { Component } from 'react';
import webSocket from 'socket.io-client'
import TopNav from '../../components/TopNav';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Auth from '../../components/Home/Auth';
import UsersList from '../../components/User/UsersList';
import Profile from '../../components/Home/Profile';
import Want from '../../components/Home/Want';
import EachPost from '../../components/UserPosts/EachPost';
import Cookie from 'js-cookie';
import emptyUser from '../../emptyUser'

const endpoint = 'http://localhost:3001';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: Cookie.get('user'),
      user: emptyUser,
    };
    this.wantSocket = webSocket(endpoint);
    this.wantSocket.on('wantConfirm', ({id, status}) => {
      console.log('wantconfirm');
      let user = this.state.user;
      if(status){
        user.wantlist.push(id);
      }else{
        user.wantlist = user.wantlist.filter(postid => postid !== id);
      }
      this.setState({user:user});
    })
    this.userSocket = webSocket(endpoint);
    this.userSocket.emit('getUserByID', this.state.userid);
    this.userSocket.on('user', user => {
      this.setState({user:user});
      this.forceUpdate();
    })
    this.searchSocket = webSocket(endpoint);
  }

  render() {
    return (
      <div style={{marginTop: '2em'}}>
        <TopNav socket={this.searchSocket}/>
        {/* <BotBtn /> */}
        {/* <BottomNav/> */}
        <Router>
          <Switch>
            {/* <Route path="/" exact component={FoodSearch} /> */}
            <Route path="/" exact component={UsersList}/>
            <Route path='/login' component={Auth}/>
            {/* <Route path='/users/:id' render={ props => <Profile {...props}/>}/> */}
            <Route path='/users/:id' exact component={ (props) => <Profile {...props} wantSocket={this.wantSocket} user={this.state.user} /> }/>
            {/* <Route path="/users/:id/wanted" component={Want}/> */}
            <Route path='/users/:id/wanted' component={ (props) => <Want wantSocket={this.wantSocket} user={this.state.user} {...props}/>} />
            <Route path='/post/:id' component={EachPost}/>
            <Redirect to='/' />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
