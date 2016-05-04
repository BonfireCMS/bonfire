import Ember from "ember";

export default Ember.Component.extend({
  tagName: "div",
  classNames: ["page-filter"],
  activeFilter: null,
  draftIsActive: Ember.computed("activeFilter", function drafIsActive() {
    const activeFilter = this.get("activeFilter");

    if (activeFilter === "draft") {
      return "active";
    }
  }),
  publishedIsActive: Ember.computed("activeFilter", function publishedIsActive() {
    const activeFilter = this.get("activeFilter");

    if (activeFilter === "published") {
      return "active";
    }
  }),
  searchBoxIsOpen: false,
  searchText: null,
  trashIsActive: Ember.computed("activeFilter", function trashIsActive() {
    const activeFilter = this.get("activeFilter");

    if (activeFilter === "trash") {
      return "active";
    }
  }),

  escapeListener(event) {
    const ESCAPE = 27;
    const props = ["keyCode", "which"];
    const isEscape = props.some(prop => event[prop] === ESCAPE);

    if (isEscape) { this.set("searchBoxIsOpen", false); }
    Ember.$(document).off("keyup");
  },

  actions: {
    toggleSearchBox() {
      this.set("searchText", null);
      this.toggleProperty("searchBoxIsOpen");
      Ember.run.next(() => {
        this.$(".page-filter__input").focus();

        if (this.get("searchBoxIsOpen")) {
          Ember.$(document).on("keyup", this.escapeListener.bind(this));
        }
      });
    },
    updateFilter(type) {
      this.set("activeFilter", type);
      this.sendAction("updateFilter", type);
    }
  }
});
