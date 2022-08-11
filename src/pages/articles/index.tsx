import classNames from "classnames";
import _ from "lodash";
import Link from "next/link";
import React, { FunctionComponent } from "react";
import { ArticleCard, TagList, TopMask } from "../../components";
import { ArticleExcerpt, getAllPosts } from "../../utils";
import { NextPageWithLayout } from "../_app";
import styles from "./article.module.css";

export interface ArticlesProps {
  allPosts: ArticleExcerpt[];
  tags: string[];
}

export const Articles: NextPageWithLayout<ArticlesProps> = ({
  allPosts,
  tags,
}) => {
  return (
    <div className="max-w-4xl px-10 flex min-w-full">
      <div className={classNames("grow")} />
      <div className="flex">
        <div className="flex-none">
          <div className="mr-10 sticky top-40 align-top">
            <div className=" w-0.5 bg-black -left-0 top-80 bottom-1" />
            <h1 className="text-2xl mb-2 ml-2">Tags</h1>
            <TagList tags={tags} />
          </div>
        </div>
        <div className={classNames("box-content", "max-w-2xl")}>
          {allPosts.map((post) => (
            <ArticleCard key={post.id} article={post} />
          ))}
        </div>
      </div>
      <div className={classNames("grow-2")}></div>
    </div>
  );
};

Articles.topMask = true;

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
