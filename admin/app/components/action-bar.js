import Ember from "ember";

export default Ember.Component.extend({
  globalActions: Ember.inject.service(),
  actionBarActions: Ember.computed("globalActions", function actionBarActions() {
    const forType = this.get("for");
    const globalActions = this.get("globalActions");
    const actions = globalActions[forType].actionBar;

    actions.forEach(this.checkOrAddColor.bind(this));

    return actions;
  }),
  checkOrAddColor(item) {
    if (item.color) { return; }

    item.color = "blue";
  },
  pageTitle: Ember.computed("globalActions", function getPageTitle() {
    const pageType = this.get("for");

    return this.get("globalActions")[pageType].pageTitle;
  }),
  tagName: "div",
  classNames: ["action-bar"],
  actions: {
    toggleSideBar() {
      this.sendAction("toggleSideBar");
    },
    triggerAction(type) {
      this.sendAction(type);
    }
  }
});
