import React, { Component } from "react";
import Dashboard from "./Dashboard";
import { Icon, Button, Header, Modal, Form, Divider } from "semantic-ui-react";
import { getReviews, getUser } from "../resources/Util";
import ReviewsList from "./ReviewsList";

/**
 * The review section, contain add review button, and view all of review of current movie
 */
class Reviews extends Component {
  constructor() {
    super();
    this.state = {
      Reviews: [],
      reviewsList: null,
      like: true,
      content: "",
      name: "",
    };
    this.clickLike = this.clickLike.bind(this);
    this.clickDislike = this.clickDislike.bind(this);
    this.addReview = this.addReview.bind(this);
    this.content = this.content.bind(this);
  }
  content(event) {
    this.setState({ content: event.target.value });
  }
  clickLike() {
    this.setState({
      like: true,
    });
  }
  clickDislike() {
    this.setState({
      like: false,
    });
  }
  addReview() {
    fetch("api/reviews", {
      method: "post",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        movie_id: this.props.movie_id,

        like: this.state.like,

        content: this.state.content,

        user_id: this.props.user_id,

        user_name: this.state.name,
      }),
    }).then((response) => {
      response.json().then((result) => {
        console.log(result);
        if (response.ok) {
          getReviews(this.props.movie_id).then((data) => {
            console.log(data);
            this.setState({ Reviews: data });
          });
          this.setState({
            open: false,
          });
        } else {
          alert(result["message"]);
        }
      });
    });
  }
  componentDidMount() {
    getReviews(this.props.movie_id).then((data) => {
      console.log(data);
      this.setState({ Reviews: data });
    });
    getUser(this.props.user_id).then((result) => {
      this.setState({
        name: result["name"],
      });
    });
  }

  render() {
    // console.log(this.state.Reviews);

    return (
      <div style={{ overflow_y: "scroll", maxHeight: "350px" }}>
        <Header as="h2"> Reviews</Header>
        <Modal
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
          trigger={<Button color="green">Add a review</Button>}
        >
          <Modal.Header>Add a review</Modal.Header>
          <Modal.Content scrolling>
            <Form>
              <Form.Field>
                <label>Like</label>
                <Button.Group>
                  <Button
                    icon
                    toggle
                    active={this.state.like}
                    onClick={this.clickLike}
                  >
                    <Icon name="thumbs up" />
                  </Button>
                  <Button.Or />
                  <Button
                    icon
                    toggle
                    active={!this.state.like}
                    onClick={this.clickDislike}
                  >
                    <Icon name="thumbs down" />
                  </Button>
                </Button.Group>
              </Form.Field>
              <Form.Field>
                <label>Content</label>
                <input
                  type="text"
                  onChange={this.content}
                  placeholder="Please enter your review content"
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
              content="Submit"
              labelPosition="right"
              icon="checkmark"
              onClick={this.addReview}
              positive
            />
          </Modal.Actions>
        </Modal>
        <Divider />
        {this.state.Reviews.length === 0 ? (
          "Does not have any review yet"
        ) : (
          <ReviewsList
            Reviews={this.state.Reviews}
            user_id={this.props.user_id}
            movie_id={this.props.movie_id}
          />
        )}
      </div>
    );
  }
}
export default Reviews;
