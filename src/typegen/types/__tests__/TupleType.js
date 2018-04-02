// @flow

import TupleType from "../TupleType";
import NumberType from "../NumberType";
import StringType from "../StringType";

describe("TupleType", () => {
  describe("with empty types array", () => {
    describe("arbitrary", () => {
      it("creates an empty tuple (JS array)", () => {
        const t = new TupleType([]);
        expect(t.arbitrary()).toEqual([]);
      });
    });
  });
  describe("with nonempty types array", () => {
    it("creates a tuple with the types specified", () => {
      const n = new NumberType();
      const s = new StringType();
      const t = new TupleType([n, n, s]);
      expect(t.arbitrary()).toEqual([42, 42, "a random string"]);
    });
  });
});
