import { useEffect, useState } from "react";
import './styles.css'

const PostContent =({comments,setComments,reply,setReply=()=>{}})=>{
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
            let updatedComments;
            if(reply){
                const newComment = { name: name, comment: comment, date: currentDate, replyId: reply?.id, id: Date.now() };
                updatedComments = [...comments, newComment];
            }
            else {
                const newComment = { name: name, comment: comment, date: currentDate, id: Date.now() };
                updatedComments = [...comments, newComment];
            }
            setComments(updatedComments);
            localStorage.setItem('comments', JSON.stringify(updatedComments));
            setName('');
            setComment('');
        }
        setReply(false);
    };

    useEffect(() => {
        const storedComments = localStorage.getItem('comments');
        if (storedComments) {
            setComments(JSON.parse(storedComments));
        }
    }, [setComments]); 
    

    return(
    <div className="comment-section">
            <div className="name">
                {reply ? "Reply" : "Comment"}
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