import type { Component } from "solid-js";

import style from "./Header.scss";

const Header: Component = () => {
  return (
    <header class="Header" style={style}>
      <a class="home" href="/"><span>Tilig</span></a>
      <span>🦄 Welcome</span>
      <nav class="menu">
        <button class="trigger" title="Open Menu">Menu</button>
      </nav>
    </header>
  );
};

export default Header;
