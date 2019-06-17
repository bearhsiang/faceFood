import React, { Component } from 'react';
import BotBtn from '../BotBtn';
export default class Profile extends Component {
    render() {
        return (
            <div style={{marginTop: '70px'}}>
	            <button className="btn" onClick={this.props.handleLogout} style={{backgroundColor: '#3f51b5', color: 'white'}} >
					Logout
                </button>
                <BotBtn />
            </div>
        );
    }
}
