import React from "react";
import { Image, Header } from "semantic-ui-react";
import MovieDetail from "./MovieDetail";
/**
 * Display movies in grid view
 */
export default function GridView({ Movies, user_id, is_watching_list }) {
  const [movies, setMovies] = React.useState(Movies);
  React.useEffect(() => {
    setMovies(Movies);
  }, [Movies]);
  const MoviesList = movies.map((movie, i) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "15px",
        alignItems: "center",
      }}
    >
      <Image
        alt="Movie Poster"
        size="medium"
        src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
        wrapped
      />
      <Header>{movie.title}</Header>
      <MovieDetail
        movie={movie}
        user_id={user_id}
        is_watching_list={is_watching_list}
        setMovies={setMovies}
      />
    </div>
  ));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {MoviesList}
    </div>
  );
}
