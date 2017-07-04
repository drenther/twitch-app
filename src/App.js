import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { User, Adduser, Tabs } from './components/main/';
import { fetchUsers, fetchFromTwitch, removeUser, addNewUser, filterUsers } from './components/lib/helpers.js';

class App extends Component {
	constructor() {
		super();
		const users = fetchUsers();
		const data = {};
		users.forEach( user => data[user] = {loading: true});

		this.state = {
			users,
			data,
			newUser: ''
		};
		
		this.fetchData();
	}


	static contextTypes = {
		route: PropTypes.string
	}
	
	fetchData = () => {
		const users = this.state.users;
		const data = {};
		Promise.all(users.map(name => {
			return (fetchFromTwitch(name)
				.then(values => {
					const [ channel, stream ] = [...values];
					data[name] = {
						loading: false,
						name,
						error: channel.error,
						displayName: channel.displayName,
						logo: channel.logo,
						url: channel.url,
						status: channel.status,
						stream: stream.stream
					};
				})
			);
		}))
			.then(res => {
				this.setState({data});
			})
			.catch(err => "error while requesting data from twitch server");
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
		this.fetchData();
	}

	handleRemove = (name) => {
		const users = removeUser(name, this.state.users);
		this.setState({users});
		this.fetchData();
	}

  render() {
		const users = filterUsers(this.state.data, this.context.route);
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
					{users.map(user => {
						const userData = this.state.data[user];
						return <User key={user} {...userData} handleRemove={this.handleRemove}/>
					})}
				</div>
      </div>
    );
  }
}

export default App;
