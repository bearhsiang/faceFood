import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './UsersList.css';
import io from 'socket.io-client';

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: ''
        }
        
        this.user = this.props.user;
        // console.log(this.user);
        this.socket = io.connect(process.env.REACT_APP_END_POINT);

        this.socket.emit('getImgByID', this.user.figure);
        this.socket.on('img', image => {
            this.setState({image: image})
        });
       
    }

    render() {
        return (
            <div className="Users">
                <img  className="image-container" src={this.state.image} alt={this.props.user.name}/>
                <div className="UsersInformation">
                    <Link to={`/users/${this.user._id}`} style={{color: 'black',textDecoration: 'none'}}><h2>{this.props.user.name}</h2></Link>
                    <p>{this.props.user.email}</p>
                </div>
            </div>
        );
    }
}
