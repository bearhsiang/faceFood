import React, {Component} from 'react';
import Cookie from 'js-cookie'
import Home from './Home'
import Login from './Login'
import io from 'socket.io-client'
import Signup from './Signup'

import "../FoodSearch.css";

class Auth extends Component{
	constructor(props){
		super(props);
		this.state = {user:Cookie.get('user')};
		this.endpoint = 'http://localhost:3001'
		this.socket = io.connect(this.endpoint);
		this.socket.on('setCookie', data => {
			Cookie.set('user', data);
			this.setState({user: Cookie.get('user')});
		})
	}
	logout = () => {
		Cookie.remove('user');
		this.setState({user:undefined});
	}
	login = id => {
		Cookie.set('user', id);
		this.setState({user: Cookie.get('user')});
	}
	render(){
		if(this.state.user){
			return <Home handleLogout={this.logout}/>
		}
		return(
			<div className="content">
				<Login handleLogin={this.login} />
				<Signup handleLogin={this.login} />
			</div>
		)
	}
}

export default Auth;