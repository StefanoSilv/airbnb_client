import React from 'react';
import { Link } from 'react-router-dom';

class Thumbnail extends React.Component {
	render() {
		return (
			<Link
				className="card link"
				to={`/houses/${this.props.house._id}`}
				key={this.props.house._id}
				onMouseOver={id => this.props.onHouseEffect(this.props.house._id, true)}
				onMouseLeave={() => this.props.onHouseEffect()}
			>
				<div
					className="image"
					style={{ backgroundImage: `url(${this.props.house.image})` }}
				></div>
				<div className="content">
					<small className="meta">
						{this.props.house.type.name} • {this.props.house.bedrooms} Bedrooms
					</small>
					<h2>{this.props.house.title}</h2>
					<small className="location">
						<i className="fas fa-map-marker-alt"></i>
						<span>
							{this.props.house.city}, {this.props.house.region}
						</span>
					</small>
					<span className="price">${this.props.house.price}/night</span>
					<span className="rating">
						{[...Array(this.props.house.rating)].map((e, i) => (
							<i key={i} className="fas fa-star"></i>
						))}
						{[...Array(5 - this.props.house.rating)].map((e, i) => (
							<i key={i} className="far fa-star"></i>
						))}
					</span>
				</div>
			</Link>
		);
	}
}

export default Thumbnail;
