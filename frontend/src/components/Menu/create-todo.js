import React, { Component } from 'react';
import axios from 'axios';

export default class CreateTodo extends Component {

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

        this.AssignTodo_Name = this.AssignTodo_Name.bind(this);
        this.AssignTodo_Date = this.AssignTodo_Date.bind(this);
        this.AssignTodo_Responsible = this.AssignTodo_Responsible.bind(this);
        this.AssignTodo_Type = this.AssignTodo_Type.bind(this);
        this.onSubmit_forNewTodoList = this.onSubmit_forNewTodoList.bind(this);
    }

    AssignTodo_Name(e) {
        this.setState({
            todo_name: e.target.value
        });
    }

    AssignTodo_Date(e) {
        this.setState({
            todo_date: e.target.value
        });
    }

    AssignTodo_Responsible(e) {
        this.setState({
            todo_responsible: e.target.value
        });
    }

    AssignTodo_Type(e) {
        this.setState({
            todo_type: e.target.value
        });
    }

    onSubmit_forNewTodoList(e) {
        e.preventDefault();
        console.log('Form is submitted as follows:');
        console.log(`Todo Name: ${this.state.todo_name}`);
        console.log(`Todo Date: ${this.state.todo_date}`);
        console.log(`Todo Responsible: ${this.state.todo_responsible}`);
        console.log(`Todo Type: ${this.state.todo_type}`);

        let newTodo = {
            todo_name: this.state.todo_name,
            todo_date: this.state.todo_date,
            todo_responsible: this.state.todo_responsible,
            todo_type: this.state.todo_type,
            todo_completed: this.state.todo_completed,
            todo_deleted: this.state.todo_deleted
        };

        // axios send HTTP POST req to server endpoint
        axios.post('http://localhost:8081/todos/add', newTodo).then(res => console.log(res.data));

        this.setState({
            todo_name: '',
            todo_date: '',
            todo_responsible: '',
            todo_type:'',
            todo_completed:false,
            todo_deleted: false
        });

    }
    render() {
        return (
           <div className="container" style={{marginTop: '15px'}}>
                <h3>Create New Menu List</h3>
                <form onSubmit={this.onSubmit_forNewTodoList}>
                    <div className="form-group">
                        <label>Item Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_name}
                                onChange={this.AssignTodo_Name}
                        />
                    </div>

                    <div className="form-group">
                        <label>Item Date: </label>
                        <input  type="text"
                                placeholder="YYYY/MM/DD"
                                className="form-control"
                                value={this.state.todo_date}
                                onChange={this.AssignTodo_Date}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Review: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_responsible}
                                onChange={this.AssignTodo_Responsible}
                        />
                    </div>

                    {/* foods or beverages */}
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="typeOptions"
                                    id="foods"
                                    value="foods"
                                    checked={this.state.todo_type==='foods'}
                                    onChange={this.AssignTodo_Type}
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
                                    onChange={this.AssignTodo_Type}
                            />
                            <label className="form-check-label">beverages</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Menu List" className="btn" style={{backgroundColor: '#3f51b5', color: 'white'}}/>
                    </div>
                </form>
           </div>
        );
    }
}