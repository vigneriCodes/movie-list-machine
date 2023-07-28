import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Star from './Star';

const containerStyle = {
	display: 'flex',
	alignItems: 'center',
	gap: '16px',
};

const starContainerStyle = {
	display: 'flex',
};

function StarRating({
	maxRating = 5,
	color = '#fcc419',
	size = 48,
	className = '',
	messages = [],
	defaultRating = 0,
	onSetRating,
}) {
	const [rating, setRating] = useState(defaultRating);
	const [tempRating, setTempRating] = useState(0);

	const textStyle = {
		lineHeight: '1',
		margin: '0',
		color,
		fontSize: `${size / 1.5}px`,
	};

	function handleRating(rating) {
		setRating(rating);
		onSetRating && onSetRating(rating);
	}

	function handleHoverIn(rating) {
		setTempRating(rating);
	}

	function handleHoverOut() {
		setTempRating(0);
	}

	return (
		<div style={containerStyle} className={className}>
			<div style={starContainerStyle}>
				{Array.from({ length: maxRating }, (_, i) => (
					<Star
						key={i}
						onRate={() => handleRating(i + 1)}
						full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
						onHoverIn={() => handleHoverIn(i + 1)}
						onHoverOut={handleHoverOut}
						color={color}
						size={size}
					/>
				))}
			</div>
			<p style={textStyle}>
				{messages.length === maxRating
					? messages[tempRating ? tempRating - 1 : rating - 1]
					: tempRating || rating || ''}
			</p>
		</div>
	);
}

export default StarRating;

StarRating.propTypes = {
	maxRating: PropTypes.number,
	color: PropTypes.string,
	size: PropTypes.number,
	className: PropTypes.string,
	messages: PropTypes.array,
	defaultRating: PropTypes.number,
	onSetRating: PropTypes.func,
};
