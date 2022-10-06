import type { Component } from "solid-js";

import style from "./Issue.scss";

export type IssueType = {
  title: string;
  milestone: null | {
    title: string;
  };
  web_url: string;
};
export type IssueWithEmojiType = IssueType & {
  emoji?: string;
};

const Issue: Component<IssueWithEmojiType> = ({
  title,
  emoji = "🐿",
  milestone,
  web_url,
}) => {
  const assignEmoji = () => {
    emoji = "s";
  };
  return (
    <div class="Issue" style={style}>
      <button class="emoji" onClick={assignEmoji}>
        {emoji}
      </button>
      <a href={web_url} class="content" title={title}>
        <span class="title">{title}</span>
        {milestone && <span>{milestone.title}</span>}
      </a>
    </div>
  );
};

export default Issue;
