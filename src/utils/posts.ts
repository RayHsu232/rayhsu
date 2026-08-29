export interface PostMeta {
  title: string;
  date: Date;
  tags: string[];
  category?: string;
  draft: boolean;
}

export interface PostLike {
  id: string;
  data: PostMeta;
}

export function sortByDate<T extends PostLike>(posts: T[]): T[] {
  return [...posts].sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function getAllTags<T extends PostLike>(posts: T[]): Map<string, number> {
  const map = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      map.set(tag, (map.get(tag) ?? 0) + 1);
    }
  }
  return new Map([...map.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])));
}

export function getPostsByTag<T extends PostLike>(posts: T[], tag: string): T[] {
  return posts.filter((post) => post.data.tags.includes(tag));
}

export function getStats<T extends PostLike>(posts: T[]): {
  posts: number;
  categories: number;
  tags: number;
} {
  const categories = new Set(
    posts.map((post) => post.data.category).filter((c) => Boolean(c)),
  );
  return {
    posts: posts.length,
    categories: categories.size,
    tags: getAllTags(posts).size,
  };
}

export function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function formatDateCN(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}年${m}月${d}日`;
}
