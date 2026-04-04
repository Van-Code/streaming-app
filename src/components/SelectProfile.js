import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./SelectProfile.css";

const AVATAR_PALETTE = ["#6366f1", "#ec4899", "#14b8a6", "#f59e0b", "#8b5cf6"];

const DEFAULT_PROFILES = [
  { name: "Alex", id: crypto.randomUUID() },
  { name: "Jordan", id: crypto.randomUUID() },
];

function getAvatarColor(index) {
  return AVATAR_PALETTE[index % AVATAR_PALETTE.length];
}

export default function SelectProfile({ setProfile }) {
  const [showModal, setShowModal] = useState(false);
  const [userList, setUserList] = useState(DEFAULT_PROFILES);
  const [profileName, setProfileName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function handleNameChange(event) {
    const name = event.target.value;
    setProfileName(name);
    const exists = userList.some((u) => u.name === name);
    setErrorMsg(exists ? "That name is already taken." : "");
  }

  function selectUser(user) {
    window.localStorage.setItem("flicksProfileID", user.id);
    setProfile(user);
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
    <div className="select-profile">
      <span className="select-profile__logo">FLCKS</span>
      <h1 className="select-profile__heading">Who&apos;s watching?</h1>

      <ul className="profiles-list">
        {userList.map((user, index) => (
          <li key={user.id} className="profile">
            <button
              className="profile-btn"
              style={{ background: getAvatarColor(index) }}
              onClick={() => selectUser(user)}
              aria-label={`Select profile: ${user.name}`}
            >
              {user.name[0].toUpperCase()}
            </button>
            <span className="profile-name">{user.name}</span>
          </li>
        ))}

        <li className="profile">
          <button
            className="profile-btn profile-btn--add"
            onClick={() => setShowModal(true)}
            aria-label="Add new profile"
          >
            +
          </button>
          <span className="profile-name">Add Profile</span>
        </li>
      </ul>

      <Modal show={showModal} onHide={handleClose} backdrop="static" keyboard={false} centered>
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
            <Button type="submit" variant="primary" disabled={!!errorMsg}>
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
