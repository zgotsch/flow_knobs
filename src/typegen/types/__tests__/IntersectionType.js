// @flow

import IntersectionType from "../IntersectionType";
import ObjectType from "../ObjectType";
import NumberType from "../NumberType";
import StringType from "../StringType";
import {mockSeedRandomEach} from "../../../mockSeedRandom";

describe("IntersectionType", () => {
  describe("arbitrary", () => {
    mockSeedRandomEach(42);

    it("errors if no branches are specified", () => {
      const t = new IntersectionType([]);
      expect(() => t.arbitrary()).toThrow(
        "Tried to create an arbitrary value of an empty intersection"
      );
    });

    it("errors if the intersection is not of objects", () => {
      const t = new IntersectionType([new NumberType(), new StringType()]);
      expect(() => t.arbitrary()).toThrow(
        "Currently it's only possible to generate arbitrary intersections of objects"
      );
    });

    it("is a pass-through for a single branch", () => {
      const o = new ObjectType({});
      const t = new IntersectionType([o]);
      expect(t.arbitrary()).toEqual(o.arbitrary());
    });

    it("creates a value of the Flow intersection type when the branches are disjoint", () => {
      const numberFieldObject = new ObjectType({
        numberField: [new NumberType(), false],
      });
      const stringFieldObject = new ObjectType({
        stringField: [new StringType(), false],
      });
      const t = new IntersectionType([numberFieldObject, stringFieldObject]);

      expect(t.arbitrary()).toEqual({
        numberField: 37454,
        stringField: "quibusdam hic sit",
      });
    });

    // This doesn't work in Flow due to a bug but it's described by the docs
    xit("creates a value of the Flow intersection type when the branches are overlapping, intersecting overlapping fields", () => {});
  });

  describe("check", () => {
    it("checks that the target is an instance of each type", () => {
      const numberFieldObject = new ObjectType({
        numberField: [new NumberType(), false],
      });
      const stringFieldObject = new ObjectType({
        stringField: [new StringType(), false],
      });
      const t = new IntersectionType([numberFieldObject, stringFieldObject]);

      expect(t.check({numberField: 42})).toBe(false);
      expect(t.check({numberField: 42, stringField: "zach"})).toBe(true);
    });
  });
});
