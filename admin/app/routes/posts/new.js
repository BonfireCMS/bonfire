import Ember from "ember";

export default Ember.Route.extend({
  model() {
    return this.store.createRecord("post", { status: "draft", type: "post" });
  },

  setupController(controller, model) {
    controller.set("post", model);
  },

  actions: {
    willTransition(transition) {
      // TODO: prompt user to save if the model is dirty
      this.get("currentModel").destroyRecord();
      this._super(transition);
    }
  }
});
