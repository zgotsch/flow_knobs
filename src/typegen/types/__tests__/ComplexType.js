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
    numberField: [new NumberType(), false],
    stringField: [new StringType(), false],
    nullableField: [
      new UnionType([new NullType(), new VoidType(), new TupleType([])]),
      false,
    ],
    objectField: [
      new ObjectType({
        innerField: [new NumberType(), false],
      }),
      false,
    ],
    tupleField: [new TupleType([new NumberType(), new StringType()]), false],
    unionField: [
      new UnionType([new NumberType(), new StringType(), new VoidType()]),
      false,
    ],
    intersectionField: [new IntersectionType([new ObjectType({})]), false],
    optionalField: [new NullType(), true],
  });

  describe("arbitrary", () => {
    mockSeedRandomEach(48);

    it("creates an arbitary value of the correct type", () => {
      expect(t.arbitrary()).toEqual({
        numberField: 1749,
        stringField: "molestiae saepe ut",
        nullableField: null,
        objectField: {
          innerField: 28486,
        },
        tupleField: [69377, "ullam odit autem"],
        unionField: 96333,
        intersectionField: {},
        // no optionalField
      });
    });
  });

  describe("check", () => {
    it("checks the type", () => {
      expect(
        t.check({
          numberField: 1749,
          stringField: "molestiae saepe ut",
          nullableField: null,
          objectField: {
            innerField: 28486,
          },
          tupleField: [69377, "ullam odit autem"],
          unionField: 96333,
          intersectionField: {},
          // no optionalField
        })
      ).toBe(true);
    });
  });
});
