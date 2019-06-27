import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Cookie from 'js-cookie'
// import Home from './Home'
import Profile from './Profile'
import Login from './Login'
import io from 'socket.io-client'
import Signup from './Signup'

import "../FoodSearch.css";

class Auth extends Component{
	render(){
		return(
			<div className="content">
				<Login handleLogin={this.props.handleLogin} />
				<Signup handleLogin={this.login} />
			</div>
		)
	}
}

export default Auth;