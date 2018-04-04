// @flow

import VoidType from "../VoidType";

describe("VoidType", () => {
  describe("arbitrary", () => {
    it("returns undefined", () => {
      const t = new VoidType();
      expect(t.arbitrary()).toBe(undefined);
    });
  });

  describe("check", () => {
    it("checks if target is undefined", () => {
      const t = new VoidType();
      expect(t.check(undefined)).toBe(true);
      expect(t.check("anything else")).toBe(false);
    });
  });
});
