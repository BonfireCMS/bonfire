import Ember from "ember";

export default Ember.Route.extend({
  model() {
    return this.store.query("post", { type: "post" });
  },

  setupController(controller, model) {
    controller.set("posts", model);
  }
});
