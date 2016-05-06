import Ember from "ember";
import toHTML from "ember-cli-showdown/components/markdown-to-html";

export default toHTML.extend({
  source: Ember.computed("markdown", function () {
    return this.converter.makeHtml(this.get("markdown"));
  })
});
