import React, { Component } from 'react';
import Cookie from 'js-cookie';
import io from 'socket.io-client';
import { Icon } from 'semantic-ui-react';
import "./Login.css"
import emptyUser from '../../emptyUser'
import BotBtn from '../Createpost/BotBtn';
import Post from '../Post/PostInProfile'

const endpoint = process.env.REACT_APP_END_POINT;

class Profile extends Component{
	constructor(props){
		super(props);
		this.ownerid = this.props.match.params.id;
		this.state = {
			user: this.props.user,
			owner: emptyUser,
			posts: [],
			check: false,
		};
		this.postSocket = io.connect(endpoint);
		this.ownerSocket = io.connect(endpoint);
		this.postSocket.emit('getPostsByUser', this.ownerid);
		this.ownerSocket.emit('getUserByID', this.ownerid);
		this.postSocket.on('posts', data => {
			this.setState({posts: data? data:[]});
		})
		this.ownerSocket.on('user', user => {
			this.setState({
				owner: user,
			});
		})
	}
	componentWillUnmount(){
		this.postSocket.disconnect();
		this.ownerSocket.disconnect();
	}
	componentWillReceiveProps(next){
		if(this.props.match.params.id !== next.match.params.id){
			this.ownerid = next.match.params.id;
			this.ownerSocket.emit('getUserByID', this.ownerid);
			this.postSocket.emit('getPostsByUser', this.ownerid);
		}
	}
	gotoHeart = () => {
		this.props.history.push(`${this.props.match.params.id}/wanted`);
	}

	logout = () => {
		Cookie.remove('user');
		this.setState({user: undefined});
		this.props.handleLogout();
	}
	render(){
		return (
			<div style={{marginTop: '70px'}}>
				{this.ownerid === this.state.user._id && 
					<div>
						<button id="heart" className="fixedButton" onClick={this.gotoHeart}>
							<Icon name='heart' size="large" style={{margin: '0px'}}/>
						</button>
						<button id="logout" className="fixedButton" onClick={this.logout}>
							<Icon name='sign-out' size="large" style={{margin: '0px'}}/>
						</button>
					</div>
				}
				{this.ownerid !== this.state.user._id && 
					<div>
						<button className="fixedButton" onClick={this.gotoHeart} style={{bottom: "12px"}}>
							<Icon name='heart' size="large" style={{margin: '0px'}}/>
						</button>
					</div>
				}
				<div id="content-bottom">
				<h2>{this.state.owner.name}'s Diary</h2>
			        <div className="content-bottom-inner">
			        {
			        	this.state.posts.map( (post, index) => {
			        		let want, classname;
			        		if (this.state.user.wantlist.includes(post._id)) {
			        			want = "heart";
			        		}
			        		else {
			        			want = "heart outline";
			        		}
			        		if (!(index % 3)) {
			        			classname = "clear";
							}
			        		return (
			        			<Post className={classname} key={post._id} post={post} want={want} user={this.state.user} wantSocket={this.props.wantSocket}/>
			        		)
		                })
			        }
			        </div>
				</div>
				{this.ownerid === this.state.user._id && <BotBtn socket={this.postSocket}/>}
				
	        </div>
		)
	}
}

export default Profile;
