import type {ObjectTypeAnnotation} from "babel-flow-types";

/* Generated from:
type MyType = {
  +numberField: number,
  -stringField: string,
  nullableField: ?[],
  objectField: {
    innerField: number,
  },
  tupleField: [number, string],
  unionField: number | string | void,
  intersectionField: number & string,
  optionalField?: number
};
*/
import objectFixture from "./sampleType.json";
import astToType from "../astToType";
import {mockSeedRandomEach} from "../../mockSeedRandom";

/* Generated from:
type SimpleObject = {
  numberField: number,
}
*/
const simpleFixture = {
  type: "ObjectTypeAnnotation",
  start: 199,
  end: 225,
  loc: {
    start: {
      line: 8,
      column: 20,
    },
    end: {
      line: 10,
      column: 1,
    },
  },
  callProperties: [],
  properties: [
    {
      type: "ObjectTypeProperty",
      start: 203,
      end: 222,
      loc: {
        start: {
          line: 9,
          column: 2,
        },
        end: {
          line: 9,
          column: 21,
        },
      },
      key: {
        type: "Identifier",
        start: 203,
        end: 214,
        loc: {
          start: {
            line: 9,
            column: 2,
          },
          end: {
            line: 9,
            column: 13,
          },
          identifierName: "numberField",
        },
        name: "numberField",
      },
      static: false,
      kind: "init",
      value: {
        type: "NumberTypeAnnotation",
        start: 216,
        end: 222,
        loc: {
          start: {
            line: 9,
            column: 15,
          },
          end: {
            line: 9,
            column: 21,
          },
        },
      },
      variance: null,
      optional: false,
    },
  ],
  indexers: [],
  exact: false,
};

describe("astToType", () => {
  mockSeedRandomEach(42);

  it("creates a value-level representation of a simple object type", () => {
    const t = astToType(simpleFixture);
    expect(t.arbitrary()).toEqual({
      numberField: 37454,
    });
  });

  it("creates a value-level type for a large type", () => {
    const t = astToType(objectFixture);
    expect(t.arbitrary()).toEqual({
      intersectionField: {
        left: "ducimus sequi aspernatur",
        right: 5808,
      },
      nullableField: null,
      numberField: 37454,
      objectField: {
        innerField: 73199,
      },
      optionalField: 45924,
      stringField: "quibusdam hic sit",
      tupleField: [77969, "animi mollitia sequi"],
      unionField: undefined,
    });
  });
});
