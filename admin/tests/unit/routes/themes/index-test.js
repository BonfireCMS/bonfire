/* jshint expr:true */
import { expect } from "chai";
import { describeModule, it } from "ember-mocha";

describeModule("route:themes/index", "ThemesIndexRoute", { }, function () {
  it("exists", function () {
    const route = this.subject();

    expect(route).to.be.ok;
  });
});
