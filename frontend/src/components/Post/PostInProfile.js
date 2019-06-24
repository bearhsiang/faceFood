import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
// import './UsersList.css';
import io from 'socket.io-client';
import Cookie from 'js-cookie';

var href;

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ulStyle: "",
            image: []
        }
        this.socket = io.connect('http://localhost:3001');
        this.props.post.photo.map((photoID) => {
        	this.socket.emit('getImgByID', photoID);
        })
        this.socket.on('img', image => {
        	this.setState(state => {
        		state.image.push(image);
	        	return {state};
	        });
        })
    }

    want = () => {
        console.log("want");
        let post_id = this.props.post._id;
        let user_id = Cookie.get('user');
        this.socket.emit('want', post_id, user_id);
    }

    render() {
        return (
            <ul id={this.props._id} className={this.props.className}>
            	<li><h4>{this.props.post.name}</h4></li>
            	<li><img src={this.state.image[0]} width="100%" /></li>
                <li>
                    <button className="btn" onClick={this.want} style={{padding: '0 1px'}}>
                        <Icon name={this.props.want} color="red"/>
                    </button>
                </li>
            	<li>{this.props.post.text}</li>
            	<li>{this.props.post.location}</li>
            	<li>
                    <a href={'/post/' + this.props.post._id}>Read More</a>
                </li>
            </ul>
        );
    }
}
