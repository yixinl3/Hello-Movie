import React, { Component } from "react";
import Dashboard from "./Dashboard";
import { Header, Item, Button, Divider, Input } from "semantic-ui-react";
import { getFriends, getUser } from "../resources/Util";
import WatchingListModal from "./WatchingListModal";
/**
 * View friends infomration
 */
class Friends extends Component {
  constructor() {
    super();

    this.state = {
      friends_id: [],
      friends_list: [],
      open: false,
      friend_email: "",
    };
    this.renderFriends = this.renderFriends.bind(this);
    this.friend_email = this.friend_email.bind(this);
    this.add_friend = this.add_friend.bind(this);
    this.delete_friend = this.delete_friend.bind(this);
  }
  add_friend() {
    // console.log(this.state.friend_email);
    fetch("api/friends", {
      method: "post",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        cur_id: this.props.location.state.id,

        friend_email: this.state.friend_email,
      }),
    }).then((response) => {
      response.json().then((result) => {
        // console.log(result);
        if (response.ok) {
          getFriends(this.props.location.state.id).then((json) => {
            // console.log(json);
            this.setState({
              friends_id: json,
              friend_email: "",
            });
            this.renderFriends();
          });
        } else {
          alert(result["message"]);
        }
      });
    });
  }
  delete_friend(delete_id) {
    // console.log(delete_id);
    fetch("api/friend/" + delete_id, {
      method: "DELETE",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        user_id: this.props.location.state.id,
      }),
    }).then((response) => {
      response.json().then((result) => {
        // console.log(result);
        if (response.ok) {
          getFriends(this.props.location.state.id).then((json) => {
            // console.log(json);
            this.setState({
              friends_id: json,
            });
            this.renderFriends();
          });
        } else {
          alert(result["message"]);
        }
      });
    });
  }
  friend_email(event) {
    this.setState({ friend_email: event.target.value });
    // console.log(this.state.friend_email);
  }
  renderFriends() {
    this.setState({
      friends_list: [],
    });
    this.state.friends_id.map((friend, key) => {
      getUser(friend.friend_id).then((result) => {
        this.setState({
          friends_list: this.state.friends_list.concat(
            <Item>
              <Item.Content>
                <Item.Header as="h3">Friend</Item.Header>
                <Item.Description>
                  <p>Name: {result.name}</p>
                  <p>Email: {result.email}</p>
                </Item.Description>
                <Item.Extra>
                  <Button
                    color="red"
                    floated="right"
                    onClick={() => this.delete_friend(friend._id.$oid)}
                  >
                    Delete Friend
                  </Button>
                  <WatchingListModal
                    user_id={result._id.$oid}
                    user_name={result.name}
                  />
                </Item.Extra>
                <Divider />
              </Item.Content>
            </Item>
          ),
        });
      });
    });
  }
  componentDidMount() {
    getFriends(this.props.location.state.id).then((json) => {
      // console.log(json);
      this.setState({
        friends_id: json,
      });
      this.renderFriends();
    });
  }
  render() {
    return (
      <div>
        <Dashboard id={this.props.location.state.id} />

        <Header as="h2">My friends</Header>
        <div>
          <Input
            onChange={this.friend_email}
            type="email"
            placeholder="Enter a user email... "
            value={this.state.friend_email}
          ></Input>
          <Button
            color="green"
            style={{ marginLeft: "15px" }}
            onClick={this.add_friend}
          >
            Add a new friend
          </Button>
        </div>
        {this.state.friends_list.length === 0 ? (
          <div>
            <br />
            You don't have any friends yet
          </div>
        ) : (
          <Item.Group>{this.state.friends_list}</Item.Group>
        )}
      </div>
    );
  }
}

export default Friends;
