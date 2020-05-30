import React from "react";

import { QuickStartCanvas } from "react-pts-canvas";
import { Group } from "pts";

import { COLORS } from "../utils/colors";
import { Confetti } from "../pts/confetti";

const { neutrals } = COLORS;

const style = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
};

export function Playground() {
  const pts = new Group();
  return (
    <>
      <QuickStartCanvas
        background={neutrals[0]}
        style={style}
        onAnimate={(space, form, time, ftime) => {
          // remove confetti if reaching the bottom or too many
          if (pts.length > 100 || (pts.length > 0 && pts[0].y > space.size.y)) {
            pts.shift();
          }

          // add a confetti every second
          if (Math.floor(time % 1000) > 980) {
            pts.push(new Confetti({ point: space.pointer, space }));
          }

          // render the confetti
          pts.forEach(p => p.render(form));
        }}
        onAction={(space, form, type, px, py, evt) => {
          // add a point to the line when mouse moves
          if (type === "move")
            pts.push(
              new Confetti({
                point: [px, py],
                space
              })
            );
        }}
      />
    </>
  );
}
