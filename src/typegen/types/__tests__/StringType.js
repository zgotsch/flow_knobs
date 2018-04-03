// @flow

import faker from "faker";

import {mockSeedRandomEach} from "../../../mockSeedRandom";

import StringType from "../StringType";

describe("StringType", () => {
  describe("arbitrary", () => {
    mockSeedRandomEach(42);

    it("creates a random string", () => {
      const t = new StringType();
      expect(t.arbitrary()).toBe("autem quibusdam hic");
    });
  });
});
