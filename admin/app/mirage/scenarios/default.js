export default function (server) {
  // pages
  server.create("post", {
    name: "About",
    content: "<h1>About</h1>",
    type: "page",
    status: "draft"
  });

  server.create("post", {
    name: "Contact",
    content: "<h1>Contact</h1>",
    type: "page",
    status: "published"
  });

  server.create("post", {
    name: "Home",
    content: "<h1>Bonfire</h1>",
    type: "page",
    status: "published"
  });

  server.create("post", {
    name: "FAQ",
    content: "<h1>FAQ</h1>",
    type: "page",
    status: "published"
  });

  server.create("post", {
    name: "Privay policy",
    content: "<h1>Privacy policy</h1>",
    type: "page",
    status: "published"
  });

  server.create("post", {
    name: "Products",
    content: "<h1>Products</h1>",
    type: "page",
    status: "draft"
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
