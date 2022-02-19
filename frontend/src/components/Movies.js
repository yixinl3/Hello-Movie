import React, { Component } from "react";
import Dashboard from "./Dashboard";
import { Icon, Button, Menu, Input, Dropdown, Label } from "semantic-ui-react";
import ListView from "./ListView";
import GridView from "./GridView";
import { genres, genresList } from "../resources/Genres";
import { sortByType } from "../resources/Util";
import { Movie_key } from "../resources/Env";

/**
 * View movies infomration, able to search by name, query by genres, sort by popularity and release date
 */
class Movies extends Component {
  constructor() {
    super();

    this.state = {
      Movies: [],
      isList: true,
      popAscend: true,
      dateAscend: true,
      genre: "",
      name: "",
      searchURL:
        "https://api.themoviedb.org/3/search/movie?api_key=" +
        Movie_key +
        "&language=en-US&query=",
      baseURL:
        "https://api.themoviedb.org/3/discover/movie?api_key=" + Movie_key,
      watching_list: [],
    };
    this.renderMovies = this.renderMovies.bind(this);
    this.clickGrid = this.clickGrid.bind(this);
    this.clickList = this.clickList.bind(this);
    this.sortPopAscend = this.sortPopAscend.bind(this);
    this.sortPopDescend = this.sortPopDescend.bind(this);
    this.sortDateAscend = this.sortDateAscend.bind(this);
    this.sortDateDescend = this.sortDateDescend.bind(this);
    this.sortDateDescend = this.sortDateDescend.bind(this);
    this.changeGenre = this.changeGenre.bind(this);
    this.changeName = this.changeName.bind(this);
    this.searchName = this.searchName.bind(this);
  }
  renderMovies() {
    // console.log(this.state.isList);
    // console.log(this.state.watching_list);
    if (this.state.isList) {
      return (
        <ListView
          Movies={this.state.Movies}
          user_id={this.props.location.state.id}
          is_watching_list={false}
          is_friend_view={false}
        />
      );
    } else {
      return (
        <GridView
          Movies={this.state.Movies}
          user_id={this.props.location.state.id}
          is_watching_list={false}
        />
      );
    }
  }
  clickGrid() {
    this.setState({
      isList: false,
    });
  }
  clickList() {
    this.setState({
      isList: true,
    });
  }
  sortPopAscend() {
    let tempMovies = sortByType(this.state.Movies, 1, true);
    this.setState({
      Movies: tempMovies,
      popAscend: true,
    });
  }
  sortPopDescend() {
    let tempMovies = sortByType(this.state.Movies, 1, false);
    this.setState({
      Movies: tempMovies,
      popAscend: false,
    });
  }
  sortDateAscend() {
    let tempMovies = sortByType(this.state.Movies, 2, true);
    this.setState({
      Movies: tempMovies,
      dateAscend: true,
    });
  }
  sortDateDescend() {
    let tempMovies = sortByType(this.state.Movies, 2, false);
    this.setState({
      Movies: tempMovies,
      dateAscend: false,
    });
  }
  changeGenre(e, { value }) {
    let url = this.state.baseURL;
    if (value !== "All") {
      url = url + "&with_genres=" + genres[value];
    }
    fetch(url, {
      method: "GET",
    }).then((response) => {
      response.json().then((result) => {
        console.log(result);
        if (response.ok) {
          this.setState({
            Movies: result["results"],
          });
        } else {
          alert("Get movies fail");
        }
      });
    });
    this.sortPopAscend();
    this.sortDateAscend();
  }
  changeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  searchName() {
    let url = this.state.searchURL + this.state.name.toLowerCase();
    fetch(url, {
      method: "GET",
    }).then((response) => {
      response.json().then((result) => {
        console.log(result);
        if (response.ok) {
          this.setState({
            Movies: result["results"],
          });
        } else {
          alert("Get movies fail");
        }
      });
    });
    this.setState({
      name: "",
    });
    this.sortPopAscend();
    this.sortDateAscend();
  }
  componentDidMount() {
    fetch(this.state.baseURL, {
      method: "GET",
    }).then((response) => {
      response.json().then((result) => {
        // console.log("movie result", result);
        if (response.ok) {
          this.setState({
            Movies: result["results"],
          });
        } else {
          alert("Get movies fail");
        }
      });
    });
  }

  render() {
    return (
      <div>
        <Dashboard id={this.props.location.state.id} />
        <Menu secondary>
          <Menu.Item>
            <Input
              placeholder="Search Movie Name..."
              onChange={this.changeName}
              value={this.state.name}
              icon={<Icon name="search" link onClick={this.searchName} />}
            />
          </Menu.Item>
          <Menu.Item>
            <Dropdown
              placeholder="Genres"
              openOnFocus
              selection
              options={genresList}
              onChange={this.changeGenre}
            />
          </Menu.Item>
          <Menu.Item>
            <Button.Group>
              <Button
                icon
                toggle
                active={this.state.isList}
                onClick={this.clickList}
              >
                <Icon name="list" />
              </Button>
              <Button.Or />
              <Button
                icon
                toggle
                active={!this.state.isList}
                onClick={this.clickGrid}
              >
                <Icon name="grid layout" />
              </Button>
            </Button.Group>
          </Menu.Item>
          <Menu.Item>
            <Button.Group>
              <Label>
                <p>Sort By Popularity</p>
              </Label>
              <Button
                icon
                toggle
                active={this.state.popAscend}
                onClick={this.sortPopAscend}
              >
                <Icon name="sort content ascending" />
              </Button>
              <Button.Or />
              <Button
                icon
                toggle
                active={!this.state.popAscend}
                onClick={this.sortPopDescend}
              >
                <Icon name="sort content descending" />
              </Button>
            </Button.Group>
          </Menu.Item>
          <Menu.Item>
            <Button.Group>
              <Label>
                <p>Sort By Release Date</p>
              </Label>
              <Button
                icon
                toggle
                active={this.state.dateAscend}
                onClick={this.sortDateAscend}
              >
                <Icon name="sort content ascending" />
              </Button>
              <Button.Or />
              <Button
                icon
                toggle
                active={!this.state.dateAscend}
                onClick={this.sortDateDescend}
              >
                <Icon name="sort content descending" />
              </Button>
            </Button.Group>
          </Menu.Item>
        </Menu>
        {this.renderMovies()}
      </div>
    );
  }
}

export default Movies;
