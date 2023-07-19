import React from 'react';

import Movie from './Movie';

function MovieList({ movies }) {
	return (
		<ul className='list list-movies'>
			{movies?.map((movie) => (
				<Movie movie={movie} key={movie.imdbID} />
			))}
		</ul>
	);
}

export default MovieList;
