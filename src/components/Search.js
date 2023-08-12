import React, { useEffect, useRef, useState } from 'react';

function Search({ setQuery }) {
	const [searchInput, setSearchInput] = useState('');
	const inputElement = useRef(null);

	useEffect(() => {
		const callBack = (e) => {
			if (document.activeElement === inputElement.current) return;
			if (e.code === 'Enter') {
				inputElement.current.focus();
				setSearchInput('');
			}
		};
		document.addEventListener('keydown', callBack);
		return () => document.addEventListener('keydown', callBack);
	}, [setSearchInput]);

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
