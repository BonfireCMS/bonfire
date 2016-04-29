/* jshint expr:true */
import { expect } from "chai";
import { describeModel, it } from "ember-mocha";

describeModel("setting", "Unit | Model | setting", { needs: [] }, function () {
  // Replace this with your real tests.
  it("exists", function () {
    const model = this.subject();

    // var store = this.store();
    expect(model).to.be.ok;
  });
});
