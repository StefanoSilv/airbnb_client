import React from 'react';
import axios from 'axios';
import Thumbnail from './Thumbnail.js';
import Nav from './Nav.js';

class Favorites extends React.Component {
	state = {
		houses: []
	};
	componentDidMount() {
		axios
			.get(`${process.env.REACT_APP_API}/houses?plus=true`)
			.then(res => {
				this.setState({ houses: res.data });
			})
			.catch(err => {
				console.log(err);
			});
	}
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
				<div className="narrow">
					<div className="grid four large">
						{// List of thumbnails
						this.state.houses.map((house, idx) => (
							<Thumbnail
								key={house._id}
								house={house}
								onHouseEffect={this.onHouseEffect}
							></Thumbnail>
						))}
					</div>
				</div>
			</>
		);
	}
}

export default Favorites;
