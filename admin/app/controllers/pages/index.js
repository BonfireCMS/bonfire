import Ember from "ember";

export default Ember.Controller.extend({
  application: Ember.inject.controller(),
  globalActions: Ember.inject.service(),
  pageActionItems: Ember.computed("globalActions", function (actions) {
    const globalActions = this.get("globalActions");
    return globalActions.get("pageListItem");
  }),
  actions: {
    newPage() {
      this.get("application").send("goTo", "pages.new");
    },
    toggleMenu(type) {
      this.toggleProperty("popoverIsShowing");
    }
  }
});
