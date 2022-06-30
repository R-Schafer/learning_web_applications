import React from "react";

function Header() {
  return (
    <header className="header">
      <img
        src="./images/troll-face.png"
        alt="grinning face"
        className="header--image"
      />
      <h2 className="header--title">Meme Generator</h2>
    </header>
  );
}

export default Header;
