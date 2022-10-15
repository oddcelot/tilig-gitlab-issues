import { IssueType, IssueWithEmojiType } from "../components/Issue/Issue";
import { emojis } from "./emojis";

export function pickRandomEmoji(categoryScope: keyof typeof emojis): string {
  const randomPickIndex = Math.floor(
    Math.random() * emojis[categoryScope].length
  );
  return emojis[categoryScope][randomPickIndex];
}

export function assignRandomEmoji(
  issue: IssueType | IssueWithEmojiType,
  categoryScope: keyof typeof emojis
): IssueWithEmojiType {
  const issueWithNewEmoji: IssueWithEmojiType = issue;
  issueWithNewEmoji.emoji = pickRandomEmoji(categoryScope);

  return issueWithNewEmoji;
}
