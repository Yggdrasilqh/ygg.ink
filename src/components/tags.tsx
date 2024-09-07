import classNames from "classnames";
import Link from "next/link";
import React, { FunctionComponent } from "react";

export interface TagListProps {
  tags: string[];
}

export const TagList: FunctionComponent<TagListProps> = ({
  tags,
}) => {
  return (
    <>
      {tags.map((tag) => (
        <div
          key={tag}
          className="flex items-center mb-1.5 overflow-hidden"
        >
          <span className="mr-1">-</span>
          <Link className="min-w-0" href={`/articles/tags/${tag}`}>
            <div
              className={classNames(
                "flex",
                "min-w-0",
                "relative",
                "cursor-pointer",
                "hover:after:w-full",
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
              <span
                className={classNames(
                  "whitespace-nowrap",
                  "overflow-x-hidden",
                  "text-ellipsis"
                )}
              >
                {tag}
                {tag}
                {tag}
                {tag}
                {tag}
              </span>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};
