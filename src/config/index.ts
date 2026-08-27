import type { SiteConfig, SiteContent } from "../types";

export const SITE_CONFIG: SiteConfig = {
  title: "Ray Hsu 徐睿",
  author: "Ray Hsu",
  description: "Ray Hsu 的个人博客：记录技术文章与随想。",
  lang: "zh-CN",
  siteLogo: "/webICon-personal.png",
  navLinks: [
    { text: "首页", href: "/" },
    { text: "关于我", href: "/about" },
  ],
  socialLinks: [
    { text: "GitHub", href: "https://github.com/RayHsu232" },
    { text: "Email", href: "mailto:ruixu1114@gmail.com" },
  ],
  socialImage: "/og-image.jpg",
  canonicalURL: "https://www.rayhsu.tech",
};

export const SITE_CONTENT: SiteContent = {
  hero: {
    name: "Ray Hsu 徐 睿",
    specialty: "软件工程师",
    summary:
      `Find something worth pursuing, no matter what it cost.`,
    email: "ruixu1114@gmail.com",
  },
  education:[{
      school: "电子科技大学",
      department: "软件工程 硕士",
      startDate: "2023.09",
      endDate: "2023.06",
      summary: [
        "2023/2024 研究生学业奖学金",
        "专利(CN116883706A)",
      ],
    },
    {
      school: "西南石油大学",
      department: "计算机技术 本科",
      startDate: "2018.09",
      endDate: "2022.06",
      summary: [
        "2019/2020/2021 学业奖学金",
        "软件设计师（软考中级）、英语六级",
      ],
    },],
  experience: [
    {
      company: "美团（成都三快科技有限公司）",
      position: "开发实习生",
      startDate: "2025.01",
      endDate: "2025.05",
      summary: [
        "在实习期间参与到了内部平台质效工具开发，实现了用户角度下的业务流程监测组件以及代码评审组件的开发与部署",
      ],
    },
  ],
  projects: [
    {
      name: "大营销系统开发",
      summary: "A music streaming app that emulates Spotify's core features.",
      linkPreview: "/",
      linkSource: "https://github.com/immois/astro-zen",
      image: "/spotifu.png",
    },
    {
      name: "API网关实现",
      summary: "An e-commerce platform that replicates Shopify's key features.",
      linkPreview: "/",
      linkSource: "https://github.com/immois/astro-zen",
      image: "/shopify-clon.png",
    },
  ],
  about: {
    description: `
      你好呀！👋
      我是徐睿，一名热爱代码，热爱生活的软件开发者。
      目前专注于后台开发与系统设计，乐于研究高并发场景下的技术实现。
      我喜欢写出「既稳又快」的代码，也享受从复杂业务中抽丝剥茧，找到最简洁的解决方案。
      除了代码，我也是一个热衷探索生活的人，喜欢运动、看心理类书籍以及研究股票（并不擅长）。
      如果你感兴趣，欢迎和我交流，一起 geek 一下 🤓！
    `,
    image: "/IMG_6458.jpg",
  },
};

export const PROFILE = {
  name: "Ray Hsu 徐睿",
  bio: "软件工程师，专注后台开发与系统设计。写代码，也写点东西。",
  email: "ruixu1114@gmail.com",
  github: "https://github.com/RayHsu232",
};

// #5755ff