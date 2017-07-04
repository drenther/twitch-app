import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { User, Adduser, Tabs } from './components/main/';
import { fetchUsers, removeUser, addNewUser, fetchStreamData, filterUsers } from './components/lib/helpers.js';

class App extends Component {
	constructor() {
		super();
		const users = fetchUsers();
		const usersStream = {};
		users.forEach( user => usersStream[user] = {stream: null});
		this.state = {
			users,
			usersStream,
			newUser: ''
		};
	}

	static contextTypes = {
		route: PropTypes.string
	}

	componentDidMount() {
		const streams = Promise.all(this.state.users.map(user => fetchStreamData(user)));
		streams.then((...users) => {
			const usersStream = {};
			users[0].forEach( user => usersStream[user[0]] = {stream: user[1]});
			this.setState({usersStream});
		});
	}	

	handleInputChange = (e) => {
		const newUser = e.target.value;
		this.setState({newUser});
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const newUser = this.state.newUser;
		if (newUser && !this.state.users.includes(newUser)) {
			const users = addNewUser(newUser, this.state.users);
			const temp = {};
			temp[newUser] = {stream: null};
			const usersStreams = Object.assign(this.state.usersStream, temp);
			this.setState({users, usersStreams});
			const streams = Promise.all(users.map(user => fetchStreamData(user)));
			streams.then((...users) => {
				const usersStream = {};
				users[0].forEach( user => usersStream[user[0]] = {stream: user[1]});
				this.setState({usersStream});
			});
		}
	}

	handleRemove = (name) => {
		const users = removeUser(name, this.state.users);
		const temp = {};
		temp[name] = {stream: null}
		const usersStreams = Object.assign(this.state.usersStream, temp);
		this.setState({users, usersStreams});
		const streams = Promise.all(users.map(user => fetchStreamData(user)));
		streams.then((...users) => {
			const usersStream = {};
			users[0].forEach( user => usersStream[user[0]] = {stream: user[1]});
			this.setState({usersStream});
		});
	}

  render() {
		const users = filterUsers(this.state.usersStream, this.context.route);
    return (
      <div className="app">
				<div className="logo">
					<i className="fa fa-twitch"></i>
				</div>
				<div className="header">
					<Adduser handleInputChange={this.handleInputChange} handleSubmit={this.handleSubmit} />
					<Tabs/>
				</div>
				<div className="main">
					{users.map(user => <User key={user} stream={this.state.usersStream[user].stream} name={user} handleRemove={this.handleRemove} />)}
				</div>
      </div>
    );
  }
}

export default App;