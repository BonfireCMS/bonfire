import Ember from "ember";

export default Ember.Controller.extend({
  postType: "page",
  showdown: Ember.inject.service(),
  showContent: true,
  showPreview: false,
  showSettings: false,

  actions: {
    savePage() {
      const markdown = this.get("markdown");
      const content = this.get("showdown").makeHtml(markdown);
      const page = this.get("page");
      const status = "draft";
      const title = this.get("title");
      const type = this.get("postType");

      page.setProperties({ content, markdown, status, title, type });

      page.save().then(() => {
        // TODO: need notifier
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
