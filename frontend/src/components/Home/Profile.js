import React, { Component } from 'react';
// import BotBtn from '../BotBtn';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Cookie from 'js-cookie'
import io from 'socket.io-client'

var endpoint = 'http://localhost:3001'

class Profile extends Component{
	constructor(props){
		super(props);
		this.state = {user:Cookie.get('user')};
		this.socket = io.connect(endpoint);
		this.socket.on('setCookie', data => {
			Cookie.set('user', data);
			this.setState({user: Cookie.get('user')});
		})
	}
	logout = () => {
		Cookie.remove('user');
		this.setState({user:undefined});
		this.socket.emit('logout', {});
	}
	render(){
		return (
			<div style={{marginTop: '70px'}}>
	            <button className="btn" onClick={this.logout} style={{backgroundColor: '#3f51b5', color: 'white'}} >
					Logout
				</button>
	        </div>
		)
	}
}

export default Profile;