// @flow

import Type from "./Type";
import ObjectType from "./ObjectType";

// TODO(zach): Not sure how to type this
export default class IntersectionType extends Type<any> {
  types: Array<Type<mixed>>;

  constructor(types: $ReadOnlyArray<Type<any>>) {
    super();
    this.types = [...types];
  }

  arbitrary(): any {
    if (this.types.length === 0) {
      throw new Error(
        "Tried to create an arbitrary value of an empty intersection"
      );
    }

    if (this.types.some(t => !(t instanceof ObjectType))) {
      throw new Error(
        "Currently it's only possible to generate arbitrary intersections of objects"
      );
    }

    return Object.assign.call(null, {}, ...this.types.map(t => t.arbitrary()));
  }
}
