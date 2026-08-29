import { describe, expect, it } from "vitest";
import {
  formatDate,
  formatDateCN,
  getAllTags,
  getAdjacentPosts,
  getPostsByTag,
  getReadingMinutes,
  getRecommendedPosts,
  getStats,
  sortByDate,
  type PostLike,
} from "./posts";

const post = (
  id: string,
  date: string,
  tags: string[] = [],
  category?: string,
): PostLike => ({
  id,
  data: { title: id, date: new Date(date), tags, category, draft: false },
});

describe("sortByDate", () => {
  it("按日期倒序且不改原数组", () => {
    const a = post("a", "2026-01-01");
    const b = post("b", "2026-06-01");
    const input = [a, b];
    const result = sortByDate(input);
    expect(result.map((p) => p.id)).toEqual(["b", "a"]);
    expect(input.map((p) => p.id)).toEqual(["a", "b"]);
  });
});

describe("getAllTags", () => {
  it("统计每个标签数量并按数量降序", () => {
    const posts = [
      post("a", "2026-01-01", ["astro", "life"]),
      post("b", "2026-02-01", ["astro"]),
    ];
    const tags = getAllTags(posts);
    expect([...tags.entries()]).toEqual([
      ["astro", 2],
      ["life", 1],
    ]);
  });

  it("空数组返回空 Map", () => {
    expect(getAllTags([]).size).toBe(0);
  });
});

describe("getPostsByTag", () => {
  it("只返回包含该标签的文章", () => {
    const a = post("a", "2026-01-01", ["astro"]);
    const b = post("b", "2026-02-01", ["life"]);
    expect(getPostsByTag([a, b], "astro").map((p) => p.id)).toEqual(["a"]);
  });
});

describe("getStats", () => {
  it("统计文章数、去重分类数、去重标签数", () => {
    const posts = [
      post("a", "2026-01-01", ["astro", "life"], "技术"),
      post("b", "2026-02-01", ["astro"], "技术"),
      post("c", "2026-03-01", ["life"], "随想"),
    ];
    expect(getStats(posts)).toEqual({ posts: 3, categories: 2, tags: 2 });
  });
});

describe("formatDate", () => {
  it("输出 YYYY-MM-DD，月日补零", () => {
    expect(formatDate(new Date("2026-08-27T00:00:00Z"))).toBe("2026-08-27");
    expect(formatDate(new Date("2026-01-05T00:00:00Z"))).toBe("2026-01-05");
  });
});

describe("formatDateCN", () => {
  it("formats as 2026年06月01日", () => {
    expect(formatDateCN(new Date(Date.UTC(2026, 5, 1, 13, 20)))).toBe("2026年06月01日");
  });
  it("zero-pads month and day", () => {
    expect(formatDateCN(new Date(Date.UTC(2026, 0, 5)))).toBe("2026年01月05日");
  });
});

describe("getReadingMinutes", () => {
  it("returns 1 for short body", () => {
    expect(getReadingMinutes("你好，博客")).toBe(1);
  });
  it("counts cjk chars at 350 per minute", () => {
    expect(getReadingMinutes("汉".repeat(700))).toBe(2);
  });
  it("counts latin words at 200 per minute", () => {
    expect(getReadingMinutes(Array.from({ length: 600 }, (_, i) => `w${i}`).join(" "))).toBe(3);
  });
  it("ignores markdown syntax and code fences", () => {
    expect(getReadingMinutes("```python\nprint('hi')\n```\n# 标题\n正文一段话")).toBe(1);
  });
});

describe("getAdjacentPosts", () => {
  const mk = (id: string, date: string): PostLike => ({
    id,
    data: { title: id, date: new Date(date), tags: [], draft: false },
  });
  it("returns newer as next and older as prev", () => {
    const posts = [mk("b", "2026-02-01"), mk("a", "2026-01-01")];
    expect(getAdjacentPosts(posts, "a")).toEqual({ prev: null, next: posts[0] });
    expect(getAdjacentPosts(posts, "b")).toEqual({ prev: posts[1], next: null });
  });
  it("returns both nulls for unknown id", () => {
    expect(getAdjacentPosts([mk("a", "2026-01-01")], "x")).toEqual({ prev: null, next: null });
  });
});

describe("getRecommendedPosts", () => {
  const mk = (id: string, date: string, category?: string): PostLike => ({
    id,
    data: { title: id, date: new Date(date), category, tags: [], draft: false },
  });
  it("prefers same-category posts excluding current", () => {
    const posts = [mk("cur", "2026-03-01", "技术"), mk("t1", "2026-02-01", "技术"), mk("o1", "2026-01-15", "随想"), mk("t2", "2026-01-01", "技术")];
    expect(getRecommendedPosts(posts, posts[0]).map((p) => p.id)).toEqual(["t1", "t2", "o1"]);
  });
  it("fills up with latest posts when same category is short", () => {
    const posts = [mk("cur", "2026-03-01", "技术"), mk("t1", "2026-02-01", "技术")];
    expect(getRecommendedPosts(posts, posts[0], 3).map((p) => p.id)).toEqual(["t1"]);
  });
  it("returns empty when only current exists", () => {
    const posts = [mk("cur", "2026-03-01")];
    expect(getRecommendedPosts(posts, posts[0])).toEqual([]);
  });
});
