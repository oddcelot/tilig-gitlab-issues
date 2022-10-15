/* @refresh reload */
import { render } from "solid-js/web";
import { Component, createEffect, For } from "solid-js";

import "./styles/index.scss";
import "./styles/app.scss";

import Header from "./components/Header/Header";
import Issue, { IssueWithEmojiType } from "./components/Issue/Issue";
import { createLocalStore, remoteIssues, syncIssues } from "./store/issues";

export const [issues, setIssues] = createLocalStore<IssueWithEmojiType[]>(
  "issues",
  [],
  (state, setState) => {
    createEffect(() => {
      if (remoteIssues()) {
        setState(syncIssues([...remoteIssues()!], state));
      }
    });
  }
);

const App: Component = () => {
  return (
    <>
      <Header />
      <main>
        <h1>
          Gitlab Issues Emoji{" "}
          {remoteIssues.loading && (
            <span>
              <br />
              fetching new issues…
            </span>
          )}
          {remoteIssues.error && "Something went wrong…"}
        </h1>
        <section>
          <h2>Issues with milestone</h2>
          <div class="issue-box">
            <For each={issues?.filter((issue) => issue.milestone !== null)}>
              {(issue) => <Issue {...issue} />}
            </For>
          </div>
        </section>
        <section>
          <h2>Issues without milestone</h2>
          <div class="issue-box">
            <For each={issues?.filter((issue) => issue.milestone === null)}>
              {(issue) => <Issue {...issue} />}
            </For>
          </div>
        </section>
      </main>
      <footer>GitLab issues challenge</footer>
    </>
  );
};

render(() => <App />, document.getElementById("app") as HTMLElement);
