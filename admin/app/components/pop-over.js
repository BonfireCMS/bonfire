import Ember from "ember";

export default Ember.Component.extend({
  tagName: "div",
  classNames: ["popover"],
  classNameBindings: ["pageType", "isShowing:show:hide"],
  pageType: Ember.computed("for", function () {
    const forType = this.get("for");

    return `popover_${forType}`;
  }),
  isShowing: Ember.computed.oneWay("parentView.popoverIsShowing")
});
