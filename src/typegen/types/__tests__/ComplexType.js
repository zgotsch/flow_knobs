import {mockSeedRandomEach} from "../../../mockSeedRandom";

import NumberType from "../NumberType";
import StringType from "../StringType";
import NullType from "../NullType";
import ObjectType from "../ObjectType";
import UnionType from "../UnionType";
import IntersectionType from "../IntersectionType";
import TupleType from "../TupleType";
import VoidType from "../VoidType";

describe("A complex type", () => {
  const t = new ObjectType({
    numberField: new NumberType(),
    stringField: new StringType(),
    optionalField: new UnionType([
      new NullType(),
      new VoidType(),
      new TupleType([]),
    ]),
    objectField: new ObjectType({
      innerField: new NumberType(),
    }),
    tupleField: new TupleType([new NumberType(), new StringType()]),
    unionField: new UnionType([
      new NumberType(),
      new StringType(),
      new VoidType(),
    ]),
    intersectionField: new IntersectionType([new ObjectType()]),
  });

  describe("arbitrary", () => {
    mockSeedRandomEach(42);

    it("creates an arbitary value of the correct type", () => {
      expect(t.arbitrary()).toEqual({
        numberField: 37454,
        stringField: "quibusdam hic sit",
        optionalField: null,
        objectField: {
          innerField: 73199,
        },
        tupleField: [77969, "animi mollitia sequi"],
        unionField: undefined,
        intersectionField: {},
      });
    });
  });
});
