export default function() {
  this.urlPrefix = window.location.origin + "/bonfire/api/v1";

  this.get("/posts", function (db, req) {
    return {
      posts: [{
        id: 1,
        title: "foo"
      }]
    };
  });
}
