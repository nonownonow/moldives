import type { ComponentPropsWithoutRef } from "react";
import React, { forwardRef } from "react";
import { Heading } from "../Heading/Heading";
import type {
  $SECTIONINGProps,
  SECTIONINGProps,
} from "fxtsx/SECTIONING/SECTIONING";
import { SECTIONING } from "fxtsx/SECTIONING/SECTIONING";

export type SectionProps = $SECTIONINGProps & ComponentPropsWithoutRef<"div">;

const $Section: SECTIONINGProps["$Section"] = forwardRef((props, ref) => {
  return <section {...props} ref={ref} />;
});
export const Section = forwardRef<HTMLDivElement, SectionProps>(function (
  props,
  ref
) {
  return (
    <SECTIONING {...props} $Section={$Section} $Heading={Heading} ref={ref} />
  );
});
