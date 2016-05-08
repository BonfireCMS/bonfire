import Ember from "ember";

export default Ember.Controller.extend({
  notify: Ember.inject.service(),
  showdown: Ember.inject.service(),
  showContent: true,
  showPreview: false,
  showSettings: false,

  actions: {
    savePage() {
      const markdown = this.get("markdown");
      const content = this.get("showdown").makeHtml(markdown);
      const page = this.get("page");
      const title = this.get("title");

      page.setProperties({ content, markdown, title });

      page.save().then(() => {
        this.get("notify").success("Page saved!");
        page.reload();
      }).catch(err => {
        Ember.Logger.log(err);
        page.rollbackAttributes();
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
