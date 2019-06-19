import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Cookie from 'js-cookie'
import io from 'socket.io-client'

import "./Login.css"

import BotBtn from '../BotBtn';
import Post from '../Post/Post in Profile'
// import CreatePost from "../UserPosts/CreatePosts"

var endpoint = 'http://localhost:3001'

class Profile extends Component{
	constructor(props){
		super(props);
		this.state = {user: Cookie.get('user'),
					  posts: []};
		this.socket = io.connect(endpoint);
		this.socket.emit('getPostsByUser', this.state.user);
		this.socket.on('setCookie', data => {
			Cookie.set('user', data);
			this.setState({user: Cookie.get('user')});
		})
        this.socket.on('posts', data => {
        	this.setState({ posts: data})
        });
	}
	createPost = () => {
		// console.log("createPost");
		let href = '/users/' + this.state.user + '/create';
		// console.log(href);
		window.location = href;
	}
	logout = () => {
		Cookie.remove('user');
		this.setState({user:undefined});
		this.socket.emit('logout', {});
	}
	render(){
		let href = '/users/' + this.state.user + '/create';
		return (
			<div style={{marginTop: '70px'}}>
				<div id="content-bottom">
			        <div className="content-bottom-inner">
			        {
			        	this.state.posts.map((post, id) => {
			        		return (
			        			<Post key={id} post={post} />
			        			)
		                })
			        }
			            <ul>
			            	<li><h4>Lorem Ipsum</h4></li>
			                <li><img src="images/1.jpg" alt="image1" width="270" /></li>
			                <li>Lorem ipsum dolor sit amet dolor sit, consectetur adipiscing elit. Donec rhoncus mi quis metus laoreet ultricies. </li>
			                <li><a href="#">Read More</a></li>
			            </ul>
			            
			            <ul>
			            	<li><h4>Proin Fermentum</h4></li>
			                <li><img src="images/2.jpg" alt="image2" width="270" /></li>
			                <li>Lorem ipsum dolor sit amet dolor sit, consectetur adipiscing elit. Donec rhoncus mi quis metus laoreet ultricies. </li>
			                <li><a href="#">Read More</a></li>
			            </ul>
			            
			            <ul className="lastcol">
			       	    	<li><h4>Nunc pulvinar</h4></li>
			                <li><img src="images/3.jpg" alt="image3" width="270" /></li>
			                 <li>Lorem ipsum dolor sit amet dolor sit, consectetur adipiscing elit. Donec rhoncus mi quis metus laoreet ultricies. </li>
			                <li><a href="#">Read More</a></li>
			            </ul>
			            
			            <div className="clear"></div>
			        </div>
			 
			    </div>
	            <button className="btn" onClick={this.createPost} style={{backgroundColor: '#3f51b5', color: 'white'}} >
					Add post
				</button>
				<button className="btn" onClick={this.logout} style={{backgroundColor: '#3f51b5', color: 'white'}} >
					Logout
				</button>
				<BotBtn />
	        </div>
		)
	}
}

export default Profile;
