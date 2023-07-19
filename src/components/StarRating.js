import React, { useState } from 'react';

import Star from './Star';

const containerStyle = {
	display: 'flex',
	alignItems: 'center',
	gap: '16px',
};

const starContainerStyle = {
	display: 'flex',
};

const textStyle = {
	lineHeight: '1',
	margin: '0',
};

function StarRating({ maxRating = 10 }) {
	const [rating, setRating] = useState(0);
	const [tempRating, setTempRating] = useState(0);

	function handleRating(rating) {
		setRating(rating);
	}

	function handleHoverIn(rating) {
		setTempRating(rating);
	}

	function handleHoverOut() {
		setTempRating(0);
	}

	return (
		<div style={containerStyle}>
			<div style={starContainerStyle}>
				{Array.from({ length: maxRating }, (_, i) => (
					<Star
						key={i}
						onRate={() => handleRating(i + 1)}
						full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
						onHoverIn={() => handleHoverIn(i + 1)}
						onHoverOut={handleHoverOut}
					/>
				))}
			</div>
			<p style={textStyle}>{tempRating || rating || ''}</p>
		</div>
	);
}

export default StarRating;
