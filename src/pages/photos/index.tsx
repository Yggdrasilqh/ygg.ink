import classNames from "classnames";
import path, { join } from "path";
import React, { FunctionComponent, memo, useState } from "react";
import { NextPageWithLayout } from "../_app";
import fs from "fs";
import _ from "lodash";
import Image from "next/image";

export interface PhotosProps {
  photos: Record<string, string[]>;
}

export const Photos: NextPageWithLayout<PhotosProps> = ({ photos }) => {
  const [picked, setPicked] = useState<string>();

  return (
    <>
      {picked && (
        <div
          className="flex justify-center items-center fixed w-full h-full z-50 top-0 left-0 right-0 bottom-0"
          onClick={() => {
            setPicked(undefined);
          }}
        >
          <div className="absolute w-full h-full bg-opacity-60 backdrop-blur-sm bg-black top-0 left-0 right-0 bottom-0" />
          <div
            className="absolute top-0 bottom-0 left-0 right-0 m-auto"
            style={{
              maxWidth: "90%",
              height: "90%",
            }}
          >
            <div className="relative h-full">
              <Image
                src={`/assets/photos/${picked}`}
                layout="fill"
                objectFit="contain"
                alt={picked}
                objectPosition="center"
              />
            </div>
          </div>
        </div>
      )}
      <MemoPhotoList photos={photos} setPicked={setPicked} />
    </>
  );
};

export interface PhotoListProps {
  photos: Record<string, string[]>;
  setPicked: (photo: string) => void;
}

const PhotoList: FunctionComponent<PhotoListProps> = ({
  photos,
  setPicked,
}) => {
  return (
    <>
      {Object.keys(photos).map((dir) => (
        <div key={dir} className="px-20 ">
          <h1 className="text-6xl mb-4">{dir}</h1>
          <div className={classNames("flex flex-wrap gap-10")}>
            {photos[dir].map((photo) => (
              <div
                key={photo}
                className="bg-purple-600 relative"
                style={{
                  minWidth: _.random(200, 600, false),
                  height: 400,
                  width: "auto",
                  flexGrow: 1,
                  fontSize: 60,
                }}
                onClick={() => {
                  setPicked(photo);
                }}
              >
                <Image
                  src={`/assets/photos/${
                    dir === "root" ? "" : `${dir}/`
                  }${photo}`}
                  layout="fill"
                  objectFit="cover"
                  alt={photo}
                  objectPosition="center"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

const MemoPhotoList = memo(PhotoList);

Photos.topMask = true;

export default Photos;

export async function getStaticProps() {
  const photosDict = join(process.cwd(), "public/assets/photos");

  if (!fs.existsSync(photosDict)) {
    return;
  }

  const files = fs
    .readdirSync(photosDict, { withFileTypes: true })
    .filter((file) => !file.name.startsWith("."));

  const map: any = { root: [] };

  for (const file of files) {
    if (file.isDirectory()) {
      map[file.name] = fs.readdirSync(path.join(photosDict, file.name));
    } else {
      map["root"].push(file.name);
    }
  }

  console.log(map);

  return { props: { photos: map } };
}
