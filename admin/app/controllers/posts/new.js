import Ember from "ember";

export default Ember.Controller.extend({
  postType: "post",
  showdown: Ember.inject.service(),
  showContent: true,
  showPreview: false,
  showSettings: false,

  actions: {
    savePost() {
      const markdown = this.get("markdown");
      const content = this.get("showdown").makeHtml(markdown);
      const post = this.get("post");
      const title = this.get("title");

      post.setProperties({ content, markdown, title });

      post.save().then(() => {
        post.reload();
        // TODO: need notifier
      }).catch(err => {
        Ember.Logger.log(err);
        post.rollbackAttributes();
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
