import React, { Component } from "react";
import { Button, Form, Header } from "semantic-ui-react";
/**
 * Signup page for user authentication. If already have an account. User can navigate to login page
 */
class Signup extends Component {
  constructor() {
    super();

    this.state = {
      Name: "",

      Email: "",

      Password1: "",

      Password2: ""
    };

    this.Email = this.Email.bind(this);

    this.Password1 = this.Password1.bind(this);

    this.Password2 = this.Password2.bind(this);

    this.Name = this.Name.bind(this);

    this.toLogin = this.toLogin.bind(this);

    this.register = this.register.bind(this);
  }

  Email(event) {
    this.setState({ Email: event.target.value });
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
  toLogin() {
    this.props.history.push("/");
  }
  register() {
    if (this.state.Password1 !== this.state.Password2) {
      alert("Two passwords are different. Please enter again.");
    } else {
      fetch("api/auth/signup", {
        method: "post",
  
        headers: {
          Accept: "application/json",
  
          "Content-Type": "application/json",
        },
  
        body: JSON.stringify({
          name: this.state.Name,
  
          password: this.state.Password1,
  
          email: this.state.Email,
        }),
      })
      .then((response) => {
        response.json().then((result) => {
          console.log(result);
          if (response.ok) {
            this.props.history.push({
              pathname: "/Movies",
              state: { id: result['id'] },
            });
          } else {
            alert(result["message"]);
          }
        });
      });
    }
    
  }

  render() {
    return (
      <div>
        
        <Header as="h2">Please Signup</Header>
        <Form>
          <Form.Field>
              <label>Name</label>
              <input
                type="text"
                onChange={this.Name}
                placeholder="Enter Name"
              />
            </Form.Field>
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
                  onChange={this.Password1}
                  placeholder="Enter Password"
                />
              </Form.Field>
              <Form.Field>
                <label>Confirm Password</label>
                <input
                  type="password"
                  onChange={this.Password2}
                  placeholder="Enter Password again"
                />
              </Form.Field>

          <Button  primary  onClick={this.register}>Create an account</Button>
        </Form>
        <br/>
        <Button secondary onClick={this.toLogin}>Already have an account? Please Login!</Button>
      </div>
    );
  }
}
export default Signup;
