import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Watch from "./components/Watch";
import Browse from "./components/Browse";
import SelectProfile from "./components/SelectProfile";
import "./App.css";

import { Routes, Route, useLocation } from "react-router-dom";

export default function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    const storedUserId = localStorage.getItem("flcksProfileID") || "";
    const usersList = window.localStorage.getItem("flcksUserList");

    if (usersList && storedUserId) {
      const result = JSON.parse(usersList).find((x) => x.id === storedUserId);
      setUser(result);
    }
  }, []);

  const location = useLocation();
  const previousLocation = location.state?.previousLocation;
  const movie = location.state?.movie;

  return (
    <>
      <Nav user={user} />
      <Routes location={previousLocation || location}>
        <Route path="/watch/:id" element={<Watch />} />
        {!user ? (
          <Route
            path="/"
            element={<SelectProfile setProfile={setUser} />}
          ></Route>
        ) : (
          <Route path="/" element={<Home />}></Route>
        )}
      </Routes>
      {previousLocation && (
        <Routes>
          <Route path="/browse/:id" element={<Browse movie={movie} />}></Route>
        </Routes>
      )}
    </>
  );
}
