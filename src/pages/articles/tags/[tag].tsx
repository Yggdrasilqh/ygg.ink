import React, { FunctionComponent } from "react";
import { ArticleExcerpt, getAllPosts } from "../../../utils";
import { ArticleCard } from "../../../components";

export interface TagProps {
  allPosts: ArticleExcerpt[];
}

export const Tag: FunctionComponent<TagProps> = ({ allPosts }) => {
  return (
    <div className="max-w-2xl mx-auto pt-2 px-10 box-content">
      {allPosts.map((post) => (
        <ArticleCard key={post.id} article={post} />
      ))}
    </div>
  );
};

export default Tag;

export async function getStaticProps({ params }: { params: { tag: string } }) {
  const allPosts = getAllPosts(
    ["title", "date", "author", "coverImage", "excerpt"],
    params.tag
  );

  return {
    props: {
      allPosts,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["tags"]);

  const tags = posts
    .flatMap((post) => post.tags ?? [] ?? [])
    .filter((tag) => !!tag)
    .map((tag) => ({ params: { tag } }));

  return {
    paths: tags,
    fallback: false,
  };
}
