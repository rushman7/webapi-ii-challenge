import React, { useState } from 'react';
import axios from 'axios';

const initialUser = {
  name: '',
  bio: ''
}

function AddPost(props) {
  const [addPost, setAddPost] = useState(initialUser)

  const submitUser = e => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/users/', addPost)
      .then(res => {
        console.log(res)
        props.setUserData([...props.userData, addPost])
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
      <form onSubmit={submitUser}>
        <input 
          type="text"
          name="name"
          value={addPost.name}
          placeholder="name..."
          onChange={onChange}
        />
        <input 
          type="text"
          name="bio"
          value={addPost.bio}
          placeholder="bio..."
          onChange={onChange}
        />
        <button>Add User</button>
      </form>
    </div>
  );
}

export default AddPost;