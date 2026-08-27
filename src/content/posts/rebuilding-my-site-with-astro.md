---
title: 用 Astro 把个人站改造成博客
description: 在 astro-zen 模板的基础上原地改造：换字体、换 token、加 Content Collections，域名和部署零改动。
date: 2026-08-27
category: 技术
tags:
  - Astro
  - 博客
---

这次改造没有另起炉灶，而是在原来的个人站仓库上原地改。回头看看，几个决定都比较值。

## 原地改造，而不是重建

原站是 Astro 单页，代码量很小、分层也干净：内容全在 `src/config/index.ts`，组件只管渲染。这种情况下推倒重写纯属浪费。域名、DNS、Vercel 项目全部零改动，push 即部署。

## 设计系统先行

改造第一步不是写页面，而是重定义设计 token。原模板有意思的一点是：所谓"深色主题"其实是把 `--color-white` 定义成了浅灰色、`--color-black` 定义成了深蓝黑，组件全部引用语义 token。所以换肤的主战场集中在一个 `global.css` 里。

字体换成三件套：

- Geist：标题与界面（拉丁字符）
- 思源黑体：中文正文
- JetBrains Mono：代码块

中文字体走 unicode-range 分包，只有页面实际用到的字符子集会被下载，性能没有想象中那么差。

## 内容层

文章用 Astro 的 Content Collections 管理，schema 校验长这样：

```ts
const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});
```

以后发文章就是往 `src/content/posts/` 扔一个 Markdown 文件，push 之后 Vercel 自动构建。没有后台、没有数据库，写作门槛降到最低。

## 后续

RSS、标签页已经就位；搜索、评论、暗色模式放在以后按需加。
