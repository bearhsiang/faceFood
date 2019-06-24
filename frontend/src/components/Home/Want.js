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
			want: []
		};
		this.socket = io.connect(endpoint);
		// this.getUserById
		this.socket.emit('getWantByUser', this.state.user);
        this.socket.on('wantlist', data => {
			data.map((post, _id) => {
			    this.socket.emit('getPostByID', post);
		    })
			// console.log(data);
        });
        this.socket.on('post', data => {
        	// console.log(data);
        	this.setState(state => {
        		state.want.push(data);
        		console.log(this.state.want);
        	})
        })
        
	}

	gotoHeart = () => {
		let href = 'http://localhost:3000/users/' + this.props.match.params.id + '/wanted'
		window.location.href = href;
	}

	logout = () => {
		Cookie.remove('user');
		this.setState({user: undefined});
		this.socket.emit('logout', {});
	}

	render(){
		return (
			<div style={{marginTop: '70px'}}>
				{this.state.user === Cookie.get('user') && 
					<div>
						<button id="heart" className="fixedButton" onClick={this.gotoHeart}>
							<Icon name='heart' size="large" style={{margin: '0px'}}/>
						</button>
						<button id="logout" className="fixedButton" onClick={this.logout}>
							<Icon name='sign-out' size="large" style={{margin: '0px'}}/>
						</button>
					</div>
				}
				{this.state.user !== Cookie.get('user') && 
					<div>
						<button className="fixedButton" onClick={this.gotoHeart} style={{bottom: "12px"}}>
							<Icon name='heart' size="large" style={{margin: '0px'}}/>
						</button>
					</div>
				}
				<div id="content-bottom">
				<h2>[$AuthorName]'s Wanted List</h2>
			        <div className="content-bottom-inner">
			        {
			        	this.state.want.map((post, _id) => {
			        		// console.log("post");
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
