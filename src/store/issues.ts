import { createEffect, createResource } from "solid-js";
import { createStore, SetStoreFunction, Store } from "solid-js/store";
import { IssueType, IssueWithEmojiType } from "../components/Issue/Issue";
import { assignRandomEmoji } from "../utils/assignRandomEmoji";

export const fetchIssues = async (token: string): Promise<IssueType[]> =>
  (
    await fetch(`${import.meta.env.OPEN_API_URL}/issues`, {
      headers: {
        "PRIVATE-TOKEN": token,
      },
    }).catch((err) => {
      console.error(err);
    })
  )?.json();

export const [remoteIssues, { mutate, refetch }] = createResource<
  IssueType[],
  string
>(import.meta.env.OPEN_AUTH_TOKEN, fetchIssues);

export function createLocalStore<T extends object>(
  name: string,
  init: T,
  fn?: (stateProxy: T, setStateProxy: SetStoreFunction<T>) => void
): [Store<T>, SetStoreFunction<T>] {
  const localState = localStorage.getItem(name);
  const [state, setState] = createStore<T>(
    localState ? JSON.parse(localState) : init
  );

  fn && fn(state, setState);
  createEffect(() => localStorage.setItem(name, JSON.stringify(state)));
  return [state, setState];
}


export function syncIssues(
  fetchedIssues: IssueType[],
  localIssues: IssueWithEmojiType[]
): IssueWithEmojiType[] {
  return fetchedIssues.map((fetchedIssue) => {
    const existingLocalIssueWithEmoji = localIssues.find(
      (localIssue) => localIssue.id === fetchedIssue.id
    );

    if (existingLocalIssueWithEmoji) {
      // update the entire issue and reassign the emoji
      const syncedIssue: IssueWithEmojiType = fetchedIssue;
      syncedIssue.emoji = existingLocalIssueWithEmoji?.emoji;
      return syncedIssue;
    } else {
      return assignRandomEmoji(fetchedIssue, "animalsAndNature");
    }
  });
}