// @flow

import VoidType from "../VoidType";

describe("VoidType", () => {
  describe("arbitrary", () => {
    it("returns undefined", () => {
      const t = new VoidType();
      expect(t.arbitrary()).toBe(undefined);
    });
  });
});
