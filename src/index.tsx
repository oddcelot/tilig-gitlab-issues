/* @refresh reload */
import { render } from "solid-js/web";
import { Component, createResource } from "solid-js";

import "./styles/index.scss";
import "./styles/app.scss";

import Header from "./components/Header/Header";
import Issue from "./components/Issue/Issue";
import { issues } from "./store/issues";

export const fetchIssues = async (token: string) =>
  (
    await fetch(`${import.meta.env.OPEN_API_URL}/issues`, {
      headers: {
        "PRIVATE-TOKEN": token,
      },
    })
  ).json();

const App: Component = () => {
  return (
    <>
      <Header />
      <main>
        <h1>Gitlab Issues Emoji</h1>
        <section>
          <h2>Issues with milestone</h2>
          <div class="issue-box">
            {issues.loading && "Loading…"}
            {issues()
              ?.filter((issue) => issue.milestone !== null)
              ?.map((issue) => (
                <Issue {...issue} />
              ))}
          </div>
        </section>
        <section>
          <h2>Issues without milestone</h2>
          <div class="issue-box">
            {issues.loading && "Loading…"}
            {issues()
              ?.filter((issue) => issue.milestone === null)
              ?.map((issue) => (
                <Issue {...issue} />
              ))}
          </div>
        </section>
      </main>
      <footer>GitLab issues challenge</footer>
    </>
  );
};

render(() => <App />, document.getElementById("app") as HTMLElement);
