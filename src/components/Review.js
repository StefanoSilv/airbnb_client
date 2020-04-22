import React, { Component } from 'react';

export default class Review extends Component {
	render() {
		return (
			<div className="card review">
				<div className="content">
					<div className="user">
						<div
							className="avatar"
							style={{
								backgroundImage: `url(${this.props.review.author.avatar})`
							}}
						></div>
						<div className="name">
							<span>{this.props.review.author.name}</span>
							<small>{this.props.review.author.location}</small>
						</div>
					</div>
					<div className="rating">
						{[...Array(this.props.review.rating)].map((e, index) => (
							<i key={index} className="fas fa-star"></i>
						))}
						{[...Array(5 - this.props.review.rating)].map((e, index) => (
							<i key={index} className="far fa-star"></i>
						))}{' '}
					</div>
					<p>{this.props.review.content}</p>
				</div>
			</div>
		);
	}
}
