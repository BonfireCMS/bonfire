import Ember from "ember";

export default Ember.Route.extend({
  model() {
    // this.transitionTo("pages.index_loading");
    return this.store.query("post", { type: "page" });
  },

  setupController(controller, model) {
    controller.set("pages", model);
  }
});
