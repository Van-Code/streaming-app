import React, { useState } from "react";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Watch from "./components/Watch";
import Details from "./components/Details";
import SelectProfile from "./components/SelectProfile";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Routes, Route, useLocation } from "react-router-dom";

export default function App() {
  const [user, setUser] = useState();
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;
  const movie = location.state?.movie;

  return (
    <>
      <Nav user={user} />
      <Routes location={previousLocation || location}>
        <Route path="/watch/:id" element={<Watch />} />
        {user && <Route path="/" element={<Home />}></Route>}
        {!user && (
          <Route
            path="/"
            element={<SelectProfile setProfile={setUser} />}
          ></Route>
        )}
      </Routes>
      {previousLocation && (
        <Routes>
          <Route path="/modal" element={<Details movie={movie} />}></Route>
        </Routes>
      )}
    </>
  );
}
