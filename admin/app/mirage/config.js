export default function() {
  this.urlPrefix = window.location.origin;
  this.namespace = "api/v1";

  this.get("/posts", function (db, request) {
    let posts = db.posts;

    if (request.queryParams) {
      posts = posts.where(request.queryParams);
    }

    return { posts };
  });
}
