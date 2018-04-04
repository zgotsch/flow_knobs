// @flow

import NumberType from "../NumberType";
import {mockSeedRandomEach} from "../../../mockSeedRandom";

describe("NumberType", () => {
  describe("arbitrary", () => {
    mockSeedRandomEach(42);

    it("creates a random number", () => {
      const t = new NumberType();
      expect(t.arbitrary()).toBe(37454);
    });
  });

  describe("check", () => {
    it("checks whether the target is a number", () => {
      const t = new NumberType();
      expect(t.check(0)).toBe(true);
      expect(t.check(42)).toBe(true);
      expect(t.check(3234.234823)).toBe(true);
      expect(t.check(Infinity)).toBe(true);
      expect(t.check(Number.NaN)).toBe(true); // not a number is a number
      expect(t.check(null)).toBe(false);
    });
  });
});
