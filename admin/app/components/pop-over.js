import Ember from "ember";

export default Ember.Component.extend({
  globalActions: Ember.inject.service(),
  tagName: "div",
  classNames: ["popover"],
  classNameBindings: ["pageType", "isShowing:show:hide"],
  pageType: Ember.computed("for", function getPageType() {
    const forType = this.get("for");

    return `popover_${forType}`;
  }),
  isShowing: Ember.computed.oneWay("parentView.popoverIsShowing"),
  actions: {
    triggerAction(type) {
      this.sendAction("triggerAction", type);
    }
  }
});
