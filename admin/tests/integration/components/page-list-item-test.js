/* jshint expr:true */
import { expect } from "chai";
import { describeComponent, it } from "ember-mocha";
import hbs from "htmlbars-inline-precompile";

describeComponent("page-list-item", "Integration: PageListItemComponent", { integration: true }, function () {
  it("renders", function () {
    // Set any properties with this.set("myProperty", "value");
    // Handle any actions with this.on("myAction", function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#page-list-item}}
    //     template content
    //   {{/page-list-item}}
    // `);

    this.render(hbs`{{page-list-item for="posts"}}`);
    expect(this.$()).to.have.length(1);
  });
});
