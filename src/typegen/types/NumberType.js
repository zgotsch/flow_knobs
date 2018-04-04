// @flow

import faker from "faker";

import Type from "./Type";

export default class NumberType extends Type<number> {
  arbitrary(): number {
    return faker.random.number();
  }

  check(target: any): boolean {
    return typeof target === "number";
  }
}
