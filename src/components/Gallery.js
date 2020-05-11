import React, { Component } from 'react';
import '../styles/gallery.css';

class Gallery extends Component {
	state = {
		images: [],
		mainImage: ''
	};
	componentWillReceiveProps(props) {
		if (props.images !== this.props.images) {
			if (typeof props.images !== 'undefined') {
				this.setState({ images: props.images, mainImage: props.images[0] });
			}
		}
	}
	selectImage = idx => {
		this.setState({ mainImage: this.state.images[idx] });
	};
	render() {
		return (
			<div className="gallery">
				<div
					className="image-main"
					style={{ backgroundImage: `url(${this.state.mainImage})` }}
				></div>
				<div className="previews">
					{this.state.images.map((image, i) => (
						<div
							className="preview"
							key={i}
							style={{ backgroundImage: `url(${image})` }}
							onClick={() => this.selectImage(i)}
						></div>
					))}
				</div>
			</div>
		);
	}
}

export default Gallery;
