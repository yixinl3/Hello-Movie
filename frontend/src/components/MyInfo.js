import React, { Component } from "react";
import { Button, Form, Header, Modal, Divider } from "semantic-ui-react";
import { getUser } from "../resources/Util";
import WatchingList from "./WatchingList";
import Dashboard from "./Dashboard";
/**
 * View MyInfo infomration. User can view, update user information or logout.
 */
class MyInfo extends Component {
  constructor() {
    super();

    this.state = {
      Email: "",
      Password1: "",
      Password2: "",
      Name: "",
      open: false,
      Watching_list: [],
      watching_list_movies: [],
      user_id: "",
      user: null,
    };

    this.Password1 = this.Password1.bind(this);

    this.Password2 = this.Password2.bind(this);

    this.Name = this.Name.bind(this);

    this.update = this.update.bind(this);

    this.toLogin = this.toLogin.bind(this);
  }

  Password1(event) {
    this.setState({ Password1: event.target.value });
  }

  Password2(event) {
    this.setState({ Password2: event.target.value });
  }

  Name(event) {
    this.setState({ Name: event.target.value });
  }
  update() {
    // console.log(this.state);
    if (this.state.Password1 !== this.state.Password2) {
      alert("Two passwords are different. Please enter again.");
    } else {
      fetch("api/auth/user/" + this.props.location.state.id, {
        method: "put",

        headers: {
          Accept: "application/json",

          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: this.state.Name,

          password: this.state.Password1,

          email: this.state.Email,
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
      this.setState({
        open: false,
      });
    }
  }

  toLogin(event) {
    this.props.history.push("/");
  }
  componentDidMount() {
    getUser(this.props.location.state.id).then((result) => {
      this.setState({
        Email: result["email"],
        Name: result["name"],
      });
    });
  }
  render() {
    return (
      <div>
        <Dashboard id={this.props.location.state.id} />
        <Header as="h2">My info</Header>
        <p>Name:{this.state.Name}</p>
        <p>Email:{this.state.Email}</p>
        <Modal
          size="tiny"
          onClose={() =>
            this.setState({
              open: false,
            })
          }
          onOpen={() =>
            this.setState({
              open: true,
            })
          }
          open={this.state.open}
          trigger={<Button color="blue">Update Info</Button>}
        >
          <Modal.Header>Update User Info</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>New Name</label>
                <input
                  type="text"
                  onChange={this.Name}
                  placeholder="Enter New Name"
                />
              </Form.Field>
              <Form.Field>
                <label>New Password</label>
                <input
                  type="password"
                  onChange={this.Password1}
                  placeholder="Enter New Password"
                />
              </Form.Field>
              <Form.Field>
                <label>Confirm New Password</label>
                <input
                  type="password"
                  onChange={this.Password2}
                  placeholder="Enter New Password again"
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="black"
              onClick={() =>
                this.setState({
                  open: false,
                })
              }
            >
              Cancel
            </Button>
            <Button
              content="Update"
              labelPosition="right"
              icon="checkmark"
              onClick={this.update}
              positive
            />
          </Modal.Actions>
        </Modal>
        <Button color="red" onClick={this.toLogin}>
          {" "}
          Log out
        </Button>
        <Divider />
        <Header as="h2">My watching list</Header>
        <WatchingList
          user_id={this.props.location.state.id}
          is_friend_view={false}
        />
      </div>
    );
  }
}

export default MyInfo;
