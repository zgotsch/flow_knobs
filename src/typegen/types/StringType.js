// @flow

import faker from "faker";

import Type from "./Type";

export default class StringType extends Type<string> {
  arbitrary(): string {
    return faker.lorem.words(3);
  }

  check(target: any): boolean {
    return typeof target === "string";
  }
}
