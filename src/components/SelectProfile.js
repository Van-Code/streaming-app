import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { users, generateId } from "../users";
import styles from "./SelectProfile.module.css";

export default function SelectProfile(props) {
  const [show, handleShow] = useState(false);
  const [userList, addToList] = useState(users);
  const [profileName, setName] = useState("");
  const [errorMsg, setError] = useState("");

  const hasUserList = window.localStorage.getItem("flcksUserList");
  if (!hasUserList) {
    window.localStorage.setItem("flcksUserList", JSON.stringify(users));
  }

  function addNewName(event) {
    const name = event.target.value;
    const exists = userList.some((user) => {
      return user.name === name;
    });
    if (exists) {
      setError("Username already exists");
    }
    setName(event.target.value);
  }
  function setUser(user) {
    window.localStorage.setItem("flcksProfileID", user.id);
    props.setProfile(user);
  }
  function handleSubmit(event) {
    event.preventDefault();
    addToList([...userList, { name: profileName, id: generateId() }]);
    handleShow(false);
  }
  function handleClose() {
    handleShow(false);
  }

  function renderModal() {
    return (
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group controlId="formName">
              <Form.Label>Add Profile</Form.Label>
              <Form.Control
                type="text"
                value={profileName}
                placeholder="Name"
                required
                onChange={addNewName}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
            {errorMsg && <small>{errorMsg}</small>}
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Who's watching?</h1>
      <ul className={styles.list}>
        {userList.map((user) => {
          return (
            <li
              key={user.id}
              data-id={user.id}
              onClick={() => setUser(user)}
              className={styles.profile}
            >
              <button className={styles.icon}></button> <div> {user.name}</div>
            </li>
          );
        })}
        <li className={`${styles.profile} ${styles.addIcon}`}>
          <button onClick={handleShow} className={styles.icon}>
            +
          </button>
          <div>Add Profile</div>
        </li>
      </ul>
      {renderModal()}
    </div>
  );
}
