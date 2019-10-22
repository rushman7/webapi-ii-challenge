import React, { useState, useEffect } from 'react';
import AddPost from './components/AddPost';
import axios from 'axios';
import './App.css';

function App() {
  const [postData, setPostData] = useState([])
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/posts/')
      .then(res => {
        setPostData(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  const deleteUser = id => {
    axios
      .delete(`http://localhost:5000/api/posts/${id}`)
      .then(() => setPostData(postData.filter(user => user.id !== id)))
      .catch(err => console.log(err))
  }

  const addUser = () => {
    setIsAdding(true)
  }

  return (
    <div className="App">
      <header className="App-header">
        {!isAdding && <button onClick={addUser}>Add User</button>}
        {isAdding && <AddPost 
          postData={postData} 
          setPostData={setPostData} 
          setIsAdding={setIsAdding}
        />}
        {postData.map(user => {
          return <div className="post-div" key={user.id}>
            <p>{user.title}</p>
            <p>{user.contents}</p>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </div>
        })}
      </header>
    </div>
  );
}

export default App;