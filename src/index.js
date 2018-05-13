import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class CardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.value);
    this.setState({
      value: ''
    });
  }

  render() {
    return (
      <form className="card" onSubmit={this.handleSubmit}>
        <label>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
      </form>
    );
  }
}

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: this.props.value};
  }

  render() {
    return (
      <div className="card">
        {this.state.value}
      </div>
    );
  }
}

class ListForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.value);
    this.setState({
      value: ''
    });
  }

  render() {
    return (
      <form className="list" onSubmit={this.handleSubmit}>
        <label>
          <h1>Add a List</h1>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
      </form>
    );
  }
}

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      cards: [],
    };
  }

  handleClick = (value) => {
    const cards = this.state.cards;
    this.setState({
      cards: cards.concat([{
        value
      }]),
    });
  }

  createList() {
    const cards = this.state.cards;

    let board = [];
    board.push(<h1 key={0}>{this.state.title}</h1>)
    board.push(<CardForm
      key={1}
      onSubmit={this.handleClick}
    />);
    for (let i = 0; i < cards.length; i++) {
      board.push(<Card key={i+2} value={cards[i].value}/>)
    }
    return board;
  }

  render() {
    return (
      <div className="list">
        {this.createList()}
      </div>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
    };
  }

  newList = (title) => {
    const lists = this.state.lists;
    this.setState({
      lists: lists.concat([
        <List
          title={title}
        />
      ])
    });
  }

  makeBoard() {
    let board = [];
    const lists = this.state.lists;
    for (let i = 0; i < lists.length; i++) {
      board.push(<List key={i} title={lists[i].props.title}/>);
    }
    board.push(<ListForm
      key={lists.length}
      onSubmit={this.newList}
    />);
    return (board);
  }

  render() {
    return (
      <div>
        <h1>Hello, World!</h1>
        {this.makeBoard()}
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Board />,
  document.getElementById('root')
);
