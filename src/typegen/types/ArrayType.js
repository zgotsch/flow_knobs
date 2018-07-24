// @flow

import Type from "./Type";

export default class ArrayType<T> extends Type<Array<T>> {
  elementType: Type<T>;

  constructor(elementType: Type<T>) {
    super();
    this.elementType = elementType;
  }

  arbitrary(): Array<T> {
    // TODO(zach): random lengths
    const generated = new Array(5);
    for (let i = 0; i < 5; i += 1) {
      generated[i] = this.elementType.arbitrary();
    }
    return generated;
  }

  check(target: any): boolean {
    if (!Array.isArray(target)) {
      return false;
    }

    for (let i = 0; i < target.length; i += 1) {
      if (!this.elementType.check(target[i])) {
        return false;
      }
    }

    return true;
  }
}
