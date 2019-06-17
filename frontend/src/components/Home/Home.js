import React, {Component} from 'react';
// import Cookie from 'js-cookie';

class Home extends Component{
	render(){
		return(
			<div className='container'>
				<h1>Home</h1>
				<button className="btn" onClick={this.props.handleLogout} style={{backgroundColor: '#3f51b5', color: 'white'}} >
					Logout
				</button>
			</div>
		)
	}
}

export default Home;