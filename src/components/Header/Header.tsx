import type { Component } from "solid-js";

import style from "./Header.scss";

const Header: Component = () => {
  return (
    <header class="Header" style={style}>
      <span>Tilig</span>
      <span>🦄 Welcome</span>
      <nav>
        <button>Menu</button>
      </nav>
    </header>
  );
};

export default Header;
