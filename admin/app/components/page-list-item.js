import Ember from "ember";

export default Ember.Component.extend({
  popoverIsShowing: false,
  tagName: "div",
  classNames: ["page-list__item"],
  globalActions: Ember.inject.service(),
  action: Ember.computed("globalActions.pageItem", function () {
    const forType = this.get("for");
    const pageItemActions = this.get("globalActions.pageItem");

    return pageItemActions[forType].action;
  }),
  actions: {
    toggleMenu() {
      const forType = this.get("for");
      // popover is open, so close it
      if (!!this.get("popoverIsShowing")) {
        this.set("popoverIsShowing", false);
        this.$(document).off("click");
      } else {
        this.set("popoverIsShowing", true);
        this.$(document).on("click", event => {
          const allowedClicks = ["popover__item", "icon", "page-list__item__action"];
          const target = event.target;
          const classList = target.classList;
          const isAllowed = allowedClicks.every(item => {
            return !classList.contains(item);
          });

          if (this.get("popoverIsShowing") && isAllowed) {
            this.set("popoverIsShowing", false);
          }
        });
        // popover is closed, open it and add the body listener
      }
    }
  },
  click() {
    const action = this.get("action");
    const forType = this.get("for");
    const pageItemActions = this.get("globalActions.pageItem");
    const data = pageItemActions[forType].data;
    const dataToSend = Object.keys(data).map(prop => {
      return this.get(data[prop].key);
    });

    this.sendAction(action, ...dataToSend);
  }
});
