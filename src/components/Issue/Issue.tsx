import { Component } from "solid-js";
import { issues, setIssues } from "../..";
import { pickRandomEmoji } from "../../utils/assignRandomEmoji";
import style from "./Issue.scss";

export type IssueType = {
  title: string;
  id: number;
  milestone:
    | null
    | ({
        id: number;
        title: string;
      } & unknown);
  web_url: string;
};
export type IssueWithEmojiType = IssueType & {
  emoji?: string;
};

const Issue: Component<IssueWithEmojiType> = (issue) => {
  const changeEmoji = () => {
    setIssues(
      issues.findIndex((i) => i.id === issue.id),
      "emoji",
      pickRandomEmoji("animalsAndNature")
    );
  };
  return (
    <div class="Issue" style={style}>
      <button class="emoji" onClick={changeEmoji}>
        {issue.emoji}
      </button>
      <a href={issue.web_url} class="content" title={issue.title}>
        <span class="title">{issue.title}</span>
        {issue.milestone && <span>{issue.milestone.title}</span>}
      </a>
    </div>
  );
};

export default Issue;
