import React, { useState, useEffect } from 'react';

import NavBar from './NavBar';
import Main from './Main';
import Search from './Search';
import NumResults from './NumResults';
import Box from './Box';
import MovieList from './MovieList';
import WatchedMovieList from './WatchedMovieList';
import WatchedSummary from './WatchedSummary';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import MovieDetails from './MovieDetails';

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

export default function App() {
	const [movies, setMovies] = useState([]);
	const [watched, setWatched] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [query, setQuery] = useState('summer');
	const [selectedId, setSelectedId] = useState(null);

	useEffect(() => {
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
			} catch (err) {
				console.error(err.message);
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		}

		if (query.length < 3) {
			setMovies([]);
			setError('');
			return;
		}
		fetchMovies();
	}, [query]);

	function handleSelectMovie(id) {
		setSelectedId((selectedId) => (id === selectedId ? null : id));
	}

	function handleCloseMovie() {
		setSelectedId(null);
	}

	function handleAddWatched(movie) {
		setWatched((watched) => [...watched, movie]);
	}

	function handleDeleteWatched(id) {
		setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
	}
	console.log('App render/rerender');

	return (
		<>
			<NavBar>
				<Search query={query} setQuery={setQuery} />
				<NumResults movies={movies} />
			</NavBar>

			<Main>
				<Box>
					{isLoading && <Loader />}
					{!isLoading && !error && (
						<MovieList
							movies={movies}
							handleSelectMovie={handleSelectMovie}
							selectedId={selectedId}
						/>
					)}
					{error && <ErrorMessage message={error} />}
				</Box>

				<Box>
					{selectedId ? (
						<MovieDetails
							selectedId={selectedId}
							handleCloseMovie={handleCloseMovie}
							handleAddWatched={handleAddWatched}
							watched={watched}
						/>
					) : (
						<>
							<WatchedSummary watched={watched} />
							<WatchedMovieList
								watched={watched}
								handleDeleteWatched={handleDeleteWatched}
							/>
						</>
					)}
				</Box>
			</Main>
		</>
	);
}
