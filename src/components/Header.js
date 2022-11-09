/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect } from "react";
import "./Header.css";
import { CSSTransition } from "react-transition-group";
import LogoutButton from "../components/logout";
import {Navigate} from "react-router-dom";


export default function Header() {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };
  let userProfilePic = localStorage.getItem('imageUrl')
  console.log(userProfilePic)
  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };
  return (
    <header className="Header">
      {/* <img src={require("../assets/logo.png")} className="Logo" alt="logo" /> */}
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        <nav className="Nav">
          <a href="/Home">Home</a>
          <a href="/profile">
          <img 
              src={userProfilePic}
              alt="profile"
              style={{
                borderRadius: "100%",
                width: "50%"
              }}
              />
            </a>
          {/* <div className="logout"> */}
        <LogoutButton /> 
      {/* </div> */}
        </nav>
      </CSSTransition>
    </header>
  );
}
