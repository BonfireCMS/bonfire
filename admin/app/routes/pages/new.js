import Ember from "ember";

export default Ember.Route.extend({
  model() {
    return this.store.createRecord("post", { status: "draft", type: "page" });
  },

  setupController(controller, model) {
    controller.set("page", model);
  },

  actions: {
    willTransition(transition) {
      // TODO: prompt user to save if the model is dirty
      const markdown = null;
      const page = this.get("currentModel");
      const title = null;

      if (page.get("isNew")) {
        // the new page was never saved so we'll destroy it and reset the properties
        page.destroyRecord();
      }
      this.controller.setProperties({ markdown, title });
      this._super(transition);
    }
  }
});
