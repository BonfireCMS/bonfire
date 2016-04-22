export default function(server) {
  server.create("post", {
    name: "First post",
    content: "<h1>This is my first post</h1>"
  });
}
