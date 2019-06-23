import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client'

import "./Login.css"

var endpoint = 'http://localhost:3001'

class Login extends Component{
	constructor(props){
		super(props);
		this.state = {
			name: "",
			password: "",
			href: "",
			status: ""
		}
		this.socket = io.connect(endpoint);
		this.socket.on('loginStatus', ({status, msg}) => {
			if(status === 'Fail'){
				console.log(msg);
				this.setState({status: status});			
			}else if(status === 'Success'){
				this.props.handleLogin(msg);
				let href = "/users/" + msg;
				this.setState({
					href: href,
					status: status
				});
			}
		})
	}
	changeValue = (e) => {
		let ret = {}
		ret[e.target.id] = e.target.value;
		this.setState(ret);
	}
	
	login = (e) => {
		e.preventDefault();
		if(!this.state.name || !this.state.password) return;
		this.socket.emit('login', {'name': this.state.name, 'password': this.state.password});
	}

	componentDidMount() {
		if(this.state.status == 'Fail') {
			this.setState({
				name: "",
				password: "",
				href: "",
				status: ""
			})
		}
	}

	render(){
		if (this.state.href) {
			return (
				<Redirect push to={this.state.href}/>)
		}
		return(
			<div className="container" style={{padding: '0 50px 0 100px'}}>
				<form onSubmit={this.login}>
                    <div className="form-group">
                        <label>User Name: </label>
						<input  id='name'
								type="text"
								placeholder="Name......."
                                className="form-control"
                                onChange={this.changeValue}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password: </label>
						<input  id='password'
								type="text"
                                placeholder="*********"
								className="form-control"
                                onChange={this.changeValue}
                        />
                    </div>
                    
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn" style={{backgroundColor: '#3f51b5', color: 'white'}}/>
					</div>
					{(this.state.status === 'Fail') && <p style={{color: 'red'}}>The username doesn't exist. Please try again!</p>}
                </form>
			</div>
		)
	}
}

export default Login;
