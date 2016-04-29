/* jshint expr:true */
import { expect } from "chai";
import { describeModule, it } from "ember-mocha";

describeModule("route:pages/show", "PagesShowRoute", { }, function () {
  it("exists", function () {
    const route = this.subject();

    expect(route).to.be.ok;
  });
});
