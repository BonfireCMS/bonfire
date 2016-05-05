import Ember from "ember";

export default Ember.Component.extend({
  tagName: "div",
  classNames: ["bf-editor-bar"],

  actions: {
    toggleEditorState(state) {
      this.attrs.toggleEditorState(state);
    }
  }
});
