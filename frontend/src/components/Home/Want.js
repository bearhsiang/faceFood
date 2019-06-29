import React, { Component } from 'react';
import Cookie from 'js-cookie';
import io from 'socket.io-client';

import "./Login.css"

// import BotBtn from '../Createpost/BotBtn';
import Post from '../Post/PostInProfile';
import emptyUser from '../../emptyUser';

const endpoint = process.env.REACT_APP_END_POINT;

class Want extends Component{
	constructor(props){
		super(props);
		this.user = this.props.user;
		this.ownerid = this.props.match.params.id;
		this.state = {
			owner: emptyUser,
			post: []
		};
		this.ownerSocket = io.connect(endpoint);
		this.postSocket = io.connect(endpoint);
		this.ownerSocket.emit('getUserByID', this.ownerid);
		this.ownerSocket.on('user', user => {
			this.setState({owner:user, post:[]});
			user.wantlist.forEach(post_id => {
				this.postSocket.emit('getPostByID', post_id);
			});
		})
		
        this.postSocket.on('post', data => {
        	this.setState(state => {
        		state.post.push(data);
        		return state;
        	})
        })
	}

	gotoHeart = () => {
		// let href = 'http://localhost:3000/users/' + this.props.match.params.id + '/wanted'
		// window.location.href = href;
		// this.props.history.push(`${this.props.match.params.id}/wanted`);
		return
	}
	componentWillUnmount(){
		this.postSocket.disconnect();
		this.ownerSocket.disconnect();
	}
	logout = () => {
		Cookie.remove('user');
		this.setState({user: undefined});
		this.socket.emit('logout', {});
	}

	render(){
		return (
			<div style={{marginTop: '70px'}}>
				{/* {this.state.user === Cookie.get('user') && 
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
				} */}
				<div id="content-bottom">
				<h2>{this.state.owner.name}'s Wanted List</h2>
			        <div className="content-bottom-inner">
			        {
			        	this.state.post.map((post, _id) => {
			        		var want = "heart", classname;
			        			if (!this.user.wantlist.includes(post._id)) {
					       			want = "heart outline";
					       		}
				       		if (!(_id % 3)) {
				       			classname = "clear";
				       		}
			       			return (
			        			<Post className={classname} key={post._id} post={post} want={want} user={this.user} wantSocket={this.props.wantSocket}/>								
			        			// <Post className={classname} key={_id} post={post} id={_id} want={want} user={this.state.user}/>
			        		)
			        		// }
				        		
		                })
			        }
			            <div className="clear"></div>
			        </div>
			 
				</div>
				
				{/* {this.user._id === this.state.owner._id && <BotBtn socket={this.postSocket}/>} */}
				
	        </div>
		)
	}
}

export default Want;
