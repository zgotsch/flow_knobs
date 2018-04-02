// @flow

import Type from "./Type";

// TODO(zach): Not sure how to type this
export default class UnionType extends Type<any> {
  types: Array<Type<any>>;

  constructor(types: $ReadOnlyArray<Type<any>>) {
    super();
    this.types = [...types];
  }

  arbitrary(): any {
    if (this.types.length === 0) {
      throw new Error("Tried to create an arbitrary value of an empty union");
    }
    const index = Math.floor(Math.random() * this.types.length);
    return this.types[index].arbitrary();
  }
}
