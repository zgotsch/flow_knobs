// @flow

import NullType from "../NullType";

describe("NullType", () => {
  describe("arbitrary", () => {
    it("returns null", () => {
      const t = new NullType();
      expect(t.arbitrary()).toBe(null);
    });
  });

  describe("check", () => {
    it("checks if target is null", () => {
      const t = new NullType();
      expect(t.check(null)).toBe(true);
      expect(t.check("anything else")).toBe(false);
    });
  });
});
