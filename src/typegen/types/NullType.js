// @flow

import Type from "./Type";

export default class NullType extends Type<null> {
  arbitrary(): null {
    return null;
  }
}
