import Ember from "ember";

export default Ember.Route.extend({
  model() {
    return this.store.createRecord("post");
  },

  setupController(controller, model) {
    controller.set("page", model);
  }
});
