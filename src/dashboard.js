import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { blue300, blue400, blue700, blue900 } from './colors'

class DashboardContainer extends Component {
    constructor(props){
        super(props);
        this.state =  {
            name : '',
            tasklist : [{name: ''}]
        };
    }
    handleNameChange = (event) =>{
        this.setState({ name: event.target.value });    
    }
    handleTaskNameChange = (tindx) => (event) => {
        const newTask = this.state.tasklist.map((task,index) => {
            if(tindx!==index) return task;
            return { ...task, name: event.target.value }
        });
        this.setState({ tasklist: newTask });
    }
    handleSubmit = (event) => {
        const { name, tasklist } = this.state;
        alert(`Incorporated: ${name} with ${tasklist.length} tasks`);  
    }
    handleAddTask = (event) => {
        this.setState({ tasklist : this.state.tasklist.concat({name: '' }) });
    }
    handleDeleteTask = (tindx) => (event) =>{
        this.setState({ tasklist: this.state.tasklist.filter( (task,indx) => tindx!==indx )});
    }
    render() {        
        return (
            <div>                
                <h1 style={{ color: blue300 }}>DASHBOARD</h1>                
                <form onSubmit={this.handleSubmit}>
                        <TextField
                        hintText="Card Name"
                        floatingLabelText="Enter Card Name"
                        onChange={this.handleNameChange}
                        value={this.state.name}
                        />
                        <h2 style={{ color: blue400 }}>{this.state.name}</h2>
                        <h5 style={{ color: blue300 }}>Create Task</h5>
                        {this.state.tasklist.map((task,index) =>( 
                            <div key={index}>                                
                                <TextField                                
                                hintText={`Enter task name`}
                                floatingLabelText={`Add task no ${index+1} `}
                                onChange={this.handleTaskNameChange(index)}
                                value={task.name} />
                                <i className="material-icons" style={{cursor:'pointer', color:blue300}} onClick={this.handleDeleteTask(index)}>remove_circle</i>  
                            </div>
                        ))}
                        <br/><br/>
                        <i className="material-icons orange600" style={{cursor:'pointer', color:blue300}} onClick={this.handleAddTask}>add_circle</i>
                        <button style={{cursor:'pointer', border:'0', background:'none', margin:'0', marginLeft:'20px', padding:'0'}}><i className="material-icons" style={{ color: blue700 }} >send</i></button>
                </form>
            </div>
        )
    }
}

export default DashboardContainer;