// @flow

import Type from "./Type";

export default class StringType extends Type<string> {
  arbitrary(): string {
    return "a random string";
  }
}
