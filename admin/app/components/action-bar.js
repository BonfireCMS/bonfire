import Ember from "ember";

export default Ember.Component.extend({
  globalActions: Ember.inject.service(),
  actionBarActions: Ember.computed("globalActions", function actionBarActions() {
    const forType = this.get("for");
    const globalActions = this.get("globalActions");

    return globalActions[forType].actionBar;
  }),
  pageTitle: Ember.computed("globalActions", function getPageTitle() {
    const pageType = this.get("for");

    return this.get("globalActions")[pageType].pageTitle;
  }),
  tagName: "div",
  classNames: ["action-bar"],
  actions: {
    triggerAction(type) {
      this.sendAction(type);
    }
  }
});
