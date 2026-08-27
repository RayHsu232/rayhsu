import { describe, expect, it } from "vitest";
import {
  formatDate,
  getAllTags,
  getPostsByTag,
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
    expect(formatDate(new Date(2026, 7, 27))).toBe("2026-08-27");
    expect(formatDate(new Date(2026, 0, 5))).toBe("2026-01-05");
  });
});
