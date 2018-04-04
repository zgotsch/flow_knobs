// @flow

import faker from "faker";

import {mockSeedRandomEach} from "../../../mockSeedRandom";

import TupleType from "../TupleType";
import NumberType from "../NumberType";
import StringType from "../StringType";

describe("TupleType", () => {
  describe("arbitrary", () => {
    mockSeedRandomEach(42);

    describe("with empty types array", () => {
      it("creates an empty tuple (JS array)", () => {
        const t = new TupleType([]);
        expect(t.arbitrary()).toEqual([]);
      });
    });

    describe("with nonempty types array", () => {
      it("creates a tuple with the types specified", () => {
        const n = new NumberType();
        const s = new StringType();
        const t = new TupleType([n, n, s]);
        expect(t.arbitrary()).toEqual([37454, 79654, "hic sit minus"]);
      });
    });
  });

  describe("check", () => {
    it("checks the arity of the array", () => {
      const n = new NumberType();
      const t = new TupleType([n, n]);

      expect(t.check([])).toBe(false);
      expect(t.check([0])).toBe(false);
      expect(t.check([0, 1])).toBe(true);
    });

    it("checks the type at each position", () => {
      const n = new NumberType();
      const s = new StringType();
      const t = new TupleType([n, s]);
      expect(t.check([0, "zach"])).toBe(true);
      expect(t.check([0, 1])).toBe(false);
    });
  });
});
