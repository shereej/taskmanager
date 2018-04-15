//CommentForm.js
import React, { Component } from 'react';
import style from './style';
//import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { blue300, blue400, blue700 } from './colors';
//import Grid from 'material-ui/Grid';

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            name:'',
            tasklist: [{name: ''}]
        };
        
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTaskNameChange = this.handleTaskNameChange.bind(this);
        this.handleDeleteTask = this.handleDeleteTask.bind(this);
        this.handleAddTask = this.handleAddTask.bind(this);
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        let name = this.state.name.trim();        
        //let tasks = this.state.tasklist;
        let allow = true;
    
        let tasks = this.state.tasklist.map((task,index) => {            
                if(task.name===' ' || !task.name) {
                    allow = false;
                }
                return { ...task }
        });


        if(!allow || !name)
        return;


        this.props.onCommentSubmit({ name: name,  tasklist: tasks });
        this.setState({ name: '', tasklist: [{name: ''}] });
    }

    handleTaskNameChange = (tindx) => (event) => {
            const newTask = this.state.tasklist.map((task,index) => {
                if(tindx!==index) return task;
                return { ...task, name: event.target.value }
            });
            this.setState({ tasklist: newTask });
    }

    handleDeleteTask = (tindx) => (event) =>{
        this.setState({ tasklist: this.state.tasklist.filter( (task,indx) => tindx!==indx )});
    }

    handleAddTask = (event) => {
        this.setState({ tasklist : this.state.tasklist.concat({name: '' }) });
    }

 render() {
 return (
    <div>
    <form style={ style.commentForm } >
            <div style={ style.fullwidth }>
                <TextField
                hintText="Card Name"
                floatingLabelText="Enter Card Name"
                onChange={this.handleNameChange}
                value={this.state.name}
                />
            </div>
             <div style={ style.fullwidth }>
                <h2 style={{ color: blue400 }}>{this.state.name}</h2>
                </div>
            <div style={ style.fullwidth }>
                <h5 style={{ color: blue300 }}>Create Task</h5>
                </div>
            
            <div style={ style.fullwidth }>
                {this.state.tasklist.map((task,index) =>( 
                    <div key={index}>                                
                        <TextField                                
                        hintText={`Enter task name`}
                        floatingLabelText={`Add task no ${index+1} `}
                        onChange={this.handleTaskNameChange(index)}
                        value={task.name} />
                        <i className="material-icons" title="delete" style={{cursor:'pointer', color:blue300}} onClick={this.handleDeleteTask(index)}>remove_circle</i>  
                    </div>
                ))}
                
            </div>
            <br/><hr/>
            <div style={ style.fullwidth }>
                <i className="material-icons orange600" title="add" style={{cursor:'pointer', color:blue300}} onClick={this.handleAddTask}>add_circle</i>
                
                <button onClick={ this.handleSubmit } title="send" style={{cursor:'pointer', border:'0', background:'none', margin:'0', marginLeft:'20px', padding:'0'}}>
                    <i className="material-icons" style={{ color: blue700 }} >send</i>
                </button>
            </div>
            <hr/>
            <hr/>
                
        
               
    </form>
    </div>
 )
 }
}
export default CommentForm;