/* jshint expr:true */
import { expect } from "chai";
import { describeModule, it } from "ember-mocha";

describeModule("adapter:application", "Unit | Adapter | application", {}, function () {
  it("exists", function () {
    const adapter = this.subject();

    expect(adapter).to.be.ok;
  });
});
