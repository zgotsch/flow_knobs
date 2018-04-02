// @flow

import NumberType from "../NumberType";

describe("NumberType", () => {
  describe("arbitrary", () => {
    it("creates a random number", () => {
      const t = new NumberType();
      expect(t.arbitrary()).toBe(42);
    });
  });
});
