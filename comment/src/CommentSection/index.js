import React, { useState } from 'react';
import './styles.css';
import Comment from './Comment';
import PostContent from './PostContent';

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  return (
    <div>
        <PostContent comments={comments} setComments={setComments}/>
    
        <Comment 
            comments={comments}
            setComments={setComments} 
        />

    </div>

  );
};

export default CommentSection;
