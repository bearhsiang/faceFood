import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
// import './UsersList.css';
import io from 'socket.io-client';
import Cookie from 'js-cookie';

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: [],
            heart: []
        }
        this.socket = io.connect('http://localhost:3001');
        // console.log(this.props.post);
        this.props.post.photo.map((photoID) => {
        	this.socket.emit('getImgByID', photoID);
        })
        this.socket.on('img', image => {
        	this.setState(state => {
        		state.image.push(image);
                // state.heart.push()
	        	return {state};
	        });
        })
        // console.log(this.state.image);

    }

    want = () => {
        let post_id = this.props.post._id;
        let user_id = Cookie.get('user');
        // console.log(user_id);
        this.socket.emit('want', post_id, user_id);
    }

    delwant = () => {
        console.log("delwant");
        let post_id = this.props.post._id;
        let user_id = Cookie.get('user');
        this.socket.emit('delwant', post_id, user_id);
    }

    excerpt = string => {
        var shortText = string.substr( 0, 50 )
        if (string.length > 50) {
            shortText = shortText + '...';
        }
        return shortText;
    }

    render() {
        return (
            <ul id={this.props._id} className={this.props.className}>
            	<li><h4>{this.props.post.name}</h4></li>
            	<li><img src={this.state.image[0]} width="100%" /></li>
                <li>
                    <button className="btn" style={{padding: '0 1px'}}><Icon circular name={this.props.want} color="red"/></button>
                    {this.props.post.rate}
                    {
                        this.props.user === Cookie.get('user') && 
                        <button className="btn" onClick={this.delwant} style={{padding: '0 1px', marginLeft: '6px'}}>
                            <Icon circular name='trash alternate outline' color="grey"/>
                        </button>
                    }
                </li>
            	<li style={{color: 'gray'}}>{this.props.post.location}</li>
                <li style={{color: 'gray', fontStyle: 'italic'}}>{this.props.post.y}/{this.props.post.m}/{this.props.post.d}</li>
                <li>{this.excerpt(this.props.post.text)}</li>
            	<li><Link to={`/post/${this.props.post._id}`}>Read More</Link></li>
            </ul>
        );
    }
}
