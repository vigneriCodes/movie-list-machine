import React from 'react';

import Movie from './Movie';

function MovieList({ movies, handleSelectMovie, selectedId }) {
	return (
		<ul className='list list-movies'>
			{movies?.map((movie) => (
				<Movie
					movie={movie}
					key={movie.imdbID}
					handleSelectedMovie={handleSelectMovie}
				/>
			))}
		</ul>
	);
}

export default MovieList;
