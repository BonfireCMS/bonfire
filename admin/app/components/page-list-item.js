import Ember from "ember";

export default Ember.Component.extend({
  popoverIsShowing: false,
  tagName: "div",
  classNames: ["post-list__item", "post"],
  globalActions: Ember.inject.service(),
  postItemActions: Ember.computed("globalActions", function postItemActions() {
    const forType = this.get("for");
    const globalActions = this.get("globalActions");

    return globalActions[forType].postItem;
  }),
  action: Ember.computed("globalActions", function action() {
    const forType = this.get("for");
    const globalActions = this.get("globalActions");

    return globalActions[forType].postItem.action;
  }),
  singularFor: Ember.computed("for", function () {
    return this.get("for").singularize();
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
          const allowedClicks = ["popover__item", "icon", "post__action"];
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
      this.set("popoverIsShowing", false);
      this.sendAction(type, this.get("post.id"));
    }
  },

  click(e) {
    const action = this.get("action");
    const target = e.target;
    const isClickable = ["post__action", "icon", "popover__item"].every(item =>
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
