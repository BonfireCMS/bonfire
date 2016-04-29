import Ember from "ember";

export default Ember.Controller.extend({
  application: Ember.inject.controller(),
  globalActions: Ember.inject.service(),
  queryParams: ["status"],
  searchText: null,
  status: "published",

  filteredPosts: Ember.computed("posts", "searchText", "status", function getFilteredPosts() {
    const posts = this.get("posts");
    const searchText = this.get("searchText");
    const status = this.get("status");
    let filteredPosts = posts.filterBy("status", status);

    if (searchText) {
      const regex = new RegExp(searchText, "i");

      filteredPosts = filteredPosts.filter(post => post.get("name").match(regex));
    }

    return filteredPosts;
  }),

  actions: {
    updateFilter(type) {
      this.set("status", type);
    }
  }
});
