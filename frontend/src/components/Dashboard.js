import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
/**
 * Use Dashboard as a menu for user to navigate between movies, friends and myinfo screens.
 */
class Dashboard extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  render() {
    const { activeItem } = this.state;
    return (
      <div>
        <Menu>
          <Menu.Item
            name="movies"
            active={activeItem === "movies"}
            onClick={this.handleItemClick}
          >
            <Link
              to={{
                pathname: "/Movies",
                state: { id: this.props.id },
              }}
            >
              Movies
            </Link>
          </Menu.Item>
          <Menu.Item
            name="friends"
            active={activeItem === "friends"}
            onClick={this.handleItemClick}
          >
            <Link
              to={{
                pathname: "/Friends",
                state: { id: this.props.id },
              }}
            >
              Friends
            </Link>
          </Menu.Item>
          <Menu.Item
            name="MyInfo"
            active={activeItem === "MyInfo"}
            onClick={this.handleItemClick}
          >
            <Link
              to={{
                pathname: "/MyInfo",
                state: { id: this.props.id },
              }}
            >
              MyInfo
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default Dashboard;
