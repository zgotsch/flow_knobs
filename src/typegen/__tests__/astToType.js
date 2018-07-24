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
import {typeAliasToType, typeAnnotationToType} from "../astToType";
import {mockSeedRandomEach} from "../../mockSeedRandom";
import NumberType from "../types/NumberType";

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

/* Generated from:
type Wrap<T> = {
  inner: T,
}
*/
const parameterizedFixture = {
  type: "TypeAlias",
  start: 212,
  end: 242,
  loc: {
    start: {
      line: 11,
      column: 0,
    },
    end: {
      line: 13,
      column: 1,
    },
  },
  id: {
    type: "Identifier",
    start: 217,
    end: 221,
    loc: {
      start: {
        line: 11,
        column: 5,
      },
      end: {
        line: 11,
        column: 9,
      },
      identifierName: "Wrap",
    },
    name: "Wrap",
  },
  typeParameters: {
    type: "TypeParameterDeclaration",
    start: 221,
    end: 224,
    loc: {
      start: {
        line: 11,
        column: 9,
      },
      end: {
        line: 11,
        column: 12,
      },
    },
    params: [
      {
        type: "TypeParameter",
        start: 222,
        end: 223,
        loc: {
          start: {
            line: 11,
            column: 10,
          },
          end: {
            line: 11,
            column: 11,
          },
        },
        name: "T",
        variance: null,
      },
    ],
  },
  right: {
    type: "ObjectTypeAnnotation",
    start: 227,
    end: 242,
    loc: {
      start: {
        line: 11,
        column: 15,
      },
      end: {
        line: 13,
        column: 1,
      },
    },
    callProperties: [],
    properties: [
      {
        type: "ObjectTypeProperty",
        start: 231,
        end: 239,
        loc: {
          start: {
            line: 12,
            column: 2,
          },
          end: {
            line: 12,
            column: 10,
          },
        },
        key: {
          type: "Identifier",
          start: 231,
          end: 236,
          loc: {
            start: {
              line: 12,
              column: 2,
            },
            end: {
              line: 12,
              column: 7,
            },
            identifierName: "inner",
          },
          name: "inner",
        },
        static: false,
        kind: "init",
        value: {
          type: "GenericTypeAnnotation",
          start: 238,
          end: 239,
          loc: {
            start: {
              line: 12,
              column: 9,
            },
            end: {
              line: 12,
              column: 10,
            },
          },
          typeParameters: null,
          id: {
            type: "Identifier",
            start: 238,
            end: 239,
            loc: {
              start: {
                line: 12,
                column: 9,
              },
              end: {
                line: 12,
                column: 10,
              },
              identifierName: "T",
            },
            name: "T",
          },
        },
        variance: null,
        optional: false,
      },
    ],
    indexers: [],
    exact: false,
  },
};

describe("astToType", () => {
  mockSeedRandomEach(42);

  xit("creates a value-level representation of a simple object type", () => {
    const t = astToType(simpleFixture);
    expect(t.arbitrary()).toEqual({
      numberField: 37454,
    });
  });

  xit("creates a value-level type for a large type", () => {
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

  xit("creates a new parameterized type for a type with params", () => {
    const t = typeAliasToType(parameterizedFixture);
    expect(new t(new NumberType())).toEqual({
      inner: 42,
    });
    expect(new t(new StringType())).toEqual({
      inner: "a random string",
    });
  });
});
