import Ember from "ember";

export default Ember.Controller.extend({
  actions: {
    goTo(type, model) {
      model = model || null;
      this.transitionTo(type, model);
    }
  }
});
