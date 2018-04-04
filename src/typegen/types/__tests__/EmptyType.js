// @flow

import EmptyType from "../EmptyType";

describe("EmptyType", () => {
  describe("arbitrary", () => {
    it("throws an error", () => {
      const t = new EmptyType();
      expect(() => t.arbitrary()).toThrow(
        "Tried to create an arbitrary instance of an empty type"
      );
    });
  });

  describe("check", () => {
    it("returns false, there is no instantiation of the empty type", () => {
      const t = new EmptyType();
      expect(t.check(4)).toBe(false);
    });
  });
});
