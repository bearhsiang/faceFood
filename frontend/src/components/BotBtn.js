import React, { Component } from 'react';
import { Container, Button } from 'react-floating-action-button';
import Bot from './Bot';
import { relative } from 'path';

class BotBtn extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            openBot: false
        }
    }
    handleClick() {
        this.setState({ openBot: !this.state.openBot})
    }

    render() {
        return (
            <div> 
                
                <div style={{position: 'absolute', marginLeft: '95em', marginTop: '55em'}}>
                    <Button
                    tooltip="The Bot will help you!"
                    rotate={false}
                    styles={{backgroundColor: '#3f51b5'}}
                    onClick={this.handleClick}>
                    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" fill="white">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path><path d="M0 0h24v24H0z" fill="none"></path>
                    </svg>                
                    </Button>
                </div>
                <div style={{display: this.state.openBot === true ? "block" : "none", position: 'absolute', marginLeft: '72em', marginTop: '23em'}}>
                    <Bot openBot={this.state.openBot} />
                </div>
                
               
            </div>
        );
    }
}

export default BotBtn;