/* jshint expr:true */
import { expect } from "chai";
import { describeModule, it } from "ember-mocha";

describeModule("controller:pages/new", "PagesNewController", {}, function () {
  // Replace this with your real tests.
  it("exists", function () {
    const controller = this.subject();

    expect(controller).to.be.ok;
  });
});
