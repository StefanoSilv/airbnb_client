import React from 'react';
import '../styles/nav.css';
import { Link } from 'react-router-dom';

export default class Nav extends React.Component {
	render() {
		return (
			<nav>
				<Link to="/" className="logo"></Link>
				<div className="profile">
					<Link to="/plus" className="button">
						<span>Airbnb Plus</span>
					</Link>
				</div>
			</nav>
		);
	}
}
