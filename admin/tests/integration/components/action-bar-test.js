/* jshint expr:true */
import { expect } from "chai";
import { describeComponent, it } from "ember-mocha";
import hbs from "htmlbars-inline-precompile";

describeComponent("action-bar", "Integration: ActionBarComponent", { integration: true }, function () {
  it("renders", function () {
    // Set any properties with this.set("myProperty", "value");
    // Handle any actions with this.on("myAction", function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#action-bar}}
    //     template content
    //   {{/action-bar}}
    // `);

    this.render(hbs`{{action-bar for="posts"}}`);
    expect(this.$()).to.have.length(1);
  });
});
