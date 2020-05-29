import React from "react";

import { QuickStartCanvas } from "react-pts-canvas";
import { Util, Line, Rectangle, Create } from "pts";

import { COLORS } from "../utils/colors";

const { primaryGreen, secondaryYellow } = COLORS;

export function Playground() {
  let pts;

  return (
    <>
      <QuickStartCanvas
        onStart={(bound, space) => {
          pts = Create.distributeRandom(space.innerBound, 10);
        }}
        onAnimate={(space, form, time) => {
          const color = primaryGreen[2];
          form.fill(color).point(space.pointer, 10, "circle");

        }}
      />
    </>
  );
}
