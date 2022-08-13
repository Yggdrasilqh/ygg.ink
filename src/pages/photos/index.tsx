import classNames from "classnames";
import path, { join } from "path";
import React, {
  FunctionComponent,
  memo,
  useCallback,
  useState,
} from "react";
import { NextPageWithLayout } from "../_app";
import fs from "fs";
import _ from "lodash";
import Image from "next/image";
import { GetStaticProps } from "next";

export interface PhotosPageProps {
  photos: Record<string, string[]>;
}

export const PhotosPage: NextPageWithLayout<PhotosPageProps> = ({
  photos,
}) => {
  const [picked, setPicked] = useState<string>();
  const dismissPreview = useCallback(() => {
    setPicked(undefined);
  }, []);

  return (
    <>
      <Preview preview={picked} dismiss={dismissPreview} />
      <MemoPhotoList photos={photos} setPicked={setPicked} />
    </>
  );
};

interface PreviewProps {
  preview: string | undefined;
  dismiss(): void;
}

const Preview: FunctionComponent<PreviewProps> = ({
  preview,
  dismiss,
}) => {
  return (
    <>
      {preview && (
        <div
          className="flex justify-center items-center fixed w-full h-full z-50 top-0 left-0 right-0 bottom-0"
          onClick={dismiss}
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
                src={preview}
                layout="fill"
                objectFit="contain"
                alt={preview}
                objectPosition="center"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

interface PhotoListProps {
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
          {dir !== "root" && (
            <h1 className="text-6xl mb-4 mt-12">{dir}</h1>
          )}
          <div className={classNames("flex flex-wrap gap-6")}>
            {photos[dir].map((photo) => {
              const imagePath = `/assets/photos/${
                dir === "root" ? "" : `${dir}/`
              }${photo}`;

              return (
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
                    setPicked(imagePath);
                  }}
                >
                  <Image
                    src={imagePath}
                    layout="fill"
                    objectFit="cover"
                    alt={photo}
                    objectPosition="center"
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
};

const MemoPhotoList = memo(PhotoList);

PhotosPage.topMask = true;

export default PhotosPage;

export const getStaticProps: GetStaticProps<
  PhotosPageProps
> = async () => {
  const photosDict = join(process.cwd(), "public/assets/photos");

  if (!fs.existsSync(photosDict)) {
    return { props: { photos: {} } };
  }

  const files = fs
    .readdirSync(photosDict, { withFileTypes: true })
    .filter((file) => !file.name.startsWith("."));

  const photoGroupToPhotosDict: Record<string, string[]> = {
    root: [],
  };

  for (const file of files) {
    if (file.isDirectory()) {
      photoGroupToPhotosDict[file.name] = fs.readdirSync(
        path.join(photosDict, file.name)
      );
    } else {
      photoGroupToPhotosDict["root"].push(file.name);
    }
  }

  return { props: { photos: photoGroupToPhotosDict } };
};
