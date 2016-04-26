import Ember from "ember";

export default Ember.Component.extend({
  tagName: "div",
  classNames: ["page-filter"],
  activeFilter: null,
  draftIsActive: Ember.computed("activeFilter", function () {
    const activeFilter = this.get("activeFilter");

    if (activeFilter === "draft") {
      return "active"
    }
  }),
  publishedIsActive: Ember.computed("activeFilter", function () {
    const activeFilter = this.get("activeFilter");

    if (activeFilter === "published") {
      return "active"
    }
  }),
  searchBoxIsOpen: false,
  searchText: null,
  trashIsActive: Ember.computed("activeFilter", function () {
    const activeFilter = this.get("activeFilter");

    if (activeFilter === "trash") {
      return "active"
    }
  }),

  actions: {
    toggleSearchBox() {
      this.set("query", null);
      this.toggleProperty("searchBoxIsOpen");
      Ember.run.next(() => {
        this.$(".form__input_page-filter").focus();
      });
    },
    updateFilter(type) {
      this.set("activeFilter", type);
      this.sendAction("updateFilter", type);
    }
  }
});
