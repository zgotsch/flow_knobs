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
});
