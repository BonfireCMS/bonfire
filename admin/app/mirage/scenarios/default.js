export default function (server) {
  // pages
  server.create("post", {
    title: "About",
    name: "about",
    content: "<h1>About</h1>",
    markdown: "# About",
    type: "page",
    route: "/about",
    status: "draft"
  });

  server.create("post", {
    title: "Contact",
    name: "contact",
    content: "<h1>Contact</h1>",
    markdown: "# Contact",
    type: "page",
    route: "/contact",
    status: "published"
  });

  server.create("post", {
    title: "Home",
    name: "home",
    content: "<h1>Bonfire</h1>",
    markdown: "# Home",
    type: "page",
    route: "/",
    status: "published"
  });

  server.create("post", {
    title: "FAQ",
    name: "faq",
    content: "<h1>FAQ</h1>",
    markdown: "# FAQ",
    type: "page",
    route: "/faq",
    status: "published"
  });

  server.create("post", {
    title: "Privay policy",
    name: "privay-policy",
    content: "<h1>Privacy policy</h1>",
    markdown: "# Privay policy",
    type: "page",
    route: "/privacy-policy",
    status: "published"
  });

  server.create("post", {
    title: "Products",
    name: "products",
    content: "<h1>Products</h1>",
    markdown: "# Products",
    type: "page",
    route: "/products",
    status: "draft"
  });

  // posts
  server.create("post", {
    title: "First post",
    name: "first-post",
    content: "<h1>This is my first post</h1>",
    markdown: "# This is my first post",
    type: "post",
    route: "/first-post",
    status: "published"
  });

  server.create("post", {
    title: "Second post",
    name: "second-post",
    content: "<h1>This is my second post</h1>",
    markdown: "# This is my second post",
    type: "post",
    route: "/second-post",
    status: "published"
  });

  server.create("post", {
    title: "Third post",
    name: "third-post",
    content: "<h1>This is my second post</h1>",
    markdown: "# This is my second post",
    type: "post",
    route: "/third-post",
    status: "draft"
  });
}
