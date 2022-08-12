import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { getAllPosts, markdownToHtml, readPostById } from "../../utils";
import { NextPageWithLayout } from "../_app";

export interface ArticleProps {
  post: any;
}

export const Article: NextPageWithLayout<ArticleProps> = ({ post }) => {
  const router = useRouter();
  const onBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="mx-8">
      {post.coverImage && (
        <div className={classNames("h-96 max-w-4xl mx-auto relative mb-8")}>
          <Image
            src={post.coverImage}
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
        <h1 className="text-5xl">{post.title}</h1>
        <article
          className={classNames("prose", "prose-lg", "max-w-none")}
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></article>
      </div>
    </div>
  );
};

Article.topMask = true;
Article.rememberScroll = true;

export default Article;

export async function getStaticProps({ params }: { params: { id: string } }) {
  const post = readPostById(params.id, [
    "title",
    "date",
    "author",
    "content",
    "ogImage",
    "coverImage",
    "tags",
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
  const posts = getAllPosts();

  return {
    paths: posts.map((post) => {
      return {
        params: {
          id: post.id,
        },
      };
    }),
    fallback: false,
  };
}
