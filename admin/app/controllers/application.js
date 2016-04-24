import Ember from "ember";

export default Ember.Controller.extend({
  actions: {
    goTo(type, model) {
      if (model) {
        return this.transitionToRoute(type, model);
      }

      return this.transitionToRoute(type);
    }
  }
});
