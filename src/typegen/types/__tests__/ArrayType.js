// @flow

import ArrayType from "../ArrayType";
import NumberType from "../NumberType";
import {mockSeedRandomEach} from "../../../mockSeedRandom";

describe("ArrayType", () => {
  describe("arbitrary", () => {
    mockSeedRandomEach(42);

    it("creates an array with the element type specified", () => {
      const t = new ArrayType(new NumberType());
      expect(t.arbitrary()).toEqual([37454, 79654, 95071, 18343, 73199]);
    });
  });
});
