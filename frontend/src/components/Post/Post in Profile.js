import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './UsersList.css';
import io from 'socket.io-client';
import Cookie from 'js-cookie';

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: []
        }
        this.socket = io.connect('http://localhost:3001');
        // this.socket.emit('getUsers', this.user);
        // this.props.post.photolist.map((photoID) => {
        // 	this.socket.emit('getImgByID', photoID);
        // })
        // this.socket.on('img', image => {
        // 	this.setState(state => {
        // 		state.image.push(image);
	       //  	return {state};
	       //  });
        // })
    }

    render() {
        return (
            <ul id={this.props.key}>
            	<li><h4>{this.props.post.name}</h4></li>
            	<li><img src={this.props.image} alt="image1" width="270" /></li>
            	<li>{this.props.post.text}</li>
            	<li>{this.props.post.location}</li>
            	<li><a href="#">Read More</a></li>
            </ul>
        );
    }
}
