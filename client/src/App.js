import React, { useState, useEffect } from 'react';
import AddPost from './components/AddPost';
import EditPost from './components/EditPost';
import axios from 'axios';
import './App.css';

function App() {
  const [postData, setPostData] = useState([])
  const [isAdding, setIsAdding] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/posts/')
      .then(res => {
        setPostData(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  const deletePost = id => {
    axios
      .delete(`http://localhost:5000/api/posts/${id}`)
      .then(() => setPostData(postData.filter(post => post.id !== id)))
      .catch(err => console.log(err))
  }

  const addPost = () => {
    setIsAdding(true)
  }

  const editPost = () => {
    setIsEditing(true)
  }

  return (
    <div className="App">
      <header className="App-header">
        {!isAdding && <button onClick={addPost}>Add Post</button>}
        {isAdding && <AddPost 
          postData={postData} 
          setPostData={setPostData} 
          setIsAdding={setIsAdding}
        />}
        {postData.map(post => {
          return <div className="post-div" key={post.id}>
            <p>{post.title}</p>
            <p>{post.contents}</p>
            {!isEditing && <button onClick={editPost}>Edit</button>}
            {isEditing && <EditPost 
              postData={postData} 
              setPostData={setPostData} 
              setIsEditing={setIsAdding}
            />}
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </div>
        })}
      </header>
    </div>
  );
}

export default App;