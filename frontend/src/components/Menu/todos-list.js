import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import '../index.css';

const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_name}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_date}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_type}</td>
        <td>
            <Link to={"/edit/" + props.todo._id}>Edit</Link>
        </td>
    </tr>
);
var arrayeq = (a1, a2) => {
    return JSON.stringify(a1) === JSON.stringify(a2);
}
export default class TodosList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            sort: '', 
            todos: []
        
        }
        this.Sort = this.Sort.bind(this);
        this.onSubmitNewSort = this.onSubmitNewSort.bind(this);
    }

    componentDidMount() {
        console.log('Mount');
        axios.get('http://localhost:8081/todos/')
        .then(response => {
            this.setState({ todos : response.data });
        })
        .catch(err => {
            console.log(err);
        });
    }

    //update automatically after changing it 
    componentDidUpdate() {
        console.log('Update');
        axios.get('http://localhost:8081/todos/')
        .then(response => {
            console.log('response:');
            console.log(response.data);
            console.log(this.state.todos);
            if(arrayeq(response.data, this.state.todos)){
                console.log('same');
            }else{
                return;
                this.setState({ todos : response.data });
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    Sort(e) {
        console.log('Sort: ' + e.target.value);
        this.setState({sort: e.target.value});
    }

    onSubmitNewSort(e) {
        e.preventDefault();
        // this.setState({sort: ''});
        this.props.history.push('/');
    }

    // iterate through the array of todo lis items using map function
    todoList() {
        if(this.state.sort !== '') {
            var sorted = this.state.todos.filter((e) => {
                return e.todo_date === this.state.sort;
            });

            return sorted.map(function(currentTodo, index){
                return <Todo todo={currentTodo} key={index} />;
            });

        } 
        else {
            return this.state.todos.map(function(currentTodo, index){
                return <Todo todo={currentTodo} key={index} />;
            });
        }
        
    }

    render() {
        return (
            <div className="container" style={{marginTop: '15px'}}>
                <h3>Your Menu Lists</h3>
                <form onSubmit={this.onSubmitNewSort}>
                    <div className="form-group">
                        <input  type="text"
                                placeholder="Sorted by : YYYY/MM/DD"
                                className="form-control"
                                value={this.state.sort}
                                onChange={this.Sort}
                        />
                    </div>
                </form>

                <table className="table table-hover" style={{ marginTop: 20 }}>
                <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Item Date</th>
                            <th>Review</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}