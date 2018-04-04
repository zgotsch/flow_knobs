// @flow

import Type from "./Type";

// TODO(zach): Not sure how to type this
export default class TupleType extends Type<any> {
  types: Array<Type<any>>;

  constructor(types: $ReadOnlyArray<Type<any>>) {
    super();
    this.types = [...types];
  }

  arbitrary(): any {
    return this.types.map(t => t.arbitrary());
  }

  check(target: any): boolean {
    if (!Array.isArray(target)) {
      return false;
    }

    if (target.length !== this.types.length) {
      return false;
    }

    for (let i = 0; i < this.types.length; i += 1) {
      if (!this.types[i].check(target[i])) {
        return false;
      }
    }

    return true;
  }
}
