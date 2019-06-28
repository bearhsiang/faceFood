import React, {Component} from 'react';
import Login from './Login'
import Signup from './Signup'

import "../FoodSearch.css";

class Auth extends Component{
	render(){
		return(
			<div className="content">
				<Login handleLogin={this.props.handleLogin} />
				<Signup handleLogin={this.props.handleLogin} />
			</div>
		)
	}
}

export default Auth;