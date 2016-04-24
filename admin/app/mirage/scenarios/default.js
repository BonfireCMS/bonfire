export default function(server) {
  server.create("post", {
    name: "First post",
    content: "<h1>This is my first post</h1>",
    type:"post",
    status: "published"
  });

  server.create("post", {
    name: "First page",
    content: "<h1>This is my first page</h1>",
    type: "page",
    status: "draft"
  });
}
