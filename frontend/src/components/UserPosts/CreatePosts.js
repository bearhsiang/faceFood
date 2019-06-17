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
            photo: [],
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
        // https://stackoverflow.com/questions/55526876/reactjs-preview-multiple-images-before-upload
        e.preventDefault();
        if(e.target.files) {
            const files = Array.from(e.target.files);
            Promise.all(files.map(img => {
                return(new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.addEventListener('load', element => {
                        resolve(element.target.result);
                    });
                    reader.addEventListener('error', reject);
                    reader.readAsDataURL(img);
                }));
            }))
            .then(images => {
                this.setState({ photo: images});
            }, error => {
                console.error(error);
            });
        }

        // let reader = new FileReader();  // reader.result is the base64 of photo
        // let file = e.target.files[0];
		// reader.onloadend = () => {
		// 	this.setState({
		// 		photo: [...this.state.photo, file],
		// 		previewURL: [...this.state.previewURL, reader.result]
		// 	});
		// }
        // reader.readAsDataURL(file);
    }

    onSubmitHandler(e) {
        e.preventDefault();
        console.log(Cookie.get('user'));
        // console.log("The date is " + this.state.y + " " + this.state.m + " " + this.state.d)
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
        console.log(newpost);
        this.setState = {
            // author: "",
            name: "",
            y: "",
            m: "",
            d: "",
            text: "",
            location: "",
            photo: [],
            rate: 2.5
        }
        this.socket.emit('createPost', newpost);
    }

    render() {
        return (
        <div className="container" style={{margin: '2rem auto', height: '600px', width: '300px'}}>
            <form onSubmit={this.onSubmitHandler} >
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
                    <input 

                        name="file[]"
                        id='figure'
                        type="file"
                        className='form-control'
                        multiple onChange={this.uploadFigure}
                    />
                </Form.Group>

                {this.state.previewURL !== [] && 
                this.state.photo.map((url, id) => {
                    return <img key={id}  style={{height: '16.66rem', width: '16.66rem', marginBottom: '1rem', marginLeft: '-0.5rem'}} src={url} alt="preview" /> })
               }

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
