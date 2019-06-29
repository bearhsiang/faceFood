import React, { Component } from 'react';
import { Button } from 'react-floating-action-button';
import './BotBtn.css';
import CreatePosts from '../UserPosts/CreatePosts';
import { OverlayTrigger, Popover } from 'react-bootstrap';
// var socket;
// const popover = (
    // <Popover id="popover-basic" title="Create Post" style={{maxWidth: '850px', height: '600px'}}>     
    //     <CreatePosts/>
    // </Popover>
// );
class BotBtn extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.socket = this.props.socket;
        // console.log(this.socket);
        // this.state = {
        //     openBot: false
        // }
    }
    popover = (socket) => (
        <Popover id="popover-basic" title="Create Post" style={{maxWidth: '850px', height: '600px'}}>     
            <CreatePosts socket={socket}/>
        </Popover>
    ) 
    handleClick() {
        console.log('masuk');
        // this.setState({ openBot: !this.state.openBot})
    }

    render() {
        return (
            <OverlayTrigger trigger="click" placement="left" overlay={this.popover(this.socket)}>
            <Button variant="success" styles={{position: 'fixed', right: '12px', bottom: '148px', backgroundColor: 'rgb(243,152,35)', color: 'white',fontSize: '36px'}}>+</Button>
            </OverlayTrigger> 
        );
    }
}

export default BotBtn;
