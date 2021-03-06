// @flow

import Type from "./Type";

export default class EmptyType extends Type<empty> {
  arbitrary(): empty {
    throw new Error("Tried to create an arbitrary instance of an empty type");
  }

  check(target: any): boolean {
    return false;
  }
}
