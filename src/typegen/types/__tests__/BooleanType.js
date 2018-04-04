// @flow

import {mockRandom, resetMockRandom} from "jest-mock-random";

import BooleanType from "../BooleanType";

describe("UnionType", () => {
  describe("arbitrary", () => {
    it("returns a random boolean", () => {
      mockRandom([0, 0.1, 0.5, 0.2]);
      const t = new BooleanType();
      expect(t.arbitrary()).toBe(false);
      expect(t.arbitrary()).toBe(false);
      expect(t.arbitrary()).toBe(true);
      expect(t.arbitrary()).toBe(false);
    });
  });

  describe("check", () => {
    it("checks whether the target is a boolean", () => {
      const t = new BooleanType();
      expect(t.check(true)).toBe(true);
      expect(t.check(false)).toBe(true);
      expect(t.check(42)).toBe(false);
    });
  });
});
