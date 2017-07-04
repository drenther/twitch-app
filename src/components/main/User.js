import React, { Component } from 'react';
import { UserDetail, NotAvailable } from '.';

export class User extends Component {

	render() {
		if (this.props.loading)
			return (
				<div className="animated-background">
				</div>
			);
		if (this.props.error)
			return (
				<NotAvailable name={this.props.name} handleRemove={this.props.handleRemove} />
			);
		return (
			<UserDetail 
				name={this.props.name}
				displayName={this.props.displayName}
				stream={this.props.stream}
				status={this.props.status}
				url={this.props.url}
				logo={this.props.logo}
				handleRemove={this.props.handleRemove}
			/>
		);		
	}
}