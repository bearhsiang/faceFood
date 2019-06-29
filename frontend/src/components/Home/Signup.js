import React, {Component} from 'react';
// import { timingSafeEqual } from 'crypto';
import io from 'socket.io-client'
import { Redirect } from 'react-router-dom';

import "./Login.css"

const endpoint = process.env.REACT_APP_END_POINT;
class Signup extends Component{
	constructor(props){
		super(props);
		this.state = {
			name: '',
			password: '',
			email: '',
			figure: '',
			imgdata: '',
			status: false,
			// tmpURL: '',
		}
		this.socket = io.connect(endpoint);
		this.socket.on('signupStatus', ({status, msg}) => {
			if(status === 'failed'){
				// console.log(msg);
				return;
			}else if(status === 'success'){
				this.props.handleLogin(msg);
				this.setState({status: true});
			}
		})
		this.socket.on('img', data => {
			// console.log(data);
			this.setState({tmpURL: data});
		})
	}
	changeValue = (e) => {
		let ret = {}
		ret[e.target.id] = e.target.value;
		this.setState(ret);
	}
	signup = (e) => {
		e.preventDefault();
		if(!this.state.name || !this.state.password || !this.state.email ) return;
		this.socket.emit('signup', {'name': this.state.name, 'password': this.state.password, 'email':this.state.email, 'figure': this.state.imgdata});
		this.setState({
			name: '',
			password: '',
			email: '',
			figure: '',
			imgdata: '',
		})
	}
	changeFigure = (e) => {
		e.preventDefault();
		let reader = new FileReader();
		let file = e.target.files[0];
		reader.onloadend = () => {
			this.setState({
				figure: file,
				imgdata: reader.result
			});
		}
		reader.readAsDataURL(file);

	}
	render(){
		if(this.state.status){
			return <Redirect push to='/'></Redirect>
		}
		return(
			<div className="container" style={{right: '0px', padding: '0 100px 0 50px'}}>
				<form onSubmit={this.signup}>
                    <div className="form-group">
                        <label>User Name </label>
						<input  id='name'
								type="text"
								placeholder="Name"
                                className="form-control"
                                onChange={this.changeValue}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password </label>
						<input  id='password'
								type="password"
                                placeholder="Password"
								className="form-control"
                                onChange={this.changeValue}
                        />
                    </div>
                    
					<div className="form-group">
                        <label>Email </label>
						<input  id='email'
								type="text"
                                placeholder="Email"
								className="form-control"
                                onChange={this.changeValue}
                        />
                    </div>

					<div className="form-group">
                        <label />Figure
						<input  id='figure'
								type='file'
								className='form-control'
								onChange={this.changeFigure}
                        />
					</div>

                    <div className="form-group">
                        <input type="submit" value="Sign Up" className="btn" style={{backgroundColor: '#3f51b5', color: 'white'}}/>
                    </div>
				</form>
				{this.state.imgdata? <img src={this.state.imgdata} className='rounded mx-auto d-block' alt='figure' /> : null}
				{/* <button onClick={() => this.socket.emit('getImgByID', 'tmp')} value='click'/>
				{this.state.tmpURL ? <img src={this.state.tmpURL} className='rounded mx-auto d-block'/> : null} */}
			</div>
		)
	}
}

export default Signup;