import React, { Component } from 'react';
import Comment from './Comment';
import style from './style';


class CommentList extends Component {
 render() {
    let commentNodes = this.props.data.map(comment => {
        return (
            <Comment 
            author={ comment.name } 
            tasklist= { comment.tasklist }
            key={ comment["_id"] }
            uniqueID={ comment["_id"] }
            onCommentDelete={ this.props.onCommentDelete }
            onCommentUpdate={ this.props.onCommentUpdate }>                
            </Comment>
        )
    })
    return (
        <div style={ style.commentList }>
            { commentNodes }
        </div>
    )
 }
}
export default CommentList;