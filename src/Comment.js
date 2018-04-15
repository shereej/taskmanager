//Comment.js
import React, { Component } from 'react';
import style from './style';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import Chip from 'material-ui/Chip';

import TextField from 'material-ui/TextField';
import { blue300,  orange800 } from './colors';


const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};


//import marked from 'marked';
class Comment extends Component {

    
constructor(props) {
    super(props);
    this.state= {
        toBeUpdated: false,
        tasklist: [{name: ''}]
    };
    //binding all our functions to this class
    this.deleteComment = this.deleteComment.bind(this);
    this.updateComment = this.updateComment.bind(this);    
    this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
    this.handleTaskNameChange = this.handleTaskNameChange.bind(this);
 }


updateComment(e) {
    e.preventDefault();
    //brings up the update field when we click on the update link.
    this.setState({ toBeUpdated: !this.state.toBeUpdated });
 }


 handleCommentUpdate(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    //if author or text changed, set it. if not, leave null and our PUT 
    //request will ignore it.
    let name = (this.state.author) ? this.state.author : null;
    let text = (this.state.text) ? this.state.text : null;
    
    //alert(this.state.tasklist);
    let tasks = this.state.tasklist.map((task,index) => {
            
           if(task.name===' ' || !task.name) { 
                //alert("task name "+task.name+"   ::::: repaint val "+this.props.tasklist[index].name);                          
                //return { ...task, name: this.props.tasklist[index].name } 
                task.name = this.props.tasklist[index].name;                            
           }
           return task;

    });

    
    let comment = { name: name, text: text, tasklist: tasks };
    this.props.onCommentUpdate(id, comment);
    
    this.setState({
        toBeUpdated: !this.state.toBeUpdated,
        author: '',
        text: '',
        tasklist: this.props.tasklist
    })
    
 }


 deleteComment(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onCommentDelete(id);
    console.log('oops deleted');
 }


 handleTaskNameChange = (tindx) => (event) => {
        const newTask = this.props.tasklist.map((task,index) => {
            if(tindx!==index) return task;                       
            return { ...task, name: event.target.value }
        });
        this.setState({ tasklist: newTask });
 }
componentDidMount() {
    this.setState({ tasklist: this.props.tasklist });   
}
 render() {
    
    return (


        <div style={ style.comment }>


        <Card>
            <CardHeader
            title="Update this Card!"
            subtitle="You can EDIT/DELETE this card"
            avatar="/images/shereej-dp.jpg"
            />
            
            <CardTitle title={this.props.author} subtitle="is the card name and below are the tasks associated" />
            <CardText>
                <div style={styles.wrapper} >  
                    {this.props.tasklist.map((task,index) =>(                     
                      
                        <Chip
                        key={index}
                        style={styles.chip}
                        >
                        {task.name}
                        </Chip>                             
                    
                    ))}
                </div>
            </CardText>


            <CardActions>
            <FlatButton style={{ color: blue300 }} onClick={ this.updateComment } label="Edit" />
            <FlatButton style={{ color: orange800 }} onClick={ this.deleteComment } label="Delete" />
            </CardActions>


        
        { (this.state.toBeUpdated)
        ? ( <form>
            {this.props.tasklist.map((task,index) =>( 
                    
                    <div key={index}>                                
                        <TextField     
                        index={index}                           
                        hintText={ task.name }
                        floatingLabelText={ task.name }
                        onChange={this.handleTaskNameChange(index)}
                         />
                    </div>
            ))}    

        
            
            <FlatButton style={{ color: blue300 }} onClick={ this.handleCommentUpdate } label="Update" />
            
        </form> ) : null}

        </Card>
        </div>
    )
}
}
export default Comment;