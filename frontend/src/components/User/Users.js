import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './UsersList.css';

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: ''
        }
        this.socket = this.props.socket;
        this.socket.on('getImgByID', this.props.user.figure, image => {
            this.setState({image: image})
        });
    }
    render() {
        return (
            <div className="Users">
                <img  className="image-container" src={this.state.image} alt={this.props.user.name}/>
                <div className="UsersInformation">
                    <Link to={`/${this.props.user.wantlist}/wanted`} style={{color: 'black',textDecoration: 'none'}}><h2>{this.props.user.name}</h2></Link>
                    <p>{this.props.user.email}</p>
                </div>
            </div>
        );
    }
}
