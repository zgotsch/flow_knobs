// @flow

export default class Type<T> {
  arbitrary(): T {
    throw new Error("arbitrary not implemented");
  }
}
