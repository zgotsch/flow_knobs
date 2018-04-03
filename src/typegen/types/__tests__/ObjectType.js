// @flow

import {mockSeedRandomEach} from "../../../mockSeedRandom";

import ObjectType from "../ObjectType";
import NumberType from "../NumberType";
import StringType from "../StringType";

describe("ObjectType", () => {
  describe("arbitrary", () => {
    mockSeedRandomEach(42);

    it("creates empty object if given an empty description", () => {
      const t = new ObjectType({});
      expect(t.arbitrary()).toEqual({});
    });

    it("creates an object with the types specified", () => {
      const numberType = new NumberType();
      const stringType = new StringType();
      const t = new ObjectType({
        numberField: numberType,
        stringField: stringType,
      });
      expect(t.arbitrary()).toEqual({
        numberField: 37454,
        stringField: "quibusdam hic sit",
      });
    });
  });
});
