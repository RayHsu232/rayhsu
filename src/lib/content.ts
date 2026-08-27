import { getCollection, type CollectionEntry } from "astro:content";
import { sortByDate } from "@utils/posts";

export type Post = CollectionEntry<"posts">;

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  return sortByDate(posts);
}
