// @flow

import Type from "./Type";

export default class BooleanType extends Type<boolean> {
  arbitrary(): boolean {
    const index = Math.floor(Math.random() * 2);
    return index === 1 ? true : false;
  }

  check(target: any): boolean {
    return target === true || target === false;
  }
}
