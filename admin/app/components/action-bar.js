import Ember from "ember";

export default Ember.Component.extend({
  globalActions: Ember.inject.service(),
  actionBarActions: Ember.computed("globalActions", function actionBarActions() {
    const forType = this.get("for");
    const globalActions = this.get("globalActions");

    return globalActions[forType].actionBar;
  }),
  tagName: "div",
  classNames: ["action-bar"],
  actions: {
    triggerAction(type) {
      this.sendAction(type);
    }
  }
});
