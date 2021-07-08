import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component{
    constructor(props){
        super(props);
        this.state = {
            username : '',
            discription : '',
            duration : '',
            date : new Date(),
            users : []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if(response.data.length > 0){
                    this.setState({
                        users : response.data.map(user => user.username),
                        username : response.data[0].username   // Displays the current user name
                    })
                }
            })

    }

    handleChange(e){
        this.setState({[e.target.name] : e.target.value})
    }

    handleChangeDate(date){
        this.setState({
            date : date
        })
    }

    handleSubmit(e){
        e.preventDefault();

        const exercise = {
            username : this.state.username,
            discription : this.state.discription,
            duration : this.state.duration,
            date : this.state.date,
        }

        console.log(exercise)

        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(res => console.log(res.data))

        window.location = '/';  // Takes back to home page
    }

    render(){
        return(
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group"> 
                    <label>Username: </label>
                    <select ref="userInput"
                        required
                        className="form-control"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}>
                        {
                            this.state.users.map(function(user) {
                            return <option key={user} value={user}>
                                        {user}
                                    </option>;
                            })
                        }
                    </select>
                    </div>
                    <div className="form-group"> 
                    <label>Description: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.discription}
                        name="discription"
                        onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={this.state.duration}
                        name="duration"
                        onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                        selected={this.state.date}
                        onChange={this.handleChangeDate}
                        />
                    </div>
                    </div>

                    <div className="form-group">
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}