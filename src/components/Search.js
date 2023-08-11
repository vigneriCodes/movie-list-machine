import React, { useEffect, useState } from 'react';

function Search({ setQuery }) {
	const [searchInput, setSearchInput] = useState('');

	useEffect(() => {
		const timeOutID = setTimeout(() => setQuery(searchInput), 500);
		return function () {
			clearTimeout(timeOutID);
		};
	}, [searchInput, setQuery]);

	return (
		<input
			className='search'
			type='text'
			placeholder='Search movies...'
			value={searchInput}
			onChange={(e) => setSearchInput(e.target.value)}
		/>
	);
}

export default Search;
