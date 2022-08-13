import { remark } from "remark";
import html from "remark-html";
import { Compatible } from "vfile";
import gfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export async function markdownToHtml(markdown: Compatible) {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
}
