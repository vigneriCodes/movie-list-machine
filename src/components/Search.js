import React, { useEffect, useRef, useState } from 'react';

import { useKey } from './hooks/useKey';

function Search({ setQuery }) {
	const [searchInput, setSearchInput] = useState('');

	const inputElement = useRef(null);

	useKey('Enter', () => {
		if (document.activeElement === inputElement.current) return;
		inputElement.current.focus();
		setSearchInput('');
	});

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
			ref={inputElement}
		/>
	);
}

export default Search;
