import { useState, useEffect } from 'react';

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

export function useMovies(query) {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		// callBack?.();
		async function fetchMovies() {
			try {
				setIsLoading(true);
				setError('');
				const res = await fetch(
					`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
				);

				if (!res.ok)
					throw new Error('Something went wrong with fetching movies');

				const data = await res.json();

				if (data.Response === 'False') throw new Error('Movie not found');

				setMovies(data.Search);
				setIsLoading(false);
				setError('');
			} catch (err) {
				console.error(err.message);
				if (err.name !== 'AbortError') {
					setError(err.message);
				}
			} finally {
				setIsLoading(false);
			}
		}

		if (query.length < 3) {
			setMovies([]);
			setError('');
			return;
		}
		// handleCloseMovie();
		fetchMovies();
	}, [query]);

	return { movies, isLoading, error };
}
