import Ember from "ember";

export default Ember.Controller.extend({
  application: Ember.inject.controller(),
  globalActions: Ember.inject.service(),

  filteredPages: Ember.computed("status", "pages", function () {
    const pages = this.get("pages");
    const status = this.get("status");

    return pages.filterBy("status", status);
  }),
  queryParams: ["status"],
  status: "published",

  actions: {
    updateFilter(type) {
      this.set("status", type);
    }
  }
});
