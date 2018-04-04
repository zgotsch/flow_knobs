// @flow

import type {
  ObjectTypeAnnotation,
  FlowTypeAnnotation,
  ObjectTypeProperty,
} from "babel-flow-types";

import {invariant} from "../utils";

import ArrayType from "./types/ArrayType";
import EmptyType from "./types/EmptyType";
import IntersectionType from "./types/IntersectionType";
import NullType from "./types/NullType";
import NumberType from "./types/NumberType";
import ObjectType from "./types/ObjectType";
import StringType from "./types/StringType";
import TupleType from "./types/TupleType";
import Type from "./types/Type";
import UnionType from "./types/UnionType";
import VoidType from "./types/VoidType";
import LiteralType from "./types/LiteralType";
import BooleanType from "./types/BooleanType";
import FunctionType from "./types/FunctionType";

type FullType = <T: Type<any>>(T) => Type<any> | Type<any>;

export default function astToType(node: FlowTypeAnnotation): Type<any> {
  if (node.type === "ObjectTypeAnnotation") {
    const objectTypes = node.properties.reduce(
      (memo, prop: ObjectTypeProperty) => {
        // TODO(zach): option missing from ObjectTypeProperty $FlowFixMe and PR
        const {key, value, optional} = prop;
        invariant(
          key.type === "Identifier",
          "Got a key which isn't an identifier"
        );
        memo[key.name] = [astToType(value), optional];
        return memo;
      },
      {}
    );
    return new ObjectType(objectTypes);
  } else if (node.type === "NumberTypeAnnotation") {
    return new NumberType();
  } else if (node.type === "StringTypeAnnotation") {
    return new StringType();
    // TODO(zach): $FlowFixMe and PR
  } else if (node.type === "EmptyTypeAnnotation") {
    return new EmptyType();
  } else if (node.type === "VoidTypeAnnotation") {
    return new VoidType();
    // TODO(zach): node type missing :( $FlowFixMe and PR
  } else if (node.type === "NullLiteralTypeAnnotation") {
    return new NullType();
  } else if (node.type === "NullableTypeAnnotation") {
    const {typeAnnotation} = node;
    return new UnionType([
      new NullType(),
      new VoidType(),
      astToType(typeAnnotation),
    ]);
  } else if (node.type === "BooleanTypeAnnotation") {
    return new BooleanType();
  } else if (node.type === "TupleTypeAnnotation") {
    const {types} = node;
    return new TupleType(types.map(astToType));
  } else if (node.type === "StringLiteralTypeAnnotation") {
    // TODO(zach): value missing :( $FlowFixMe and PR
    const {value} = node;
    return new LiteralType(value);
  } else if (node.type === "BooleanLiteralTypeAnnotation") {
    // TODO(zach): value missing :( $FlowFixMe and PR
    const {value} = node;
    return new LiteralType(value);
    // TODO(zach): node type missing :( $FlowFixMe and PR
  } else if (node.type === "NumberLiteralTypeAnnotation") {
    const {value} = node;
    return new LiteralType(value);
  } else if (node.type === "AnyTypeAnnotation") {
    return new LiteralType("__any__");
  } else if (node.type === "MixedTypeAnnotation") {
    return new LiteralType("__mixed__");
  } else if (node.type === "NumericLiteralTypeAnnotation") {
    throw new Error(
      'Unexpected node type, expected "NumberLiteralTypeAnnotation"'
    );
  } else if (node.type === "FunctionTypeAnnotation") {
    const {params} = node;
    // explicitly uncurry fn
    const paramTypes = params.map(t => astToType(t.typeAnnotation));
    return new FunctionType(
      new TupleType(paramTypes),
      astToType(node.returnType)
    );
  } else if (node.type === "UnionTypeAnnotation") {
    const {types} = node;
    return new UnionType(types.map(astToType));
  } else if (node.type === "IntersectionTypeAnnotation") {
    const {types} = node;
    return new IntersectionType(types.map(astToType));
  } else if (node.type === "ArrayTypeAnnotation") {
    throw new Error(
      'Unexpected node type, expected "GenericTypeAnnotation" with identifier "Array"'
    );
  } else if (node.type === "GenericTypeAnnotation") {
    const idNode = node.id;
    invariant(idNode.type === "Identifier", "Got a non-Identifier id node");
    if (idNode.name === "Array" || idNode.name === "$ReadOnlyArray") {
      const {typeParameters} = node;
      const {params} = typeParameters;
      invariant(
        params.length === 1,
        "Got an array type with multiple type parameters"
      );
      const elementType = astToType(params[0]);
      return new ArrayType(elementType);
    }
  } else if (node.type === "TypeofTypeAnnotation") {
    throw new Error("Can't do `typeof`");
  } else if (node.type === "ThisTypeAnnotation") {
    throw new Error("Can't do `this`");
  } else {
    invariant(node.type !== "TypeAnnotation", "Found a bare type annotation");
    (node.type: empty);
  }
  return new EmptyType();
}
