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
			name: "",
			user: this.props.match.params.id,
			posts: [],
			heart: []
		};
		this.socket = io.connect(endpoint);
		this.socket.emit('getPostsByUser', this.state.user);
		this.socket.emit('getWantByUser', this.state.user);
		this.socket.emit('getUserByID', this.state.user);
		this.socket.on('user', data => {
			this.setState({name: data.name});
		})
        this.socket.on('posts', data => {
			this.setState({ posts: data});
        });
        this.socket.on('wantlist', data => {
			this.state.posts.map((post, id) => {
				// console.log(post._id);
				this.setState(state => {
					state.heart.push(data.indexOf(post._id));
					return state;
				});
			})
			// console.log(this.state.heart);
        });
        
	}

	gotoHeart = () => {
		let href = 'http://localhost:3000/' + this.props.match.params.id + '/wanted'
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
				<h2>{this.state.name}'s Diary</h2>
			        <div className="content-bottom-inner">
			        {
			        	this.state.posts.map((post, _id) => {
			        		if (this.state.heart[_id] < 0) {
			        			var want = "heart outline";
			        		}
			        		else {
			        			var want = "heart";
			        		}
			        		return (
			        			<Post key={_id} post={post} id={_id} want={want} />
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
