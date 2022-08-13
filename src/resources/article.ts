import matter from "gray-matter";
import _ from "lodash";
import Path from "path";
import {
  markdownToHtml,
  parsePureFileName,
  readDirPaths,
  readFile,
} from "../utils";

export interface ArticleExcerpt {
  title: string;
  date: string;
  id: string;
  author?: {
    name?: string;
    picture?: string;
  };
  tags?: string[];
  cover?: string;
  excerpt?: string;
}

export interface Article {
  title: string;
  date: string;
  id: string;
  author?: {
    name?: string;
    picture?: string;
  };
  tags?: string[];
  cover?: string;
  content: string;
}

const articleDirectory = Path.join(process.cwd(), "articles");

const IMAGE_BASE_PATH = "/assets/article";

function getArticleFileNames() {
  return readDirPaths(articleDirectory);
}

export function getArticleIds() {
  return getArticleFileNames().map((path) => parsePureFileName(path));
}

function readArticle(path: string) {
  const fileContent = readFile(path);

  return matter(fileContent);
}

export function readAllArticleExcept(
  onlyTag?: string
): ArticleExcerpt[] {
  return _.compact(
    getArticleFileNames().map((fileName) => {
      const path = Path.join(articleDirectory, fileName);

      const data = readArticle(path).data;
      const id = parsePureFileName(fileName);

      if (onlyTag && (!data.tags || !data.tags.includes(onlyTag))) {
        return undefined;
      }

      return {
        id: id,
        ...(data.cover
          ? { cover: `${IMAGE_BASE_PATH}/${id}/${data.cover}` }
          : undefined),
        ..._.pick(data, [
          "title",
          "date  ",
          "author",
          "tags",
          "excerpt",
          "date",
        ]),
      };
    })
  );
}

export async function readArticleById(id: string): Promise<Article> {
  const path = `${id}.md`;
  const { data, content } = readArticle(
    Path.join(articleDirectory, path)
  );

  return {
    id: id,
    content: await markdownToHtml(content),
    ...(data.cover
      ? { cover: `${IMAGE_BASE_PATH}/${id}/${data.cover}` }
      : undefined),
    ..._.pick(data, ["title", "date  ", "author", "tags", "date"]),
  };
}
