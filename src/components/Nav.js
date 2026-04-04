import React, { useState, useEffect } from "react";
import "./Nav.css";

export default function Nav({ user }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const initial = user?.name?.[0]?.toUpperCase();

  return (
    <header className={`site-nav${scrolled ? " site-nav--scrolled" : ""}`}>
      <div className="site-nav__inner">
        <span className="site-nav__logo">FLCKS</span>
        {user && (
          <div
            className="nav-avatar"
            aria-label={`Signed in as ${user.name}`}
            title={user.name}
          >
            {initial}
          </div>
        )}
      </div>
    </header>
  );
}
