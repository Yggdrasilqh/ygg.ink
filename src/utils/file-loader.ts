import FS from "fs";
import matter from "gray-matter";
import Path from "path";

export function readDirPaths(dir: string) {
  if (!FS.lstatSync(dir).isDirectory()) {
    throw new Error(`"${dir}" is not a directory`);
  }

  if (!FS.existsSync(dir)) {
    return [];
  }

  return FS.readdirSync(dir);
}

export function readFile(path: string) {
  return FS.readFileSync(path, "utf8");
}

export function matterFile(content: string) {
  return matter(content);
}

export function parsePureFileName(path: string) {
  return Path.parse(path).name;
}
