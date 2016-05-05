import Ember from "ember";

export default Ember.Controller.extend({
  showContent: true,
  showPreview: false,
  showSettings: false,

  actions: {
    toggleEditorState(state) {
      const stateToProp = `show${state.capitalize()}`;
      console.log(stateToProp);
      const props = ["showContent", "showPreview", "showSettings"];

      props.forEach(this.resetProp.bind(this));

      this.toggleProperty(stateToProp);
    }
  },

  resetProp(prop) {
    this.set(prop, false);
  }
});
