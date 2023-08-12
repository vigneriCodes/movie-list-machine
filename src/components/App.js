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
import { useMovies } from './hooks/useMovies';
import { useLocalStorageState } from './hooks/useLocalStorageState';

export default function App() {
	const [query, setQuery] = useState('');
	const [selectedId, setSelectedId] = useState(null);
	const [watched, setWatched] = useLocalStorageState([], 'watched');

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

	const { movies, isLoading, error } = useMovies(query);

	return (
		<>
			<NavBar>
				<Search setQuery={setQuery} />
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
