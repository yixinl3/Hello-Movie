import React from "react";
import { Item } from "semantic-ui-react";
import MovieDetail from "./MovieDetail";
/**
 * Display movies in list view
 */
export default function ListView({
  Movies,
  user_id,
  is_watching_list,
  is_friend_view,
}) {
  const [movies, setMovies] = React.useState(Movies);
  React.useEffect(() => {
    setMovies(Movies);
  }, [Movies]);
  const MoviesList = movies.map((movie, i) => (
    <Item>
      <Item.Image
        alt="Movie Poster"
        src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
        wrapped
      />

      <Item.Content>
        <Item.Header as="a">{movie.title}</Item.Header>
        <Item.Meta>
          <p>popularity: {movie.popularity}</p>
          <p>vote_average: {movie.vote_average}</p>
          <p>vote_count: {movie.vote_count}</p>
          <p className="date">Release Date: {movie.release_date}</p>
        </Item.Meta>
        <Item.Description>
          Overview:
          <br />
          {movie.overview}
        </Item.Description>
        <Item.Extra>
          {is_friend_view ? (
            <div></div>
          ) : (
            <MovieDetail
              movie={movie}
              user_id={user_id}
              is_watching_list={is_watching_list}
              setMovies={setMovies}
              movies={movies}
            />
          )}
        </Item.Extra>
      </Item.Content>
    </Item>
  ));
  return <Item.Group>{MoviesList}</Item.Group>;
}
