// @flow

import FunctionType from "../FunctionType";
import NumberType from "../NumberType";
import BooleanType from "../BooleanType";
import {mockSeedRandomEach} from "../../../mockSeedRandom";

describe("IntersectionType", () => {
  describe("arbitrary", () => {
    mockSeedRandomEach(42);

    it("creates a function which produces the correct result type", () => {
      const numberType = new NumberType();
      const booleanType = new BooleanType();
      const t = new FunctionType(numberType, booleanType);

      const f = t.arbitrary();
      expect(typeof f).toBe("function");
      expect(typeof f(numberType.arbitrary())).toBe("boolean");
    });
  });

  describe("check", () => {
    it("checks whether the target is a function", () => {
      const t = new FunctionType(new NumberType(), new BooleanType());
      expect(t.check(x => x % 2 === 0)).toBe(true);
    });
  });
});
