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

  describe("check", () => {
    it("checks if the target is an array", () => {
      const t = new ArrayType(new NumberType());

      expect(t.check(42)).toBe(false);
      expect(t.check([])).toBe(true);
    });

    it("checks if the target has the correct element type", () => {
      const t = new ArrayType(new NumberType());

      expect(t.check([8, 6, 7, 5, 3, 0, 9])).toBe(true);
      expect(t.check(["execute", "order", 66])).toBe(false);
    });
  });
});
