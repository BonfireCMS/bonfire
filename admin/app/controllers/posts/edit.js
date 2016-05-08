import Ember from "ember";

export default Ember.Controller.extend({
  notify: Ember.inject.service(),
  showdown: Ember.inject.service(),
  showContent: true,
  showPreview: false,
  showSettings: false,

  actions: {
    savePost() {
      const showdown = this.get("showdown");
      const post = this.get("post");
      const markdown = post.get("markdown");

      post.set("content", showdown.makeHtml(markdown));

      post.save().then(() => {
        this.get("notify").success("Post updated!");
        post.reload();
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
