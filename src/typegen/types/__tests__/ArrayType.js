// @flow

import ArrayType from "../ArrayType";
import NumberType from "../NumberType";

describe("ArrayType", () => {
  describe("arbitrary", () => {
    it("creates an array with the element type specified", () => {
      const t = new ArrayType(new NumberType());
      expect(t.arbitrary()).toEqual([42, 42, 42, 42, 42]);
    });
  });
});
