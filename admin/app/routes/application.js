import Ember from "ember";

export default Ember.Route.extend({
  actions: {
    goTo(type, model) {
      if (model) {
        return this.transitionTo(type, model);
      }

      return this.transitionTo(type);
    },
    editPage(id) {
      return this.send("goTo", "pages.edit", id);
    },
    newPage() {
      this.send("goTo", "pages.new");
    },
    editPost(id) {
      this.send("goTo", "posts.edit", id);
    },
    newPost() {
      this.send("goTo", "posts.new");
    }
  },
});
