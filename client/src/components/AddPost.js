import React, { useState } from 'react';
import axios from 'axios';

const initialPost = {
  title: '',
  contents: ''
}

function AddPost(props) {
  const [addPost, setAddPost] = useState(initialPost)

  const submitPost = e => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/posts/', addPost)
      .then(res => {
        console.log(res)
        props.setPostData([...props.postData, addPost])
        props.setIsAdding(false)
      })
      .catch(err => console.log(err))
  }

  const onChange = e => {
    setAddPost({
      ...addPost,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <form onSubmit={submitPost}>
        <input 
          type="text"
          name="title"
          value={addPost.title}
          placeholder="title..."
          onChange={onChange}
        />
        <input 
          type="text"
          name="contents"
          value={addPost.contents}
          placeholder="contents..."
          onChange={onChange}
        />
        <button>Add Post</button>
      </form>
    </div>
  );
}

export default AddPost;