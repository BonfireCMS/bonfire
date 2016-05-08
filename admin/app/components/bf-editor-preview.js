import Ember from "ember";

export default Ember.Component.extend({
  extensions: [],
  showdown: Ember.inject.service(),
  init() {
    this._super(...arguments);

    this.converter = this.get("showdown");
  },

  html: Ember.computed("markdown", function convertToHtml() {
    const markdown = this.get("markdown");
    const showdown = this.get("showdown");
    const toHTML = showdown.makeHtml(markdown);

    return Ember.String.htmlSafe(toHTML);
  }),

  source: Ember.computed("markdown", function getSource() {
    return this.converter.makeHtml(this.get("markdown"));
  })
});
