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
}
