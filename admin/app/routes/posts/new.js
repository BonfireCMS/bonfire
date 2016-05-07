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
      const markdown = null;
      const post = this.get("currentModel");
      const title = null;

      if (post.get("isNew")) {
        // the new post was never saved so we'll destroy it and reset the properties
        post.destroyRecord();
        this.controller.setProperties({ markdown, title });
      }
      this._super(transition);
    }
  }
});
