import { createResource } from "solid-js";
import { IssueType } from "../components/Issue/Issue";

export const fetchIssues = async (token: string) =>
  (
    await fetch(`${import.meta.env.OPEN_API_URL}/issues`, {
      headers: {
        "PRIVATE-TOKEN": token,
      },
    })
  ).json();

export const [issues, { mutate, refetch }] = createResource<
  IssueType[],
  string
>(import.meta.env.OPEN_AUTH_TOKEN, fetchIssues);
