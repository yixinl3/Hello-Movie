import React from "react";
import { Icon, Button, Item, Divider } from "semantic-ui-react";
import { getReviews } from "../resources/Util";
import UpdateReviewModal from "./updateReviewModal";

/**
 * Display Review in list view
 */
export default function ReviewsList({ Reviews, user_id, movie_id }) {
  const [reviews, setReviews] = React.useState(Reviews);

  React.useEffect(() => {
    setReviews(Reviews);
  }, [Reviews]);
  function deleteReview(review_id) {
    console.log(typeof review_id);
    fetch("api/review/" + review_id, {
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
          getReviews(movie_id).then((data) => setReviews(data));
        } else {
          alert(result["message"]);
        }
      });
    });
  }

  const reviewsList = reviews.map((review, i) => {
    return (
      <Item>
        <Item.Content>
          <Item.Header as="h6">Review #{i + 1}</Item.Header>

          <Item.Meta>
            Like:{" "}
            {review.like ? (
              <Icon name="thumbs up" />
            ) : (
              <Icon name="thumbs down" />
            )}
            {"     By    "}
            {review.user_name}
          </Item.Meta>
          <Item.Description>Content: {review.content}</Item.Description>
          <Item.Extra>
            {user_id == review.user_id ? (
              <div>
                <UpdateReviewModal
                  review={review}
                  user_id={user_id}
                  movie_id={movie_id}
                  setReviews={setReviews}
                />
                <Button
                  color="red"
                  size="mini"
                  onClick={() => deleteReview(review._id.$oid)}
                >
                  Delete
                </Button>
              </div>
            ) : (
              <div></div>
            )}
          </Item.Extra>
          <Divider />
        </Item.Content>
      </Item>
    );
  });

  return (
    <div>
      <Item.Group>{reviewsList}</Item.Group>
    </div>
  );
}
