// @flow

import NullType from "../NullType";

describe("NullType", () => {
  describe("arbitrary", () => {
    it("returns null", () => {
      const t = new NullType();
      expect(t.arbitrary()).toBe(null);
    });
  });
});
