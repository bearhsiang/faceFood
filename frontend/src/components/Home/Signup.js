import React, {Component} from 'react';
// import { timingSafeEqual } from 'crypto';
import io from 'socket.io-client'

import "./Login.css"

const endpoint = 'http://localhost:3001'
class Signup extends Component{
	constructor(props){
		super(props);
		this.state = {
			name: "",
			password: "",
			email:"",
			figure:"",
			imgdata: '',
			// tmpURL: '',
		}
		this.socket = io.connect(endpoint);
		this.socket.on('signupStatus', ({status, msg}) => {
			if(status === 'failed'){
				console.log(msg);
			}else if(status === 'success'){
				this.props.handleLogin(msg);
			}
		})
		this.socket.on('img', data => {
			console.log(data);
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
		console.log(this.state);
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

		return(
			<div className="container" style={{right: '0px', padding: '0 100px 0 50px'}}>
				<form onSubmit={this.signup}>
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
                        <label>email </label>
						<input  id='email'
								type="text"
                                placeholder="123@example.com"
								className="form-control"
                                onChange={this.changeValue}
                        />
                    </div>

					<div className="form-group">
                        <label>Figure</label>
						<input  id='figure'
								type="file"
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