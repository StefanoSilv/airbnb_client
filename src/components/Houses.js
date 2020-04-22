import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import GoogleMap from 'google-map-react';
import '../styles/cards.css';
import '../styles/grid.css';
import Thumbnail from './Thumbnail.js';
import Pin from './Pin.js';
import Nav from './Nav.js';

class Houses extends React.Component {
	state = {
		houses: [],
		filteredHouses: [],
		types: [],
		filters: {
			search: '',
			price: '',
			type: 'all',
			sorting: ''
		},
		map: {
			key: {
				key: 'AIzaSyBKMVj4gaJLU9GTV1zOaWQj7ggKVbXQep0'
			},
			center: {
				lat: -8.652,
				lng: 115.137
			},
			zoom: 14
		}
	};
	componentDidMount() {
		axios
			.get(`${process.env.REACT_APP_API}/houses`)
			.then(res => {
				this.setState({
					houses: res.data,
					filteredHouses: res.data
				});
				let priceMax = this.state.houses.sort((a, b) => b.price - a.price)[0]
					? this.state.houses.sort((a, b) => b.price - a.price)[0].price
					: '';
				let filters = this.state.filters;
				filters.price = priceMax;
				this.setState({ filters });
			})
			.catch(err => {
				console.log({ err });
			});
		axios
			.get(`${process.env.REACT_APP_API}/types`)
			.then(res => {
				this.setState({
					types: res.data
				});
			})
			.catch(err => {
				console.log({ err });
			});
	}

	filters = (e, filter) => {
		let filters = this.state.filters;
		filters[filter] = e.target.value;
		this.setState({ filters });
		let filteredHouses = this.state.houses;
		if (this.state.filters.bedrooms) {
			filteredHouses = filteredHouses.filter(
				e => e.bedrooms >= this.state.filters.bedrooms
			);
		}
		if (this.state.filters.type != 'all') {
			filteredHouses = filteredHouses.filter(
				e => e.type.name == this.state.filters.type
			);
		}
		if (this.state.filters.price != '') {
			filteredHouses = filteredHouses.filter(
				x => Number(x.price) <= Number(this.state.filters.price)
			);
		}
		if (this.state.filters.search != '') {
			let searchedTerm = this.state.filters.search.toLowerCase();
			filteredHouses = filteredHouses.filter(
				e =>
					e.title.toLowerCase().includes(searchedTerm) ||
					e.city.toLowerCase().includes(searchedTerm) ||
					e.region.toLowerCase().includes(searchedTerm)
			);
		}
		if (this.state.filters.sorting == 'sortPrice') {
			filteredHouses = filteredHouses.sort((a, b) => a.price - b.price);
		}
		if (this.state.filters.sorting == 'sortRating') {
			filteredHouses = filteredHouses.sort((a, b) => b.rating - a.rating);
		}
		this.setState({ filteredHouses });
	};

	onHouseEffect = (id, over) => {
		let houses = this.state.houses;
		if (over) {
			houses.find(e => e._id === id).selected = true;
		} else {
			houses.map(e => {
				e.selected = false;
				return e;
			});
		}
		this.setState({ houses });
	};

	render() {
		return (
			<>
				<Nav></Nav>
				<div className="filters">
					<select onChange={event => this.filters(event, 'bedrooms')}>
						{[...Array(6)].map((e, i) => (
							<option key={i} value={i + 1}>
								Min Bedrooms: {i + 1}
							</option>
						))}
					</select>
					<select onChange={event => this.filters(event, 'type')}>
						<option value="all">All Types</option>
						{this.state.types.map((e, i) => (
							<option key={i} value={e.name}>
								{e.name}
							</option>
						))}
					</select>
					<label for="price">
						{this.state.filters.price.toString().padStart(3, '0')} $
					</label>
					<input
						type="range"
						min="0"
						max={
							this.state.houses.sort((a, b) => b.price - a.price)[0]
								? this.state.houses.sort((a, b) => b.price - a.price)[0].price
								: '0'
						}
						step="10"
						onChange={event => this.filters(event, 'price')}
						value={this.state.filters.price}
						id="price"
					/>
					<select onChange={event => this.filters(event, 'sorting')}>
						<option value="">Sort</option>
						<option value="sortPrice">Lowest Price</option>
						<option value="sortRating">Highest Rating</option>
					</select>
					<input
						type="text"
						className="search"
						placeholder="Search..."
						onChange={event => this.filters(event, 'search')}
						value={this.state.filters.search}
					/>
				</div>
				<div className="grid map">
					<div className="grid four large">
						{// List of thumbnails
						this.state.filteredHouses.map(house => (
							<Thumbnail
								key={house._id}
								house={house}
								onHouseEffect={this.onHouseEffect}
							></Thumbnail>
						))}
					</div>
					<div className="map">
						<GoogleMap
							bootstrapURLKeys={this.state.map.key}
							center={this.state.map.center}
							zoom={this.state.map.zoom}
						>
							{this.state.houses.map(house => (
								<Pin
									key={house._id}
									house={house}
									lat={house.lat}
									lng={house.lng}
								/>
							))}
						</GoogleMap>
					</div>
				</div>
			</>
		);
	}
}

export default Houses;
