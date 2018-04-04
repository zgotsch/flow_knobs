// @flow

export default class Type<+T> {
  arbitrary(): T {
    throw new Error("arbitrary not implemented");
  }

  check(target: any): boolean {
    throw new Error("check not implemented");
  }
}
