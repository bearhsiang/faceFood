import React, { Component } from 'react';
import Users from './Users';
import './UsersList.css';
import io from 'socket.io-client';

export default class UsersList extends Component {
    constructor(props) {
        super(props);
        // delete the content of otherusers for the real implementation and uncomment the two functions below!
        this.state = {
            otherusers: []
        };

        this.socket = io.connect('http://localhost:3001');
    }
    componentDidMount() {
        // listen for data from db
        this.socket.once('getUsers', data => this.setState({ otherusers: data}))
    }
    
    render() {
        return (
            <div className="UsersList">
            {
                this.state.otherusers.map((user, id) => {
                    console.log(user.figure)
                    return <Users key={id} user={user} socket={this.socket} />
                })
            }
            </div>
        );
    }
}
