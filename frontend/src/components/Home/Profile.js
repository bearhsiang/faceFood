import React, { Component } from 'react';
import Cookie from 'js-cookie';
import io from 'socket.io-client';
import { Icon } from 'semantic-ui-react';
// import { Button } from 'react-floating-action-button';

import "./Login.css"

import BotBtn from '../BotBtn';
import Post from '../Post/PostInProfile'
// import CreatePost from "../UserPosts/CreatePosts"

var endpoint = 'http://localhost:3001'

class Profile extends Component{
	constructor(props){
		super(props);

		this.state = {
			user: this.props.match.params.id,
			posts: []
		};
		this.socket = io.connect(endpoint);
		this.socket.emit('getPostsByUser', this.state.user);
		// this.socket.on('setCookie', data => {
		// 	Cookie.set('user', data);
		// 	this.setState({user: Cookie.get('user')});
		// })
        this.socket.on('posts', data => {
			this.setState({ posts: data})
        });
        
	}

	gotoHeart = () => {
	}

	logout = () => {
		Cookie.remove('user');
		this.setState({user: undefined});
		this.socket.emit('logout', {});
	}

	render(){
		let href = '/users/' + this.state.user + '/create';
		return (
			<div style={{marginTop: '70px'}}>
				{this.state.user === Cookie.get('user') && 
					<div>
						<button id="heart" onClick={this.gotoHeart}>
							<Icon name='heart' size="large" style={{margin: '0px'}}/>
						</button>
						<button id="logout" onClick={this.logout}>
							<Icon name='sign-out' size="large" style={{margin: '0px'}}/>
						</button>
					</div>
				}
				<div id="content-bottom">
			        <div className="content-bottom-inner">
			        {
			        	this.state.posts.map((post, _id) => {
			        		console.log("post");
			        		return (
			        			<Post key={_id} post={post} id={_id}/>
			        		)
		                })
			        }
			            <div className="clear"></div>
			        </div>
			 
				</div>
				
				{this.state.user === Cookie.get('user') && <BotBtn/>}
				
	        </div>
		)
	}
}

export default Profile;
