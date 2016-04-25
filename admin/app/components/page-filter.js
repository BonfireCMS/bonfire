import Ember from "ember";

export default Ember.Component.extend({
  activeFilter: null,
  publishedIsActive: Ember.computed("activeFilter", function () {
    const activeFilter = this.get("activeFilter");

    if (activeFilter === "published") {
      return "active"
    }
  }),
  draftIsActive: Ember.computed("activeFilter", function () {
    const activeFilter = this.get("activeFilter");

    if (activeFilter === "draft") {
      return "active"
    }
  }),
  trashIsActive: Ember.computed("activeFilter", function () {
    const activeFilter = this.get("activeFilter");

    if (activeFilter === "trash") {
      return "active"
    }
  }),
  tagName: "div",
  classNames: ["page-filter"],
  actions: {
    updateFilter(type) {
      this.set("activeFilter", type);
      this.sendAction("updateFilter", type);
    }
  }
});
