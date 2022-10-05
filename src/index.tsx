/* @refresh reload */
import { render } from "solid-js/web";
import type { Component } from "solid-js";

import "./styles/index.scss";
import "./styles/app.scss";

import Header from "./components/Header/Header";

const App: Component = () => {
  return (
    <>
      <Header />
      <main>
        <h1>Gitlab Issues Emoji</h1>
        <section>
          <h2>Issues with milestone</h2>
        </section>
        <section>
          <h2>Issues without milestone</h2>
        </section>
      </main>
      <footer>GitLab issues challenge</footer>
    </>
  );
};

render(() => <App />, document.getElementById("app") as HTMLElement);
