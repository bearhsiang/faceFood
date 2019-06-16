import React, { Component } from 'react';
import axios from 'axios';

export default class EditTodo extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            todo_name: '',
            todo_date: '',
            todo_responsible: '',
            todo_type:'',
            todo_completed:false,
            todo_deleted:false
        }

        //need to bind the function because we access the component's state (this.state) in the event handler method
        this.onChangeTodoName = this.onChangeTodoName.bind(this);
        this.onChangeTodoDate = this.onChangeTodoDate.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoType = this.onChangeTodoType.bind(this);
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
        this.onChangeTodoDeleted = this.onChangeTodoDeleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:8081/todos/' + this.props.match.params.id)
        .then(response => {
            this.setState({
                todo_name: response.data.todo_name,
                todo_date: response.data.todo_date,
                todo_responsible: response.data.todo_responsible,
                todo_type: response.data.todo_type,
                todo_completed: response.data.todo_completed,
                todo_deleted: false
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    onChangeTodoName(e) {
        this.setState({todo_name: e.target.value});
    }

    onChangeTodoDate(e) {
        this.setState({ todo_date: e.target.value});
    }
    onChangeTodoResponsible(e) {
        this.setState({ todo_responsible: e.target.value});
    }

    onChangeTodoType(e) {
        this.setState({ todo_type: e.target.value});
    }

    onChangeTodoCompleted(e) {
        this.setState({ todo_completed: !(this.state.todo_completed) });
    }

    onChangeTodoDeleted() {
        this.setState({ todo_deleted: true });
    }

    onSubmit(e) {
        e.preventDefault();
        let newTodo = {
            todo_name: this.state.todo_name,
            todo_date: this.state.todo_date,
            todo_responsible: this.state.todo_responsible,
            todo_type: this.state.todo_type,
            todo_completed: this.state.todo_completed,
            todo_deleted: this.state.todo_deleted
        };

        console.log(newTodo);
        axios.post('http://localhost:8081/todos/update/' + this.props.match.params.id, newTodo).then(res => console.log(res.data));

        // redirect back user to the default route (homepage)
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="container">
                <h3 align="center">Update Your Menu List</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Item Name </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_name}
                                onChange={this.onChangeTodoName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Item Date: </label>
                        <input  type="text"
                                placeholder="YYYY/MM/DD"
                                className="form-control"
                                value={this.state.todo_date}
                                onChange={this.onChangeTodoDate}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Review: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_responsible}
                                onChange={this.onChangeTodoResponsible}
                        />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="typeOptions" 
                                    id="foods" 
                                    value="foods"
                                    checked={this.state.todo_type==='foods'} 
                                    onChange={this.onChangeTodoType}
                                    />
                            <label className="form-check-label">foods</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="typeOptions" 
                                    id="beverages" 
                                    value="beverages"
                                    checked={this.state.todo_type==='beverages'} 
                                    onChange={this.onChangeTodoType}
                                    />
                            <label className="form-check-label">beverages</label>
                        </div>
                    </div>
                    <div className="form-check">
                        <input  className="form-check-input"
                                id="completedCheckbox"
                                type="checkbox"
                                name="completedCheckbox"
                                onChange={this.onChangeTodoCompleted}
                                checked={this.state.todo_completed}
                                value={this.state.todo_completed}
                                />
                        <label className="form-check-label" htmlFor="completedCheckbox">Completed</label>                        
                    </div><br />
                    <div className="form-group">
                        <input type="submit" value="Update" className="btn" style={{backgroundColor: '#3f51b5', color: 'white'}}/>

                        <span> &nbsp;</span>

                        <button className="btn" onClick={this.onChangeTodoDeleted} style={{backgroundColor: '#3f51b5', color: 'white'}}>Delete</button>
                    </div>
                </form>
            </div>
        );
    }
}