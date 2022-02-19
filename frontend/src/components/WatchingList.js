import React, { Component } from "react";
import { getMovie, getWatchingLists } from "../resources/Util";
import ListView from "./ListView";

/**
 * The classi for generating lists of movies in watching list
 */
class WatchingList extends Component {
  constructor() {
    super();
    this.state = {
      Watching_list: [],
      watching_list_movies: [],
    };
    this.rederWatchingList = this.rederWatchingList.bind(this);
  }
  rederWatchingList() {
    // console.log("render watching list");

    this.state.Watching_list.map((list_item, i) => {
      // console.log(list_item["movie_id"]);
      let movie_id = list_item["movie_id"];
      getMovie(movie_id.toString()).then((result) => {
        this.setState({
          watching_list_movies: this.state.watching_list_movies.concat(result),
        });
      });
    });
  }
  componentDidMount() {
    getWatchingLists(this.props.user_id).then((result) => {
      this.setState({
        Watching_list: result,
      });
      this.rederWatchingList();
      // console.log(this.state.watching_list_movies);
    });
  }
  render() {
    return (
      <div>
        {this.state.watching_list_movies.length === 0 ? (
          "No movies in watching list"
        ) : (
          <ListView
            Movies={this.state.watching_list_movies}
            user_id={this.props.user_id}
            is_watching_list={true}
            is_friend_view={this.props.is_friend_view}
          />
        )}
      </div>
    );
  }
}

export default WatchingList;
