import Ember from "ember";

export default Ember.Controller.extend({
  application: Ember.inject.controller(),
  globalActions: Ember.inject.service(),

  filteredPosts: Ember.computed("status", "posts", function () {
    const posts = this.get("posts");
    const status = this.get("status");

    return posts.filterBy("status", status);
  }),
  queryParams: ["status"],
  status: "published",

  actions: {
    updateFilter(type) {
      this.set("status", type);
    }
  }
});
