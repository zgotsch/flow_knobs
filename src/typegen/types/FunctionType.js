// @flow

import Type from "./Type";

type Func<A, B> = A => B;
export default class FunctionType<A, B, TA: Type<A>, TB: Type<B>> extends Type<
  Func<A, B>
> {
  argType: TA;
  resultType: TB;

  constructor(argType: TA, resultType: TB) {
    super();
    this.argType = argType;
    this.resultType = resultType;
  }

  // const (arbitrary B)
  arbitrary(): Func<A, B> {
    return () => {
      return this.resultType.arbitrary();
    };
  }

  check(target: any): boolean {
    // Not much to do except check that the target is a function.
    // Since JS functions are not total, we can't just pass in an arbitrary `argType` and look at
    // what comes out.
    return typeof target === "function";
  }
}
