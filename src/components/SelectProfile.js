import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./SelectProfile.css";

const DEFAULT_PROFILES = [
  { name: "Alex", id: crypto.randomUUID() },
  { name: "Jordan", id: crypto.randomUUID() },
];

export default function SelectProfile(props) {
  const [showModal, setShowModal] = useState(false);
  const [userList, setUserList] = useState(DEFAULT_PROFILES);
  const [profileName, setProfileName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function handleNameChange(event) {
    const name = event.target.value;
    setProfileName(name);
    const exists = userList.some((user) => user.name === name);
    setErrorMsg(exists ? "That name is already taken." : "");
  }

  function selectUser(user) {
    window.localStorage.setItem("flicksProfileID", user.id);
    props.setProfile(user);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (errorMsg) return;
    setUserList([...userList, { name: profileName, id: crypto.randomUUID() }]);
    setProfileName("");
    setShowModal(false);
  }

  function handleClose() {
    setProfileName("");
    setErrorMsg("");
    setShowModal(false);
  }

  return (
    <div className="profiles-container">
      <h1>Who&apos;s watching?</h1>
      <ul className="profiles-list">
        {userList.map((user) => (
          <li key={user.id} className="profile">
            <button
              className="profile-icon"
              onClick={() => selectUser(user)}
              aria-label={`Select profile: ${user.name}`}
            />
            <div className="profile-name">{user.name}</div>
          </li>
        ))}
        <li className="profile add-profile">
          <button
            onClick={() => setShowModal(true)}
            className="profile-icon profile-icon--add"
            aria-label="Add new profile"
          >
            +
          </button>
          <div className="profile-name">Add Profile</div>
        </li>
      </ul>

      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group controlId="formName">
              <Form.Label>Profile name</Form.Label>
              <Form.Control
                type="text"
                value={profileName}
                placeholder="Enter a name"
                required
                onChange={handleNameChange}
                autoFocus
              />
              {errorMsg && (
                <Form.Text className="text-danger">{errorMsg}</Form.Text>
              )}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!!errorMsg}>
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
