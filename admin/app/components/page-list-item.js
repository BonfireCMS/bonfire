import Ember from "ember";

export default Ember.Component.extend({
  popoverIsShowing: false,
  tagName: "div",
  classNames: ["page-list__item"],
  globalActions: Ember.inject.service(),
  pageItemActions: Ember.computed("globalActions", function pageItemActions() {
    const forType = this.get("for");
    const globalActions = this.get("globalActions");

    return globalActions[forType].pageItem;
  }),
  action: Ember.computed("globalActions", function action() {
    const forType = this.get("for");
    const globalActions = this.get("globalActions");

    return globalActions[forType].pageItem.action;
  }),

  actions: {
    toggleMenu() {
      const isShowing = !!this.get("popoverIsShowing");

      // popover is open, so close it
      if (isShowing) {
        this.set("popoverIsShowing", false);
        this.$(document).off("click");
      } else {
        // popover is closed, open it and add the body listener
        this.set("popoverIsShowing", true);
        this.$(document).on("click", event => {
          const allowedClicks = ["popover__item", "icon", "page-list__item__action"];
          const target = event.target;
          const classList = target.classList;
          const isAllowed = allowedClicks.every(item => !classList.contains(item));

          if (this.get("popoverIsShowing") && isAllowed) {
            this.set("popoverIsShowing", false);
          }
        });
      }
    },
    triggerAction(type) {
      this.sendAction(type, this.get("post.id"));
    }
  },

  click(e) {
    const action = this.get("action");
    const target = e.target;
    const isClickable = ["page-list__item__action", "icon", "popover__item"].every(item =>
      !target.classList.contains(item)
    );

    if (!isClickable) {
      return;
    }

    this.sendAction(action, this.get("post.id"));
  },

  willDestroyElement() {
    this.$(document).off("click");
  }
});
