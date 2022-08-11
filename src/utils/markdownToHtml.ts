import { remark } from "remark";
import html from "remark-html";
import { Compatible } from "vfile";
import gfm from "remark-gfm";

export async function markdownToHtml(markdown: Compatible) {
  const result = await remark().use(gfm).use(html).process(markdown);
  return result.toString();
}
