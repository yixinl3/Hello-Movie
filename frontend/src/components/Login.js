import React, { Component } from "react";

import { Button, Form, Header } from "semantic-ui-react";
/**
 * Login page for user authentication. If does not have an account. User can navigate to signup page
 */
class Login extends Component {
  constructor() {
    super();

    this.state = {
      Email: "",

      Password: "",
    };

    this.Password = this.Password.bind(this);

    this.Email = this.Email.bind(this);

    this.toSignup = this.toSignup.bind(this);

    this.login = this.login.bind(this);
  }

  Email(event) {
    this.setState({ Email: event.target.value });
  }

  Password(event) {
    this.setState({ Password: event.target.value });
  }

  toSignup() {
    this.props.history.push("/Signup");
  }

  login() {
    fetch("api/auth/login", {
      method: "POST",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: this.state.Email,

        password: this.state.Password,
      }),
    }).then((response) => {
      response.json().then((result) => {
        console.log(result);
        if (response.ok) {
          this.props.history.push({
            pathname: "/Movies",
            state: { id: result["id"] },
          });
        } else {
          alert(result["message"]);
        }
      });
    });
  }

  render() {
    return (
      <div>
        <Header as="h2">Please Login</Header>
        <Form>
          <Form.Field>
            <label>Email</label>
            <input
              type="email"
              onChange={this.Email}
              placeholder="Enter Email"
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              type="password"
              onChange={this.Password}
              placeholder="Enter Password"
            />
          </Form.Field>

          <Button primary onClick={this.login}>
            Login
          </Button>
        </Form>
        <br />
        <Button secondary onClick={this.toSignup}>
          Don't have an account yet? Please Signup!
        </Button>
      </div>
    );
  }
}

export default Login;
