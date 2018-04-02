// @flow

import IntersectionType from "../IntersectionType";
import ObjectType from "../ObjectType";
import NumberType from "../NumberType";
import StringType from "../StringType";

describe("IntersectionType", () => {
  describe("arbitrary", () => {
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
      const numberFieldObject = new ObjectType({numberField: new NumberType()});
      const stringFieldObject = new ObjectType({stringField: new StringType()});
      const t = new IntersectionType([numberFieldObject, stringFieldObject]);

      expect(t.arbitrary()).toEqual({
        numberField: 42,
        stringField: "a random string",
      });
    });

    // This doesn't work in Flow due to a bug but it's described by the docs
    xit("creates a value of the Flow intersection type when the branches are overlapping, intersecting overlapping fields", () => {});
  });
});
