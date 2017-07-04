import React from 'react';

export const Adduser = (props) => {
	return (
		<form className='adduser' onSubmit={props.handleSubmit}>
			<span onClick={props.handleSubmit}><i className="fa fa-plus" aria-hidden="true"></i> Add user </span>
			<input type='text' onChange={props.handleInputChange}></input>
		</form>
	);
};