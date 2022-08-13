---
title: "代码块测试"
excerpt: "代码高亮测试"
date: "2024-03-14 6:30"
author:
  name: Yggdrasil
tags:
  - typescript
  - swift
---

```typescript
export async function readArticleById(id: string): Promise<Article> {
  const path = `${id}.md`;
  const { data, content } = readArticle(
    Path.join(articleDirectory, path)
  );

  return {
    id: id,
    content: await markdownToHtml(content),
    ...(data.cover
      ? { cover: `${IMAGE_BASE_PATH}/${id}/${data.cover}` }
      : undefined),
    ..._.pick(data, ["title", "date  ", "author", "tags", "date"]),
  };
}
```

```swift
print("hello world");
```
