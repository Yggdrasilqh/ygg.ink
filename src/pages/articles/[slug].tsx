import React, { FunctionComponent } from "react";
import { getAllPosts, getPostBySlug, markdownToHtml } from "../../utils";
import markdownStyles from "./markdown-styles.module.css";

export interface ArticleProps {
  post: any;
}

export const Article: FunctionComponent<ArticleProps> = ({ post }) => {
  return (
    <div className="max-w-2xl mx-auto pt-12">
      <h1 className="text-5xl">{post.title}</h1>
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};

export default Article;

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
  ]);

  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
