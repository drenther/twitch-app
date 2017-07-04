import React, { Component } from 'react';
import { UserDetail, NotAvailable } from '.';
import { fetchChannelData } from '../lib/helpers';

export class User extends Component {
	state = {
		loading: true
	}

	componentDidMount() {
		const name = this.props.name;
		fetchChannelData(name)
			.then(channel => {
				this.setState({
					loading: false,
					name,
					error: channel.error,
					displayName: channel.displayName,
					logo: channel.logo,
					url: channel.url,
					status: channel.status,
					stream: this.props.stream
				});
			})
			.catch(err => console.error('error in fetch'));
	}

	componentWillReceiveProps(nextProps) {
		this.setState({stream: nextProps.stream});	
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