// @flow

import Type from "./Type";

export default class NumberType extends Type<number> {
  arbitrary(): number {
    return 42;
  }
}
