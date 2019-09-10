import React, {Component} from 'react';
import socketIO from 'socket.io-client';

const resToJSON = res => res.json();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      content: '',
      messages: []
    }
  }

  componentWillMount() {
    const io = socketIO('ws://localhost:5000');
    io.on('postMessage', message => this.setState({messages: [...this.state.messages, message]}));
    this.loadMessages();
  }

  onSubmit = (event) => {
    event.preventDefault();
    const {author, content} = this.state;
    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
    });

    fetch('http://localhost:5000/message', {
      headers,
      method: 'POST',
      body: JSON.stringify({author, content}),
    })
      .then(console.log)
      .catch(console.log);
  }

  handlerInput = (event) => {
    const {target} = event
    console.log({ [target.name]: target.value });

    this.setState({ [target.name]: target.value })
  }

  loadMessages = () => {
    fetch('http://localhost:5000/message')
      .then(resToJSON)
      .then(messages => this.setState({messages}))
      .catch(err => console.log(err));
  }

  render() {
    const {onSubmit, handlerInput, state} = this;
    const {messages, content} = state
    return (
      <>
        <form>
          <input type="text" name="author" onChange={handlerInput} />
        </form>
        <ul>
          {messages.map(({content}) => <li>{content}</li>)}
        </ul>
        <form onSubmit={onSubmit}>
          <textarea name="content" value={content} onChange={handlerInput}></textarea>
          <button type="submit">send</button>
        </form>
      </>
    );
  }  
}

export default App;
