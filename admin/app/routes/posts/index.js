import Ember from "ember";

export default Ember.Route.extend({
  model() {
    return this.store.findAll("post");
  },

  setupController(controller, model) {
    controller.set("posts", model);
  }
});
