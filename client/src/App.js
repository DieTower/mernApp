import { useEffect, useState } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

function App() {

  const [state, setState] = useState({
    title: '',
    body: '',
    posts: []
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState( previusState => ({
      ...previusState,
      [name]: value
    }) );
  }

  const submit = (event) => {
    event.preventDefault();

    const payload = {
      title: state.title,
      body: state.body
    }

    axios({
      url: '/api/save',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('Data has been sent to the server');
        resetUserInputs();
        getBlogPost();
      })
      .catch(() => {
        console.log('Internal error server');
      });
  }

  const resetUserInputs = () => {
    setState({
      title: '',
      body: '',
      posts: []
    });
  }

  const getBlogPost = () => {
    axios.get('/api')
      .then((response) => {
        const data = response.data;
        setState( (previusState) => ({ ...previusState, posts: data }) );
        console.log('Data has been received!');
      })
      .catch(() => {
        alert('Error retrieving data!');
      });
  }

  const displayBlogPost = (posts) => {

    if(!posts.length) return null;

    return posts.map((post, index) => (
      <div key={index}>
        <h3>{post.title ? post.title : 'No title'}</h3>
        <p>{post.body}</p>
      </div>
    ));
  }

  useEffect(() => {
    console.log('State: ', state);
    //getBlogPost();
  }, [state]);

  useEffect(() => {
    getBlogPost();
  }, []);

  return (
    <div className="App">
      <h2>Welcome to my App</h2>
      <form onSubmit={submit} >
        <div className="form-input">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={state.title}
            onChange={handleChange} />
        </div>
        
        <div className="form-input">
          <textarea
            name="body"
            placeholder="Body"
            cols="30"
            rows="10"
            value={state.body}
            onChange={handleChange}></textarea>
        </div>

        <button>Submit</button>
      </form>

      <div className="blog">
        {displayBlogPost(state.posts)}
      </div>
    </div>
  );
}

export default App;
