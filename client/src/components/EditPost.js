import React, { useState } from 'react';
import axios from 'axios';

function EditPost(props) {
  const [editPost, setEditPost] = useState({
    title: '',
    contents: ''
  })

  const submitEdit = e => {
    e.preventDefault();
    axios
      .put('http://localhost:5000/api/posts/', editPost)
      .then(res => {
        console.log(res)
        props.setPostData([...props.postData, editPost])
        props.setIsEditing(false)
      })
      .catch(err => console.log(err))
  }

  const onChange = e => {
    setEditPost({
      ...editPost,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <form onSubmit={submitEdit}>
        <input 
          type="text"
          name="title"
          value={editPost.title}
          placeholder="title..."
          onChange={onChange}
        />
        <input 
          type="text"
          name="contents"
          value={editPost.contents}
          placeholder="contents..."
          onChange={onChange}
        />
        <button>edit User</button>
      </form>
    </div>
  );
}

export default EditPost;