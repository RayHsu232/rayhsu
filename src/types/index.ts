export interface SiteConfig extends HeaderProps {
  title: string;
  description: string;
  lang: string;
  author: string;
  brandName: string;
  brandSubtitle: string;
  socialLinks: { text: string; href: string }[];
  socialImage: string;
  canonicalURL?: string;
}

export interface SiteContent {
  hero: HeroProps;
  education:EducationProps[],
  experience: ExperienceProps[];
  projects: ProjectProps[];
  about: AboutProps;
}

export interface EducationProps {
  school: string;
  department: string;
  startDate: string;
  endDate: string;
  summary: string | string[];
}

export interface HeroProps {
  name: string;
  specialty: string;
  summary: string;
  email: string;
}

export interface ExperienceProps {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  summary: string | string[];
}

export interface ProjectProps {
  name: string;
  summary: string;
  image: string;
  linkPreview?: string;
  linkSource?: string;
}

export interface AboutProps {
  description: string;
  image: string;
}

export interface HeaderProps {
  siteLogo: string;
  navLinks: { text: string; href: string }[];
}

export interface FeaturedTopicPost {
  title: string;
  href: string;
}

export interface FeaturedTopic {
  name: string;
  desc: string;
  href: string;
  posts: FeaturedTopicPost[];
}
