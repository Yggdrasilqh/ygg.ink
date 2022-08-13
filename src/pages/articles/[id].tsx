import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import {
  Article,
  getArticleIds,
  readArticleById,
} from "../../resources";
import styles from "./markdown-styles.module.css";
import codeStyles from "./code-style.module.scss";

import { NextPageWithLayout } from "../_app";

export interface ArticlePageProps {
  article: Article;
}

export const ArticlePage: NextPageWithLayout<ArticlePageProps> = ({
  article,
}) => {
  const router = useRouter();
  const onBack = useCallback(() => {
    router.back();
  }, [router]);

  const [theme, setTheme] = useState(false);

  return (
    <div className="mx-8">
      {article.cover && (
        <div
          className={classNames(
            "h-96 max-w-4xl mx-auto relative mb-8"
          )}
        >
          <Image
            src={article.cover}
            layout="fill"
            objectFit="cover"
            alt="cover"
            objectPosition="top"
          />
        </div>
      )}
      <div className="max-w-2xl mx-auto">
        <div className="sticky top-32 h-0 w-fit z-10">
          <span
            className={classNames(
              "group",
              "relative",
              "cursor-pointer",
              "text-2xl",
              "-ml-40",
              "flex",
              "items-center"
            )}
            onClick={onBack}
          >
            <FontAwesomeIcon
              className={classNames(
                "mr-2",
                "group-hover:scale-90",
                "transition-transform",
                "origin-right"
              )}
              icon={faLeftLong}
            />
            <span
              className={classNames(
                "relative",
                "cursor-pointer",
                "group-hover:after:w-full",
                "after:content=[]",
                "after:h-0.5",
                "after:bg-primary",
                "after:absolute",
                "after:left-0",
                "after:w-0",
                "after:-bottom-1",
                "after:transition-all"
              )}
            >
              Go back
            </span>
          </span>
        </div>
        <h1 className="text-5xl mb-8">{article.title}</h1>
        <article
          className={classNames(
            "prose",
            "prose-lg",
            "max-w-none",
            styles["article"],
            theme
              ? codeStyles["gruvbox"]
              : codeStyles["gradient-dark"]
          )}
          onClick={() => {
            setTheme(!theme);
          }}
          dangerouslySetInnerHTML={{ __html: article.content }}
        ></article>
      </div>
    </div>
  );
};

ArticlePage.topMask = true;
ArticlePage.rememberScroll = true;

export default ArticlePage;

export const getStaticProps: GetStaticProps<
  ArticlePageProps,
  { id: string }
> = async ({ params }) => {
  if (!params) {
    // TODO: redirect to 404
    return { props: { article: undefined! } };
  }

  const article = await readArticleById(params.id);

  return {
    props: {
      article,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = getArticleIds();

  return {
    paths: ids.map((post) => {
      return {
        params: {
          id: post,
        },
      };
    }),
    fallback: false,
  };
};
