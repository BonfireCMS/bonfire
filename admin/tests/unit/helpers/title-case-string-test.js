/* jshint expr:true */
import { expect } from "chai";
import { describe, it } from "mocha";
import { titleCaseString } from "bonfire/helpers/title-case-string";

describe("TitleCaseStringHelper", function () {
  // Replace this with your real tests.
  it("works", function () {
    const result = titleCaseString(42);

    expect(result).to.be.ok;
  });
});
