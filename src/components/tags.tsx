import classNames from "classnames";
import Link from "next/link";
import React, { FunctionComponent } from "react";

export interface TagListProps {
  tags: string[];
}

export const TagList: FunctionComponent<TagListProps> = ({ tags }) => {
  return (
    <>
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
                "after:h-0.5",
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
    </>
  );
};
