export default function () {
  this.urlPrefix = window.location.origin;
  this.namespace = "api/v1";

  this.get("/posts", (db, request) => {
    let posts = db.posts;

    if (request.queryParams) {
      posts = posts.where(request.queryParams);
    }

    return { posts };
  });

  this.get("/posts/:id", (db, request) => {
    const post = db.posts.find(request.params.id);

    return { post };
  });

  this.put("/posts/:id", (db, request) => {
    const post = db.posts.update(request.params.id, JSON.parse(request.requestBody).post);

    return { post };
  });

  this.post("/posts", (db, request) => {
    const payload = JSON.parse(request.requestBody).post;

    payload.name = payload.title.toLowerCase().dasherize();

    const post = db.posts.insert(payload);

    return { post };
  });
}
