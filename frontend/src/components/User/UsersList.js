import React, { Component } from 'react';
import Users from './Users';
import './UsersList.css';
import io from 'socket.io-client';
import Cookie from 'js-cookie';

export default class UsersList extends Component {
    constructor(props) {
        super(props);
        // delete the content of otherusers for the real implementation and uncomment the two functions below!
        this.state = {
            otherusers: []
        };
        this.user = Cookie.get('user');
        this.socket = io.connect(process.env.REACT_APP_END_POINT);
        this.socket.emit('getUsers', this.user);
        this.socket.on('users', data => { this.setState({ otherusers: data})});        
    }
    componentDidMount() {
        // listen for data from db
        this.socket.emit('getUsers', this.user);
        this.socket.on('users', data => { this.setState({ otherusers: data})});
    }
    
    render() {
        return (
            <div className="UsersList">
            {
                this.state.otherusers.map((user, id) => {
                    return <Users key={id} user={user} />
                })
            }
            </div>
        );
    }
}
