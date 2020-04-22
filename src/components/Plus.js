import React from 'react';
import axios from 'axios';
import Thumbnail from './Thumbnail.js';
import Nav from './Nav.js';

class Favorites extends React.Component {
	state = {
		houses: []
	};
	componentWillMount() {
		axios
			.get(`${process.env.REACT_APP_API}/houses?plus=true`)
			.then(res => {
				this.setState({ houses: res.data });
			})
			.catch(err => {
				console.log(err);
			});
	}
	render() {
		return (
			<>
				<Nav></Nav>
				<div className="narrow">
					<div className="grid four large">
						{// List of thumbnails
						this.state.houses.map((house, idx) => (
							<Thumbnail
								house={house}
								key={idx}
								onHouseOver={() => {}}
								onHouseLeave={() => {}}
							></Thumbnail>
						))}
					</div>
				</div>
			</>
		);
	}
}

export default Favorites;
