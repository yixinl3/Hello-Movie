import React from "react";
import { Button, Header, Image, Modal, Icon } from "semantic-ui-react";
import { genres } from "../resources/Genres";
import {
  getKeyByValue,
  inWatchingLists,
} from "../resources/Util";
import Reviews from "./Reviews";
/**
 * Use modal to display movie detail information
 */
export default function MovieDetail({
  movie,
  user_id,
  is_watching_list,
  setMovies,
  movies,
}) {
  const [open, setOpen] = React.useState(false);
  const [in_watching, setInWatching] = React.useState(false);
  const [watch_id, setWatchID] = React.useState("");
  React.useEffect(() => {
    console.log("inWatchingLists");
    inWatchingLists(user_id, movie.id).then((result) => {
      if (result !== null) {
        setInWatching(true);
        setWatchID(result._id.$oid);
      } else {
        setInWatching(false);
      }
    });
  }, [user_id]);
  function updateWatchingList() {
    if (in_watching) {
      fetch("api/watchingListItem/" + watch_id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",

          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          user_id: user_id,
        }),
      }).then((response) => {
        response.json().then((result) => {
          console.log(result);
          if (response.ok) {
          } else {
            alert(result["message"]);
          }
        });
      });
    } else {
      fetch("api/watchingLists", {
        method: "POST",
        headers: {
          Accept: "application/json",

          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          user_id: user_id,
          movie_id: movie.id,
        }),
      }).then((response) => {
        response.json().then((result) => {
          console.log(result);
          if (response.ok) {
          } else {
            alert(result["message"]);
          }
        });
      });
    }
    setInWatching(!in_watching);
  }
  function closeDetailModal() {
    if (is_watching_list && !in_watching) {
      let temp_movies = [];
      for (let i = 0; i < movies.length; i++) {
        if (movies[i]["id"] !== movie.id) {
          console.log(movies[i]["id"], movie.id);
          temp_movies.push(movies[i]);
        }
      }
      console.log(temp_movies);
      setMovies(temp_movies);
    }
    setInWatching(true);
    setOpen(false);
  }
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>View Detail</Button>}
    >
      <Modal.Header>Movie Detail</Modal.Header>
      <Modal.Content image scrolling>
        <Image
          alt="Movie Poster"
          src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
          wrapped
        />
        <Modal.Description>
          <Header>{movie.title}</Header>

          {is_watching_list ? (
            <div style={{ display: "flex", flexDirection: "row" }}>
              Genre:
              {movie.genres.map((genre) => {
                return <p style={{ marginLeft: "10px" }}>{genre["name"]} </p>;
              })}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "row" }}>
              Genre:
              {movie.genre_ids.map((gid) => {
                return (
                  <p style={{ marginLeft: "10px" }}>
                    {getKeyByValue(genres, gid)}{" "}
                  </p>
                );
              })}
            </div>
          )}

          <p>popularity: {movie.popularity}</p>
          <p>vote_average: {movie.vote_average}</p>
          <p>vote_count: {movie.vote_count}</p>
          <p>release_date: {movie.release_date}</p>
          <p>original_language: {movie.original_language}</p>
          <p>overview: {movie.overview}</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Content scrolling>
        <Reviews user_id={user_id} movie_id={movie.id} />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => updateWatchingList()}>
          <Icon name="star" color={in_watching ? "yellow" : "gray"} />
          {!in_watching
            ? "Add to my watching list"
            : "Remove from my watching list"}
        </Button>

        <Button
          color="black"
          onClick={
            is_watching_list && !in_watching
              ? () => closeDetailModal()
              : () => setOpen(false)
          }
        >
          close
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
