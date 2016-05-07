import Ember from "ember";

export default Ember.Controller.extend({
  showdown: Ember.inject.service(),
  showContent: true,
  showPreview: false,
  showSettings: false,

  actions: {
    savePage() {
      const showdown = this.get("showdown");
      const page = this.get("page");
      const markdown = page.get("markdown");

      page.set("content", showdown.makeHtml(markdown));

      page.save().then(() => {
      }).catch(err => {
        Ember.Logger.log(err);
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
