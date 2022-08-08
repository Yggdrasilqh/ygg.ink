import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FunctionComponent, useCallback } from "react";
import { getAllPosts, markdownToHtml, readPostById } from "../../utils";
import markdownStyles from "./markdown-styles.module.css";

export interface ArticleProps {
  post: any;
}

export const Article: FunctionComponent<ArticleProps> = ({ post }) => {
  const router = useRouter();
  const onBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="pt-32">
      {post.coverImage && (
        <div className={classNames("h-80 w-4/5 mx-auto relative mb-8")}>
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
        <div className="sticky top-20 h-0">
          <span className="cursor-pointer p-2 text-2xl -ml-40" onClick={onBack}>
            <FontAwesomeIcon className="mr-2" icon={faLeftLong} />
            Go back
          </span>
        </div>
        <h1 className="text-5xl">{post.title}</h1>
        <div
          className={markdownStyles["markdown"]}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
};

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
