import Ember from "ember";

export default Ember.Component.extend({
  popoverIsShowing: false,
  tagName: "div",
  classNames: ["page-list__item"],
  actions: {
    toggleMenu(type) {
      this.toggleProperty("popoverIsShowing");
    }
  }
});
