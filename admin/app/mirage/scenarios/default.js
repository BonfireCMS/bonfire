export default function (server) {
  // pages
  server.create("post", {
    name: "First page",
    content: "<h1>This is my first page</h1>",
    type: "page",
    status: "draft"
  });

  server.create("post", {
    name: "Second page",
    content: "<h1>This is my second page</h1>",
    type: "page",
    status: "published"
  });

  // posts
  server.create("post", {
    name: "First post",
    content: "<h1>This is my first post</h1>",
    type: "post",
    status: "published"
  });
  server.create("post", {
    name: "Second post",
    content: "<h1>This is my second post</h1>",
    type: "post",
    status: "published"
  });
  server.create("post", {
    name: "Third post",
    content: "<h1>This is my second post</h1>",
    type: "post",
    status: "draft"
  });
}
