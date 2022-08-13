import React from "react";
import { ArticleCard } from "../../../components";
import { NextPageWithLayout } from "../../_app";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  ArticleExcerpt,
  readAllArticleExcept,
} from "../../../resources";
import _ from "lodash";
import classNames from "classnames";

export interface TagProps {
  articles: ArticleExcerpt[];
}

export const Tag: NextPageWithLayout<TagProps> = ({ articles }) => {
  return (
    <div className="max-w-4xl px-10 flex min-w-full justify-center">
      <div className="flex flex-auto max-w-2xl">
        <div className="flex-none">
          <div className="mr-10 sticky top-40 align-top">
            <div className=" w-0.5 bg-black -left-0 top-80 bottom-1" />
          </div>
        </div>
        <div className={classNames("box-content", "flex-1")}>
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

Tag.topMask = true;

export default Tag;

export const getStaticProps: GetStaticProps<
  TagProps,
  { tag: string }
> = async ({ params }) => {
  if (!params) {
    return { props: { articles: [] } };
  }

  return {
    props: {
      articles: readAllArticleExcept(params.tag),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const articleExcerpts = readAllArticleExcept();

  const tags = _.compact(
    _.uniq(articleExcerpts.flatMap((post) => post.tags))
  ).map((tag) => ({ params: { tag } }));

  return {
    paths: tags,
    fallback: false,
  };
};
