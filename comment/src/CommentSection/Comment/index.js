import React, { useState } from 'react';
import './styles.css';
import DeleteIcon from './DeleteIcon.js'
import ReplyContent from '../ReplyContent';

const formatDate = (dateString) => {
  const parts = dateString.split('/');
  const day = parts[0];
  const month = parts[1];
  const year = parts[2];

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  let suffix;
  if (day >= 11 && day <= 13) {
    suffix = "th";
  } else {
    switch (day % 10) {
      case 1:
        suffix = "st";
        break;
      case 2:
        suffix = "nd";
        break;
      case 3:
        suffix = "rd";
        break;
      default:
        suffix = "th";
    }
  }

  return `${day}${suffix} ${monthNames[parseInt(month, 10) - 1]} ${year}`;
};

const Comment = ({ comments,setComments }) => {
  const [reply, setReply] = useState(false)
  const [editIndex, setEditIndex] = useState(-1);
  const [editedName, setEditedName] = useState('');
  const [editedComment, setEditedComment] = useState('');

  const handleEdit = (index, currentComment) => {
    setEditIndex(index);
    setEditedName(currentComment.name);
    setEditedComment(currentComment.comment);
  };

  const handleCancelEdit = () => {
    setEditIndex(-1);
    setEditedName('');
    setEditedComment('');
  };

  const handleSaveEdit = (index) => {
    if (editedName.trim() !== '' && editedComment.trim() !== '') {
      const currentDate = new Date().toLocaleDateString();
      const updatedComments = [...comments];
      updatedComments[index].name = editedName;
      updatedComments[index].comment = editedComment;
      updatedComments[index].date = currentDate;
      setEditIndex(-1);
      setEditedName('');
      setEditedComment('');
    }
  };

  const handleDelete = (index) => {
    const deleteComments = [...comments];
    deleteComments.splice(index, 1); 
    setComments(deleteComments);
  };

  return (
    <div>
      {comments.map((comment, index) => (
        <div className="comment-container" key={index}>
          <div className='name-container'>
            {editIndex === index ?  
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                placeholder="Name"
                className="input-name"
              /> :
              <div style={{fontWeight:"bold",fontSize:"12px"}}>{comment?.name}</div>
            }
            <div style={{fontSize:"12px"}}>{formatDate(comment.date)}</div>
          </div>

          {editIndex === index ?  
            <textarea
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
              rows={4}
              cols={50}
              placeholder="Comment"
              className="input-comment"
            /> :
            <div className="content">{comment?.comment}</div>
          }
          <div>
            {editIndex === index ? (
              <div className="action-container">
                <div onClick={() => handleSaveEdit(index)}>Save</div>
                <div onClick={handleCancelEdit}>Cancel</div>
              </div>
            ) : (
              <div className="action-container">
                <div className="reply" onClick={()=> setReply(true)}>Reply</div>
                <div className="edit" onClick={() => handleEdit(index, comment)}>Edit</div>
              </div>
            )}
          </div>

          <DeleteIcon onClick={() => handleDelete(index)} />
        </div>
      ))}
      {reply &&  <ReplyContent comments={comments} setComments={setComments}/>}
    </div>
  );
};

export default Comment;
