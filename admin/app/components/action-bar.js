import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "div",
  classNames: ["action-bar"],
  actions: {
    goTo() {
      const actionArgs = JSON.parse(this.get("actionArgs"));

      this.sendAction("goTo", ...actionArgs);
    }
  }
});
