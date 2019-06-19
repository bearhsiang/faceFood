import React, { Component } from 'react';
import { Button } from 'react-floating-action-button';
import './BotBtn.css';
import CreatePosts from './UserPosts/CreatePosts';
import { OverlayTrigger, Popover } from 'react-bootstrap';
const popover = (
    <Popover id="popover-basic" title="Create Post" style={{maxWidth: '850px', height: '600px'}}>     
        <CreatePosts />
    </Popover>
);
class BotBtn extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        // this.state = {
        //     openBot: false
        // }
    }
    handleClick() {
        console.log('masuk');
        // this.setState({ openBot: !this.state.openBot})
    }

    render() {
        return (
            <OverlayTrigger trigger="click" placement="left" overlay={popover}>
                <Button variant="success" styles={{position: 'static', marginTop: '-5em', marginLeft: '40em', backgroundColor: '#f39823', color: 'white',fontSize: '36px'}}>+</Button>
            </OverlayTrigger> 
        );
    }
}

export default BotBtn;
