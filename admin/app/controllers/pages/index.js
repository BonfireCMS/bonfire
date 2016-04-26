import Ember from "ember";

export default Ember.Controller.extend({
  application: Ember.inject.controller(),
  globalActions: Ember.inject.service(),
  queryParams: ["status"],
  searchText: null,
  status: "published",

  filteredPages: Ember.computed("pages", "searchText", "status", function () {
    const pages = this.get("pages");
    const searchText = this.get("searchText");
    const status = this.get("status");
    let filteredPages = pages.filterBy("status", status);

    if (searchText) {
      const regex = new RegExp(searchText, "i");

      filteredPages = filteredPages.filter(page => page.get("name").match(regex));
    }

    return filteredPages;
  }),

  actions: {
    updateFilter(type) {
      this.set("status", type);
    }
  }
});
