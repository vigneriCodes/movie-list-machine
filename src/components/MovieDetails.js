import React, { useEffect, useState } from 'react';

import StarRating from './StarRating';
import Loader from './Loader';

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

function MovieDetails({
	selectedId,
	handleCloseMovie,
	handleAddWatched,
	watched,
}) {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [userRating, setUserRating] = useState('');

	const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
	const watchedUserRating = watched.find(
		(movie) => movie.imdbID === selectedId
	)?.userRating;

	const {
		Title: title,
		Poster: poster,
		Runtime: runtime,
		Plot: plot,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre,
		imdbRating,
	} = movie;

	useEffect(() => {
		async function getMovieDetails() {
			setIsLoading(true);
			const res = await fetch(
				`http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
			);
			const data = await res.json();
			setMovie(data);
			setIsLoading(false);
		}
		getMovieDetails();
	}, [selectedId]);

	function handleAdd() {
		const newWatchedMovie = {
			imdbID: selectedId,
			title,
			poster,
			imdbRating: Number(imdbRating),
			runtime: Number(runtime.split(' ').at(0)),
			userRating,
		};

		handleAddWatched(newWatchedMovie);
		handleCloseMovie();
	}

	return (
		<div className='details'>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<header>
						<button className='btn-back' onClick={handleCloseMovie}>
							&larr;
						</button>
						<img src={poster} alt={`Poster of ${movie}`} />
						<div className='details-overview'>
							<h2>{title}</h2>
							<p>
								{released} &bull; {runtime}
							</p>
							<p>{genre}</p>
							<p>
								<span>⭐</span>
								{imdbRating} IMDb rating
							</p>
						</div>
					</header>
					<section>
						<div className='rating'>
							{!isWatched ? (
								<>
									<StarRating
										maxRating={10}
										size={24}
										onSetRating={setUserRating}
									/>

									{userRating > 0 && (
										<button className='btn-add' onClick={handleAdd}>
											+ Add to list
										</button>
									)}
								</>
							) : (
								<p>You rated this movie: 🌟{watchedUserRating}</p>
							)}
						</div>
						<p>
							<em>{plot}</em>
						</p>
						<p>Starring {actors}</p>
						<p>Directed by {director}</p>
					</section>
				</>
			)}
		</div>
	);
}

export default MovieDetails;
