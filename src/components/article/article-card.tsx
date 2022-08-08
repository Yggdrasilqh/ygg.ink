import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";
import React, { FunctionComponent } from "react";
import { ArticleExcerpt } from "../../utils";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";

export interface ArticleCardProps {
  article: ArticleExcerpt;
}

export interface DashProps {
  className: string;
}

export const Dash: FunctionComponent<DashProps> = ({ className }) => {
  return (
    <div className={classNames(className)}>
      <div className={classNames("h-3", "w-1", "bg-primary")} />
      <div className={classNames("h-1", "w-4", "bg-primary")} />
    </div>
  );
};

export const ArticleCard: FunctionComponent<ArticleCardProps> = ({
  article,
}) => {
  return (
    <Link href={`/articles/${article.id}`}>
      <section className="group h-fit block cursor-pointer mb-20">
        {article.coverImage && (
          <div
            className={classNames(
              "mb-4",
              "h-60",
              "bg-primary",
              "group-hover:opacity-90",
              "transition-opacity",
              "relative"
            )}
          >
            <Image
              src={article.coverImage}
              alt="cover"
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
        <h2
          className={classNames(
            "title text-4xl transition-opacity",
            "mb-2",
            "leading-none",
            "relative",
            "w-fit"
          )}
        >
          {article.title}
          <Dash className="group-hover:opacity-100 absolute -left-2 -bottom-2 opacity-0" />
          <Dash className="group-hover:opacity-100 absolute -right-2 -top-1.5 rotate-180 opacity-0" />
        </h2>
        <div className="excerpt text-gray-500 group-hover:opacity-80 transition-opacity">
          {article.excerpt}
        </div>
        <div className="flex mt-2 text-gray-400">
          <span className="">{article.author?.name},</span>
          <span className="ml-2">
            <FontAwesomeIcon className="mr-1" icon={faCalendar} />
            {new Date(article.date).toLocaleString()}
          </span>
          <span className="ml-auto">
            {article.tags?.length && (
              <>
                <FontAwesomeIcon className="text-sm" icon={faHashtag} />{" "}
                {article.tags.map((tag, index) => (
                  <span key={tag}>
                    <span className={classNames("hover:underline")}>{tag}</span>
                    {index !== article.tags!.length - 1 ? ", " : ""}
                  </span>
                ))}
              </>
            )}
          </span>
        </div>
      </section>
    </Link>
  );
};
