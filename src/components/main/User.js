import React, { Component } from 'react';
import { UserDetail, NotAvailable } from '.';
import { fetchFromTwitch } from '../lib/helpers';

export class User extends Component {
	state = {
		loading: true
	}

	componentDidMount() {
		const name = this.props.name;
		fetchFromTwitch(name)
			.then(values => {
				const [ channel, stream ] = [...values];
				this.setState({
					loading: false,
					name,
					error: channel.error,
					displayName: channel.displayName,
					logo: channel.logo,
					url: channel.url,
					status: channel.status,
					stream: stream.stream
				});
			})
			.catch(err => console.error('error in fetch'));
	}

	render() {
		if (this.state.loading)
			return (
				<div className="animated-background">
				</div>
			);
		if (this.state.error)
			return (
				<NotAvailable name={this.props.name} handleRemove={this.props.handleRemove} />
			);
		return (
			<UserDetail {...this.state} handleRemove={this.props.handleRemove} />
		);		
	}
}