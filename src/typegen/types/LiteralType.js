// @flow

import Type from "./Type";

export default class LiteralType<T> extends Type<T> {
  literal: T;

  constructor(literal: T) {
    super();
    this.literal = literal;
  }

  arbitrary(): T {
    return this.literal;
  }

  check(target: any): boolean {
    return target === this.literal;
  }
}
