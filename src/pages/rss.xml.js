import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { sortByDate } from "@utils/posts";
import { SITE_CONFIG } from "@config";

export async function GET(context) {
  const posts = sortByDate(
    await getCollection("posts", ({ data }) => !data.draft),
  );
  return rss({
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/posts/${post.id}/`,
    })),
    customData: "<language>zh-CN</language>",
  });
}
