/* jshint expr:true */
import { expect } from "chai";
import { describeModule, it } from "ember-mocha";

describeModule("controller:pages/edit", "PagesEditController", {}, function () {
  it("exists", function () {
    const controller = this.subject();

    expect(controller).to.be.ok;
  });
});
