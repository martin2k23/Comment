import { useState } from "react";
import './styles.css'

const PostContent =({comments,setComments})=>{
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    
    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };
    
    const handleSubmit = () => {
        if (name.trim() !== '' && comment.trim() !== '') {
          const currentDate = new Date().toLocaleDateString();
          const newComment = { name: name, comment: comment, date: currentDate };
          const updatedComments = [...comments, newComment];
          setComments(updatedComments);
          setName('');
          setComment('');
        }
    };

    return(
    <div className="comment-section">
            <div className="name">
                Comment
            </div>
        <div className="input-container">
            <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Name"
            className="input-name"
            />
            <input
            type="text"
            value={comment}
            onChange={handleCommentChange}
            placeholder="Comment"
            className="input-comment"
            />
            <div className='button'>
                <button onClick={handleSubmit} className="post-button">Post</button>
            </div>
        </div>
    </div>
    )
}
export default PostContent