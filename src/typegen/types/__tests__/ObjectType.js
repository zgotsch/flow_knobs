// @flow

import ObjectType from "../ObjectType";
import NumberType from "../NumberType";
import StringType from "../StringType";

describe("ObjectType", () => {
  describe("arbitrary", () => {
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
        numberField: 42,
        stringField: "a random string",
      });
    });
  });
});
