import React from "react";

import { QuickStartCanvas } from "react-pts-canvas";
import { Group } from "pts";

import { COLORS } from "../utils/colors";
import { Confetti } from "../pts/confetti";

const { neutrals } = COLORS;

export function Playground() {
  const pts = new Group();
  return (
    <>
      <QuickStartCanvas
        background={neutrals[1]}
        onAnimate={(space, form, time, ftime) => {
          // remove confetti if reaching the bottom or too many
          if (pts.length > 100 || (pts.length > 0 && pts[0].y > space.size.y)) {
            pts.shift();
          }

          // add a confetti every second
          if (Math.floor(time % 1000) > 980) {
            pts.push(new Confetti(space.pointer));
          }

          // render the confetti
          pts.forEach(p => p.render(form));
        }}
        onAction={(space, form, type, px, py, evt) => {
          // add a point to the line when mouse moves
          if (type === "move") pts.push(new Confetti(px, py));
        }}
      />
    </>
  );
}
