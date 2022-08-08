import classNames from "classnames";
import _ from "lodash";
import Link from "next/link";
import React, { FunctionComponent } from "react";
import { ArticleCard } from "../../components";
import { ArticleExcerpt, getAllPosts } from "../../utils";

export interface ArticlesProps {
  allPosts: ArticleExcerpt[];
  tags: string[];
}

export const Articles: FunctionComponent<ArticlesProps> = ({
  allPosts,
  tags,
}) => {
  return (
    <div className="mt-40">
      <div className="mx-10 sticky top-40 h-0 inline-block align-top">
        <div className=" w-0.5 bg-black -left-0 top-80 bottom-1" />
        <h1 className="text-2xl mb-2 ml-2">Tags</h1>
        {tags.map((tag) => (
          <div key={tag}>
            -{" "}
            <Link href={`/articles/tags/${tag}`}>
              <span
                className={classNames(
                  "relative",
                  "cursor-pointer",
                  "hover:after:w-full",
                  "after:content=[]",
                  "after:h-1",
                  "after:bg-primary",
                  "after:absolute",
                  "after:left-0",
                  "after:w-0",
                  "after:-bottom-1",
                  "after:transition-all"
                )}
              >
                {tag}
              </span>
            </Link>
          </div>
        ))}
      </div>
      <div className="max-w-2xl mx-auto px-10 box-content inline-block">
        {allPosts.map((post) => (
          <ArticleCard key={post.id} article={post} />
        ))}
      </div>
    </div>
  );
};

export default Articles;

export async function getStaticProps() {
  const allPosts = getAllPosts([
    "title",
    "date",
    "author",
    "coverImage",
    "excerpt",
    "tags",
  ]);

  const tags =
    _.compact(
      _.uniq(allPosts.map((post) => post.tags).flatMap((tags) => tags))
    ) ?? [];

  console.log(tags);

  return {
    props: { allPosts, tags },
  };
}
