import React from "react";
import { Icon, Button, Modal, Form } from "semantic-ui-react";
import { getReviews } from "../resources/Util";

/**
 * The modal for update a review
 */
export default function UpdateReviewModal({
  review,
  user_id,
  movie_id,
  setReviews,
}) {
  const [open, setOpen] = React.useState(false);
  const [like, setLike] = React.useState(review.like);
  const [content, setContent] = React.useState(review.content);
  function updateReview() {
    console.log(like, content);
    fetch("api/review/" + review._id.$oid, {
      method: "put",

      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        movie_id: movie_id,

        like: like,

        content: content,

        user_id: user_id,
      }),
    }).then((response) => {
      response.json().then((result) => {
        console.log(result);
        if (response.ok) {
          getReviews(movie_id).then((data) => setReviews(data));
          setOpen(false);
        } else {
          alert(result["message"]);
        }
      });
    });
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button color="blue" size="mini">
          Update
        </Button>
      }
    >
      <Modal.Header>Update a review</Modal.Header>
      <Modal.Content scrolling>
        <Form>
          <Form.Field>
            <label>Like</label>
            <Button.Group>
              <Button icon toggle active={like} onClick={() => setLike(true)}>
                <Icon name="thumbs up" />
              </Button>
              <Button.Or />
              <Button icon toggle active={!like} onClick={() => setLike(false)}>
                <Icon name="thumbs down" />
              </Button>
            </Button.Group>
          </Form.Field>
          <Form.Field>
            <label>Content</label>
            <input
              type="text"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              placeholder="Please enter your review content"
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          content="Update"
          labelPosition="right"
          icon="checkmark"
          onClick={() => updateReview()}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}
