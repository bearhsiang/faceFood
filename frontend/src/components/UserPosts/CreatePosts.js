import React, { Component } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import io from 'socket.io-client';
import Cookie from 'js-cookie';

const today = new Date();
export default class CreatePosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author: Cookie.get('user'),
            name: '',
            y: today.getFullYear(),
            m: today.getMonth()+1,
            d: today.getDate(),
            text: '',
            location: '',
            photo: '',
            previewURL: '',
            rate: 2.5
        };
        this.socket = io.connect('http://localhost:3001');

        this.setName = this.setName.bind(this);
        this.setText = this.setText.bind(this);
        this.setLocation = this.setLocation.bind(this);
        this.uploadFigure = this.uploadFigure.bind(this);
        this.setRate = this.setRate.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    setName(e) {
        this.setState({ name: e.target.value});
    }

    setText(e) {
        this.setState({ text: e.target.value});
    }

    setLocation(e) {
        this.setState({ location: e.target.value});
    }

    setRate(e) {
        this.setState({ rate: e.target.value });
        console.log("the rate is " + this.state.rate);
    }

    uploadFigure = (e) => {
		e.preventDefault();
		let reader = new FileReader();  // reader.result is the base64 of photo
        let file = e.target.files[0];
        console.log("The image: ");
        console.log(file);
		reader.onload = () => {
			this.setState({
				photo: file,
				previewURL: reader.result
			});
		}
		reader.readAsDataURL(file);
    }
    onSubmitHandler(e) {
        e.preventDefault();

        console.log("The date is " + this.state.y + " " + this.state.m + " " + this.state.d)
        
        if(!this.state.name) return;
         let newpost = {
            author: this.state.author,
            name: this.state.name,
            y: this.state.y,
            m: this.state.m,
            d: this.state.d,
            text: this.state.text,
            location: this.state.location,
            photo: this.state.photo,
            rate: this.state.rate
        };
        this.setState = {
            author: '',
            name: '',
            y: '',
            m: '',
            d: '',
            text: '',
            location: '',
            photo: '',
            rate: ''
        }
        this.socket.emit('createPost', newpost);
    }

    render() {
        return (
        <div className="container" style={{margin: '2rem auto', height: '600px', width: '300px'}}>
            <form onSubmit={this.onSubmitHandler}>
                <Form.Group as={Row} controlId="formName">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter user's name"
                        value={this.state.name}
                        onChange={this.setName}
                    />
                    <Form.Text className="text-muted">
                        Your name will be publicly shared.
                    </Form.Text>
                </Form.Group>

                <Form.Group as={Row} controlId="formText">
                    <label>Description</label>
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.text}
                        onChange={this.setText}
                    />
                </Form.Group>

                <Form.Group as={Row} controlId="formLocation">
                    <label>Location</label>
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.location}
                        onChange={this.setLocation}
                    />
                </Form.Group>

                <Form.Group as={Row} controlId="formFigure">
                    <Form.Label>Image</Form.Label>
                    <input id='figure'
                        type="file"
                        className='form-control'
                        onChange={this.uploadFigure}
                    />
                </Form.Group>
                {this.state.previewURL !== '' && <img style={{height: '16.66rem', marginBottom: '1rem', marginLeft: '-0.5rem'}} src={this.state.previewURL} alt="preview" />}

                <Form.Group as={Row} controlId="formRate">
                    <input
                        type="range" 
                        className="custom-range"
                        step={0.1}
                        min ={0}
                        max={5}
                        ticks={[1,2,3,4,5]}
                        value={this.state.rate}
                        onChange={this.setRate}
                    />
                </Form.Group>
              
                <Form.Group as={Row} controlId="formBasicChecbox">
                    <Form.Check type="checkbox" label="Agree" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>            
            </form>
        </div>
        );
    }
}
