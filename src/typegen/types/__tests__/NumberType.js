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
});
