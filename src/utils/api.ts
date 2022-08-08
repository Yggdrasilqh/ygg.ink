import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import _ from "lodash";

const postsDirectory = join(process.cwd(), "articles");

export function getPostPaths() {
  return fs.readdirSync(postsDirectory);
}

export function readPostById(id: string, fields: string[] = []) {
  return readPostByPath(`${id}.md`, fields);
}

export function readPostByPath(path: string, fields: string[] = []) {
  const fullPath = join(postsDirectory, path);

  const id = path.replace(/\.md$/, "");

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items: Record<string, string> = {
    id,
  };

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }

    if (field === "coverImage" && data[field]) {
      items[field] = `/assets/article/${id}/${data[field]}`;
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = [], tag?: string) {
  const paths = getPostPaths();

  if (tag && !fields.includes("tag")) {
    fields.push("tags");
  }

  let posts = paths.map((path) => readPostByPath(path, fields));

  if (tag) {
    posts = posts.filter((post) => (post.tags ?? []).includes(tag));
  }

  posts // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}

export interface ArticleExcerpt {
  title: string;
  date: string;
  id: string;
  author?: {
    name?: string;
    picture?: string;
  };
  tags?: string[];
  coverImage?: string;
  excerpt?: string;
}
