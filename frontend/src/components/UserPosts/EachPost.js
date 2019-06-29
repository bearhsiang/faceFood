import React, { Component } from 'react';
import io from 'socket.io-client';
import { Jumbotron } from 'react-bootstrap';
import './EachPost.css';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
const endpoint = process.env.REACT_APP_END_POINT;
export default class EachPost extends Component {
    constructor(props) {
        super(props);
        this.postID = this.props.match.params.id;
        this.state = {
            post: "",
            author: "",
            image: []
        }
        this.socket = io.connect(endpoint);
        this.socket.emit('getPostByID', this.postID);
        this.socket.on('post', data => {
            this.setState({ 
                post: data,
                author: '',
                image:[],
            });
            this.state.post.photo.forEach((photoID) => {
                this.socket.emit('getImgByID', photoID);
            });


            this.socket.emit('getUserByID', this.state.post.author);

        });
        this.socket.on('img', image => {
            this.setState(state => {
                state.image.push(image);
                return {state};
            });
        });
        this.socket.on('user', user => {
            this.setState({ author: user });
        });
    }
    componentWillReceiveProps(next){
        if(this.props.match.params.id !== next.match.params.id){
            this.postID = next.match.params.id;
            this.socket.emit('getPostByID', this.postID);
        }
    }
    render() {
        let user_link = this.state.author._id? `/users/${this.state.author._id}`:'';
        return (
            <Jumbotron style={{position:'static'}}>
            <h2>{this.state.post.name}</h2>
            <center><Link to={user_link}><p style={{fontSize: '20px', fontStyle: 'italic'}}>{`by ${this.state.author.name}`}</p></Link></center><br/>
            <div style={{display: 'flex', justifyContent: 'center'}}> 

            <Carousel autoPlay={true} infiniteLoop={true} useKeyboardArrows={true} showThumbs={false} showArrows={false} showStatus={false}>
                {this.state.image.map((img, i) => {
                    return (
                        <div key={i} style={{height: '500px', maxWidth: '100%', backgroundColor: '#e9ecef'}}>
                            <img src={img} alt='foods' style={{maxHeight: '100%', maxWidth: '100%',width: 'auto', height: 'auto', contain: 'fit'}} />
                        </div>
                    )
                })}
            </Carousel>
           
            </div><br />
            <p style={{fontWeight: 'bold'}}>Description:</p>
            <p>{`${this.state.post.text}`}</p>
            
            <p style={{fontWeight: 'bold', display: 'inline'}}>Location: </p>
            <p style={{display: 'inline'}}>{`${this.state.post.location}`}</p>
            <br/>
            
            <p style={{fontWeight: 'bold', display: 'inline'}}>Rate: </p>
            <p style={{display: 'inline'}}>{`${this.state.post.rate} out of 5`}</p>
            
           
          </Jumbotron>
            

        );
    };
}
