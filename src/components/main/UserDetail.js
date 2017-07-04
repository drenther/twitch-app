import React from 'react';

export const UserDetail = (props) => {
	const indicator = props.stream ? 'indicator online' : 'indicator offline';
	return (
		<div className="user">
			<div className="left">
				<img src={props.logo} alt='logo'></img>
			</div>
			<div className="center">
				<p className="display-name">
					<a href={props.url} target="_blank">{props.displayName}</a>
				</p>
				<p className="name">	
					@{props.name}
				</p>
				<p className="status">
					{props.status}
				</p>
			</div>
			<div className="right">
				<button className="remove" onClick={props.handleRemove.bind(null, props.name)}>
					<i className="fa fa-trash"></i>
				</button>
				<div className={indicator}></div>
			</div>
		</div>
	);
};