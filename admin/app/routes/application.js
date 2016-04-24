import Ember from "ember";

export default Ember.Route.extend({
  actions: {
    goTo(type, model) {
      if (model) {
        return this.transitionTo(type, model);
      }

      return this.transitionTo(type);
    }
  }
});
