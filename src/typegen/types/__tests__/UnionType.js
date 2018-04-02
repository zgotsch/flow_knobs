// @flow

import {mockRandom, resetMockRandom} from "jest-mock-random";

import UnionType from "../UnionType";
import NullType from "../NullType";
import VoidType from "../VoidType";
import TupleType from "../TupleType";

describe("UnionType", () => {
  describe("arbitrary", () => {
    it("errors if no branches are specified", () => {
      const t = new UnionType([]);
      expect(() => t.arbitrary()).toThrow(
        "Tried to create an arbitrary value of an empty union"
      );
    });

    it("chooses the only branch in a singleton union", () => {
      const t = new UnionType([new TupleType([])]);
      expect(t.arbitrary()).toEqual([]);
      expect(t.arbitrary()).toEqual([]);
    });

    it("randomly chooses between two branches", () => {
      const nullType = new NullType();
      const voidType = new VoidType();
      const t = new UnionType([nullType, voidType]);

      mockRandom([0, 0.1, 0.9, 0.4]);

      expect(t.arbitrary()).toBe(nullType.arbitrary());
      expect(t.arbitrary()).toBe(nullType.arbitrary());
      expect(t.arbitrary()).toBe(voidType.arbitrary());
      expect(t.arbitrary()).toBe(nullType.arbitrary());

      resetMockRandom();
    });

    it("randomly chooses between three branches", () => {
      const nullType = new NullType();
      const voidType = new VoidType();
      const tupleType = new TupleType([]);
      const t = new UnionType([nullType, voidType, tupleType]);

      mockRandom([0, 0.1, 0.9, 0.4]);

      expect(t.arbitrary()).toBe(nullType.arbitrary());
      expect(t.arbitrary()).toBe(nullType.arbitrary());
      expect(t.arbitrary()).toEqual(tupleType.arbitrary());
      expect(t.arbitrary()).toBe(voidType.arbitrary());

      resetMockRandom();
    });
  });
});
