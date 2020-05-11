import React from 'react';

class Pin extends React.Component {
	state = {
		house: this.props.house,
		lat: this.props.lat,
		lng: this.props.lng
	};
	componentDidMount() {
		this.setState({
			house: this.props.house,
			lat: this.props.lat,
			lng: this.props.lng
		});
	}
	componentDidUpdate(props) {
		if (
			props.house !== this.props.house &&
			props.lat !== this.props.lat &&
			props.lng !== this.props.lng
		)
			this.setState({
				house: this.props.house,
				lat: this.props.lat,
				lng: this.props.lng
			});
	}
	render() {
		return (
			<div
				className={this.state.house.selected ? 'pin selected' : 'pin'}
				lat={this.state.lat}
				lng={this.state.lng}
			>
				<label>${this.state.house.price}</label>
			</div>
		);
	}
}

export default Pin;
