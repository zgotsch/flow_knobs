// @flow

import Type from "./Type";

export default class VoidType extends Type<void> {
  arbitrary(): void {
    return undefined;
  }

  check(target: any): boolean {
    return target === undefined;
  }
}
