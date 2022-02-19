import React from "react";
import { Button, Modal } from "semantic-ui-react";
import WatchingList from "./WatchingList";

/**
 * The modal for viewing watching list of a friend
 */
export default function WatchingListModal({ user_id, user_name }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button color="blue" floated="right">
          View Watching List
        </Button>
      }
    >
      <Modal.Header>{user_name}'s Watching List</Modal.Header>
      <Modal.Content scrolling>
        <WatchingList user_id={user_id} is_friend_view={true} />
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
