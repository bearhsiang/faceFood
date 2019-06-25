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
		// this.socket.emit('getWantByUser', Cookie.get('user'));
		this.socket.emit('getUserByID', this.state.user);
		this.socket.on('user', data => {
			this.setState({name: data.name});
		})
        this.socket.on('posts', data => {
			this.setState({ posts: data});
			this.socket.emit('getWantByUser', Cookie.get('user'));
			// let heart = this.state.posts.map(post => (post._id in data.wantlist))
			// this.setState({heart: heart});
        });
        this.socket.on('wantlist', data => {
			let heart = this.state.posts.map(post => {
				return data.wantlist.includes(post._id);
			})
			this.setState({heart: heart});
			// this.state.posts.forEach( post => {
			// 	let heart_list = 
			// 	this.setState(state => {
			// 		state.heart.push(data.wantlist.indexOf(post._id));
			// 		return state;
			// 	});
			// })
		});
		this.socket.on('wantConfirm', ({id, status}) => {
			console.log('get confirm');
			console.log(id);
			console.log(status);
			console.log(this.state.posts);

			this.setState(state => {
				state.heart[this.state.posts.findIndex(post => post._id == id)] = status;
				return state;
			})
			console.log(this.state.heart);
		})
	}

	gotoHeart = () => {
		// let href = 'http://localhost:3000/' + this.props.match.params.id + '/wanted'
		// window.location.href = href;
		this.props.history.push(`${this.props.match.params.id}/wanted`);
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
			        	this.state.posts.map( (post, _id) => {
			        		let want, classname;
			        		if (this.state.heart[_id]) {
			        			want = "heart";
			        		}
			        		else {
			        			want = "heart outline";
			        		}
			        		if (!(_id % 3)) {
			        			classname = "clear";
			        		}
			        		return (
			        			<Post className={classname} key={_id} post={post} id={_id} want={want} wantSocket={this.socket}/>
			        		)
		                })
			        }
			        </div>
				</div>
				
				{this.state.user === Cookie.get('user') && <BotBtn/>}
				
	        </div>
		)
	}
}

export default Profile;
