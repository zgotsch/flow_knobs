// @flow

import Type from "./Type";

type TypeDescriptor<T> = [Type<T>, boolean];
type InstantiateType = <T>(TypeDescriptor<T>) => T;
// TODO(zach): This should be `mixed`, not `any`: https://github.com/facebook/flow/issues/6088
type Instantiated<O: {[key: string]: TypeDescriptor<any>}> = $ObjMap<
  O,
  InstantiateType
>;

// TODO(zach): This should be `mixed`, not `any`: https://github.com/facebook/flow/issues/6088
export default class ObjectType<
  O: {[key: string]: TypeDescriptor<any>}
> extends Type<Instantiated<O>> {
  types: O;

  constructor(types: O) {
    super();
    this.types = {...types};
  }

  arbitrary(): Instantiated<O> {
    return Object.keys(this.types).reduce((memo, k) => {
      const [t, optional] = this.types[k];

      // if optional, half the time, don't include the key
      if (optional) {
        if (Math.random() < 0.5) {
          return memo;
        }
      }
      memo[k] = t.arbitrary();
      return memo;
    }, ({}: {[key: string]: mixed}));
  }

  check(target: any): boolean {
    // There's def enough type info that this should work... $FlowFixMe
    for (const [key, [type, optional]] of Object.entries(this.types)) {
      if (key in target) {
        if (!type.check(target[key])) {
          return false;
        }
      } else {
        if (!optional) {
          return false;
        }
      }
    }
    return true;
  }
}
