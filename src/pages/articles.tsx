import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import React, { FunctionComponent } from "react";
import { Article, getAllPosts } from "../utils";

export interface ArticlesProps {
  allPosts: Article[];
}

export const Articles: FunctionComponent<ArticlesProps> = ({ allPosts }) => {
  return (
    <div className="max-w-2xl mx-auto pt-2">
      {allPosts.map((post) => (
        <Link key={post.title} href={`/articles/${post.slug}`}>
          <section className="block cursor-pointer mt-12 hover:opacity-80 transition-opacity">
            {post.coverImage && (
              <div className={classNames("mb-2")}>
                <Image
                  src={post.coverImage}
                  alt="cover"
                  width="400"
                  height="100"
                  layout="responsive"
                  objectFit="cover"
                />
              </div>
            )}
            <h2 className="text-4xl pb-2">{post.title}</h2>
            <div>{post.excerpt}</div>
          </section>
        </Link>
      ))}
    </div>
  );
};

export default Articles;

export async function getStaticProps() {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
}
