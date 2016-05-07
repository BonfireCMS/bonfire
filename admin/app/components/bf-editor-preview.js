import Ember from "ember";
import toHTML from "ember-cli-showdown/components/markdown-to-html";

export default toHTML.extend({
  extensions: [],

  init() {
    this._super(...arguments);

    this.get("parentController").set("markdownConverter", this.converter);
  },
  source: Ember.computed("markdown", function getSource() {
    return this.converter.makeHtml(this.get("markdown"));
  })
});
