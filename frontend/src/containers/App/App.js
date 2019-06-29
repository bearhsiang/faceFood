import React, { Component } from 'react';
import webSocket from 'socket.io-client'
import TopNav from '../../components/Topnav/TopNav';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Auth from '../../components/Home/Auth';
import UsersList from '../../components/User/UsersList';
import Profile from '../../components/Home/Profile';
import Want from '../../components/Home/Want';
import EachPost from '../../components/UserPosts/EachPost';
import Cookie from 'js-cookie';
import emptyUser from '../../emptyUser'

const endpoint = process.env.REACT_APP_END_POINT
class App extends Component {
  constructor(props) {
    super(props);
    this.userid = Cookie.get('user');
    this.state = {
      user: emptyUser,
    };
    this.wantSocket = webSocket(endpoint);
    this.wantSocket.on('wantConfirm', ({id, status}) => {
      let user = this.state.user;
      if(status){
        user.wantlist.push(id);
      }else{
        user.wantlist = user.wantlist.filter(postid => postid !== id);
      }
      this.setState({user:user});
    })
    this.userSocket = webSocket(endpoint);
    this.userSocket.emit('getUserByID', this.userid);
    this.userSocket.on('user', user => {
      this.setState({user:user});
      // console.log('get user:');
      // console.log(user);
    })
    
  }
  handleLogout = () => {
    Cookie.remove('user');
    this.userid = undefined;
    this.setState({
      user: emptyUser,
    });
  }
  handleLogin = (id) => {
    Cookie.set('user', id);
    this.userid = id;
    this.userSocket.emit('getUserByID', this.userid);
  }

  render() {
    return (
      <div style={{marginTop: '2em'}}>
        
        {/* <BotBtn /> */}
        {/* <BottomNav/> */}
        <Router>

          <TopNav user={this.state.user}/>

          <Switch>    
            {/* <Route path="/" exact component={FoodSearch} /> */}
            <Route path="/" exact component={UsersList}/>
            <Route path='/login' component={ (props) => <Auth {...props} handleLogin={this.handleLogin}/>} />
            {/* <Route path='/users/:id' render={ props => <Profile {...props}/>}/> */}
            <Route path='/users/:id' exact component={ (props) => <Profile {...props} wantSocket={this.wantSocket} user={this.state.user} handleLogout={this.handleLogout}/> }/>
            {/* <Route path="/users/:id/wanted" component={Want}/> */}
            <Route path='/users/:id/wanted' component={ (props) => <Want wantSocket={this.wantSocket} user={this.state.user} {...props}/>} />
            <Route path='/post/:id' exact component={EachPost}/>
            <Redirect to='/' />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
