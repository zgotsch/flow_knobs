// @flow

import StringType from "../StringType";

describe("StringType", () => {
  describe("arbitrary", () => {
    it("creates a random string", () => {
      const t = new StringType();
      expect(t.arbitrary()).toBe("a random string");
    });
  });
});
