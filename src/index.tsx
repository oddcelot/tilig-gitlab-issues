/* @refresh reload */
import { render } from "solid-js/web";
import { Component, createResource } from "solid-js";

import "./styles/index.scss";
import "./styles/app.scss";

import Header from "./components/Header/Header";

export const fetchIssues = async (token: string) =>
  (
    await fetch(`${import.meta.env.OPEN_API_URL}/issues`, {
      headers: {
        "PRIVATE-TOKEN": token,
      },
    })
  ).json();

const App: Component = () => {
  const [issues, { mutate, refetch }] = createResource(
    import.meta.env.OPEN_AUTH_TOKEN,
    fetchIssues
  );

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
