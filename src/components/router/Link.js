import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Link extends Component {
	static contextTypes = {
		route: PropTypes.string,
		linkHandler: PropTypes.func
	}

	handleClick = (e) => {
		e.preventDefault();
		this.context.linkHandler(this.props.to)
	}

	render() {
		const activeClass = this.context.route === this.props.to ? 'active tab' : 'tab';
		return (
			<a href={this.props.to} onClick={this.handleClick} className={activeClass}>{this.props.children}</a>
		);
	}
}