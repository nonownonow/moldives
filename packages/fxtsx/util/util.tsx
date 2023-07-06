import DOMPurify from "isomorphic-dompurify";
import type { ReactNode } from "react";
import React from "react";
import { map, partition, pipe, some, toArray } from "@fxts/core";

export function html(html: ReactNode): {
  children?: ReactNode | undefined;
  dangerouslySetInnerHTML?:
    | {
        __html: string;
      }
    | undefined;
} {
  if (typeof html === "string") {
    return {
      dangerouslySetInnerHTML: {
        __html: DOMPurify.sanitize(html),
      },
    };
  }
  return {
    children: html,
  };
}

export const separateProps = <T extends Record<string, any>>(
  props: T,
  rootPropsKeys: (string | RegExp)[] = [
    "className",
    "id",
    "tabIndex",
    "style",
    /data-.+/,
  ]
) => {
  const rootPropsAndOtherProps = ([key]: string[]) =>
    pipe(
      rootPropsKeys,
      some((matcher) => RegExp(matcher).test(key))
    );

  return pipe(
    Object.entries(props),
    partition(rootPropsAndOtherProps),
    map(Object.fromEntries),
    toArray
  );
};

export const MockComponent = (props: any) => <div {...props} />;