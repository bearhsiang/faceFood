import React, { Component } from 'react';
import io from 'socket.io-client';
import { Jumbotron } from 'react-bootstrap';
import './EachPost.css';
export default class EachPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postID: this.props.match.params.id,
            post: "",
            author: "",
            image: []
        }
        this.socket = io.connect('http://localhost:3001');
        this.socket.emit('getPostByID', this.state.postID);
        this.socket.on('post', data => {
            this.setState({ post: data });
            this.state.post.photo.map((photoID) => {
                this.socket.emit('getImgByID', photoID);
            });

            this.socket.on('img', image => {
                this.setState(state => {
                    state.image.push(image);
                    return {state};
                });
            });

            this.socket.emit('getUserByID', this.state.post.author);
            this.socket.on('user', user => {
                this.setState({ author: user });
            });
        });
    }
    render() {
        return (
            <Jumbotron style={{position:'static'}}>
            <h2>{this.state.post.name}</h2>
            <center><p style={{fontSize: '20px', fontStyle: 'italic'}}>{`by ${this.state.author.name}`}</p></center><br/>
            <div style={{display: 'flex', justifyContent: 'center'}}> 
            {this.state.image.map((img, i) => {
                return <img key={i} src={img} style={{width: '30%'}}/>
            })}
            </div><br />
            <p>{`Description: ${this.state.post.text}`}</p>
            <p>{`Location: ${this.state.post.location}`}</p>
            <p>{`Rate: ${this.state.post.rate} out of 5`}</p>
            
           
          </Jumbotron>
            

        );
    };
}
