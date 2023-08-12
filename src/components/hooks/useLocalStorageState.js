import { useState, useEffect } from 'react';

export function useLocalStorageState(initialState, key) {
	// setting state with a call back to access the value set in the useEffect --must be pure and accept no args
	const [value, setValue] = useState(() => {
		const storedValue = localStorage.getItem(key);
		return storedValue ? JSON.parse(storedValue) : initialState;
	});

	useEffect(() => {
		localStorage.setItem('watched', JSON.stringify(value));
	}, [value, key]);

	return [value, setValue];
}
