import React from 'react';

export const NotAvailable = (props) => {
	return (
		<div className="not-available">
			<p className="details">{props.name} is not an active user</p>
			<button className="remove" onClick={props.handleRemove.bind(null, props.name)}>
				<i className="fa fa-trash"></i>
			</button>
		</div>
	);
};