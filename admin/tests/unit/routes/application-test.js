/* jshint expr:true */
import { expect } from "chai";
import { describeModule, it } from "ember-mocha";

describeModule("route:application", "ApplicationRoute", { }, function () {
  it("exists", function () {
    const route = this.subject();

    expect(route).to.be.ok;
  });
});
