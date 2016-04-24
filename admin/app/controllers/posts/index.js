import Ember from "ember";

export default Ember.Controller.extend({
  application: Ember.inject.controller(),
  globalActions: Ember.inject.service(),
  actions: {
    newPost() {
      this.get("application").send("goTo", "posts.new");
    }
  }
});
