import classNames from "classnames";
import _ from "lodash";
import { GetStaticProps } from "next";
import React from "react";
import { ArticleCard, TagList } from "../../components";
import {
  ArticleExcerpt,
  readAllArticleExcept,
} from "../../resources";
import { NextPageWithLayout } from "../_app";

export interface ArticlesProps {
  articleExcerpts: ArticleExcerpt[];
  tags: string[];
}

export const Articles: NextPageWithLayout<ArticlesProps> = ({
  articleExcerpts,
  tags,
}) => {
  return (
    <div className="max-w-4xl px-10 flex min-w-full">
      <div className={classNames("grow", "flex")}>
        <div className="shrink ml-auto" style={{ maxWidth: 200 }}>
          <div className="mr-10 sticky top-40 align-top">
            <div className="w-0.5 bg-black -left-0 top-80 bottom-1" />
            <h1 className="text-2xl mb-2 ml-2">Tags</h1>
            <TagList tags={tags} />
          </div>
        </div>
      </div>
      <div className="flex">
        <div className={classNames("box-content", "max-w-2xl")}>
          {articleExcerpts.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
      <div className={classNames("grow-2")}></div>
    </div>
  );
};

Articles.topMask = true;

export default Articles;

export const getStaticProps: GetStaticProps<
  ArticlesProps
> = async () => {
  const articleExcerpts = readAllArticleExcept();

  const tags =
    _.compact(
      _.uniq(
        articleExcerpts
          .map((post) => post.tags)
          .flatMap((tags) => tags)
      )
    ) ?? [];

  return {
    props: { articleExcerpts, tags },
  };
};
