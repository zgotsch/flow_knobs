// @flow

import Type from "./Type";

type InstantiateType = <T>(Type<T>) => T;
type Instantiated<O: {}> = $ObjMap<O, InstantiateType>;

// TODO(zach): Not sure how to type this
export default class ObjectType<O: {}> extends Type<Instantiated<O>> {
  types: O;

  constructor(types: O) {
    super();
    this.types = {...types};
  }

  arbitrary(): Instantiated<O> {
    return Object.keys(this.types).reduce((memo, k) => {
      const t = this.types[k];
      memo[k] = t.arbitrary();
      return memo;
    }, ({}: {[key: string]: Type<mixed>}));
  }
}
