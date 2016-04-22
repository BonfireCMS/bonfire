export default function() {
  this.urlPrefix = "http://localhost:4200",
  this.namespace = "api/v1";

  this.get("/posts", function (db, request) {
    const posts = db.posts;

    return { posts };
  });
}
