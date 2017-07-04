import React, { Component } from 'react';
import { User, Adduser, Tabs } from './components/main/';
import { fetchUsers, removeUser, addNewUser } from './components/lib/helpers.js';

class App extends Component {
	constructor() {
		super();
		const users = fetchUsers();
		this.state = {
			users,
			newUser: ''
		};
	}

	handleInputChange = (e) => {
		const newUser = e.target.value;
		this.setState({newUser}); 
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const newUser = this.state.newUser;
		if (newUser) {
			const users = addNewUser(newUser, this.state.users);
			this.setState({users});
		}
	}

	handleRemove = (name) => {
		const users = removeUser(name, this.state.users);
		this.setState({users});
	}

  render() {
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
					{this.state.users.map(user => <User key={user} name={user} handleRemove={this.handleRemove} />)}
				</div>
      </div>
    );
  }
}

export default App;
