import React from 'react';
import { Link } from '../router';

export const Tabs = () => {
	return (
		<div className='tabs'>
			<Link to='/'>All</Link>
			<Link to='/online'>Online</Link>
			<Link to='/offline'>Offline</Link>
		</div>
	);
};