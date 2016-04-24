import Ember from "ember";

export default Ember.Controller.extend({
  globalActions: Ember.inject.service(),
  pageActionItems: Ember.computed("globalActions", function (actions) {
    const globalActions = this.get("globalActions");
    return globalActions.get("pageListItem");
  }),
  actions: {
    toggleMenu(type) {
      this.toggleProperty("popoverIsShowing");
    }
  }
});
