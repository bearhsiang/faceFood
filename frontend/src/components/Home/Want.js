import React, { Component } from 'react';
import Cookie from 'js-cookie';
import io from 'socket.io-client';
import { Icon } from 'semantic-ui-react';

import "./Login.css"

import BotBtn from '../BotBtn';
import Post from '../Post/PostInWant'

var endpoint = 'http://localhost:3001'

class Profile extends Component{
	constructor(props){
		super(props);

		this.state = {
			name: "",
			user: this.props.match.params.id,
			want: [],
			mywantlist: [],
			heart: []
		};
		this.socket = io.connect(endpoint);
		this.socket.emit('getUserByID', this.state.user);
		this.socket.emit('getWantByUser', this.state.user);
		if (this.state.user !== Cookie.get('user')) {
			this.socket.emit('getWantByUser', Cookie.get('user'));
		}
		this.socket.on('user', data => {
			this.setState({name: data.name});
		})

        this.socket.on('wantlist', data => {
        	if (data.id === this.state.user) {
        		console.log(data);
        		data.wantlist.map((post, _id) => {
				    this.socket.emit('getPostByID', post);
			    })
        	} else {
        		console.log(data);
        		this.setState({mywantlist: data});
        	}
        });
        this.socket.on('post', data => {
        	this.setState(state => {
        		state.want.push(data);
        		return state;
        	})
        })
	}
j
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
				<h2>{this.state.name}'s Wanted List</h2>
			        <div className="content-bottom-inner">
			        {
			        	this.state.want.map((post, _id) => {
			        		var want = "heart", classname;
			        		if (this.state.user !== Cookie.get('user')) {
			        			if (this.state.mywantlist.wantlist.indexOf(post._id) < 0) {
					       			want = "heart outline";
					       		}
			        		}
				       		if (!(_id % 3)) {
				       			classname = "clear";
				       		}
			       			return (
			        			<Post className={classname} key={_id} post={post} id={_id} want={want} user={this.state.user}/>
			        		)
			        		// }
				        		
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
