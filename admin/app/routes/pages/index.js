import Ember from "ember";

export default Ember.Route.extend({
  model() {
    return this.store.query("post", { type: "page" });
  },

  setupController(controller, model) {
    controller.set("pages", model);
  },

  actions:{ newPage() { console.log("foo"); } }
});
