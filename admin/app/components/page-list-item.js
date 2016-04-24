import Ember from "ember";
const inflector = new Ember.Inflector(Ember.Inflector.defaultRules);

export default Ember.Component.extend({
  popoverIsShowing: false,
  tagName: "div",
  classNames: ["page-list__item"],
  globalActions: Ember.inject.service(),
  pageItemActions: Ember.computed("globalActions", function () {
    const forType = this.get("for");
    const globalActions = this.get("globalActions");

    return globalActions[forType].pageItem;
  }),
  action: Ember.computed("globalActions", function () {
    const forType = this.get("for");
    const globalActions = this.get("globalActions");

    return globalActions[forType].pageItem.action;
  }),

  actions: {
    toggleMenu() {
      // popover is open, so close it
      if (!!this.get("popoverIsShowing")) {
        this.set("popoverIsShowing", false);
        this.$(document).off("click");
      } else {
        // popover is closed, open it and add the body listener
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
      }
    },
    triggerAction(type) {
      this.sendAction(type, this.get("post.id"));
    }
  },

  click(e) {
    const action = this.get("action");
    const target = e.target;
    const isClickable = ["page-list__item__action", "icon", "popover__item"].every(item => {
      return !target.classList.contains(item);
    });

    if (!isClickable) {
      return;
    }


    this.sendAction(action, this.get("post.id"));
  },

  willDestroyElement() {
    this.$(document).off("click");
  }
});
