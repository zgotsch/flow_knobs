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
        numberField: [numberType, false],
        stringField: [stringType, false],
      });
      expect(t.arbitrary()).toEqual({
        numberField: 37454,
        stringField: "quibusdam hic sit",
      });
    });

    it("randomly omits optional fields", () => {
      const numberType = new NumberType();
      const stringType = new StringType();
      const t = new ObjectType({
        numberField: [numberType, true],
        stringField: [stringType, true],
      });
      expect(t.arbitrary()).toEqual({
        stringField: "autem quibusdam hic",
      });
    });
  });

  describe("check", () => {
    it("checks for the presence and types of fields", () => {
      const numberType = new NumberType();
      const stringType = new StringType();
      const t = new ObjectType({
        numberField: [numberType, false],
        stringField: [stringType, false],
      });

      expect(
        t.check({
          numberField: 42,
          stringField: "zach",
        })
      ).toBe(true);
      expect(
        t.check({
          numberField: 42,
        })
      ).toBe(false);
      expect(
        t.check({
          numberField: 42,
          stringField: 43,
        })
      ).toBe(false);
    });

    it("doesn't require optional fields", () => {
      const numberType = new NumberType();
      const t = new ObjectType({
        numberField: [numberType, true],
      });

      expect(t.check({})).toBe(true);
    });

    it("requires that the type match when optional fields are present", () => {
      const numberType = new NumberType();
      const t = new ObjectType({
        numberField: [numberType, true],
      });

      expect(t.check({numberField: 42})).toBe(true);
      expect(t.check({numberField: "zach"})).toBe(false);
    });
  });
});
