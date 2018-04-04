// @flow

import LiteralType from "../LiteralType";

describe("VoidType", () => {
  describe("arbitrary", () => {
    it("returns the wrapped literal", () => {
      const booleanLiteral = new LiteralType(true);
      expect(booleanLiteral.arbitrary()).toBe(true);

      const stringLiteral = new LiteralType("zach");
      expect(stringLiteral.arbitrary()).toBe("zach");
    });
  });

  describe("check", () => {
    it("ensures that the target equals the literal", () => {
      const trueType = new LiteralType(true);

      expect(trueType.check(true)).toBe(true);
      expect(trueType.check(false)).toBe(false);
      expect(trueType.check("anything else")).toBe(false);
    });
  });
});
