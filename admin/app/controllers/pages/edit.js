import Ember from "ember";

export default Ember.Controller.extend({
  showContent: true,
  showPreview: false,
  showSettings: false,

  actions: {
    savePage() {
      const page = this.get("page");
      const markdown = page.get("markdown");

      page.set("content", /** showdown.makehtml(markdown) **/);
      page.save().then(() => {
      }).catch(err => {
        page.rollback();
      });
    },
    toggleEditorState(state) {
      const stateToProp = `show${state.capitalize()}`;
      const props = ["showContent", "showPreview", "showSettings"];

      props.forEach(this.resetProp.bind(this));

      this.toggleProperty(stateToProp);
    }
  },

  resetProp(prop) {
    this.set(prop, false);
  }
});
