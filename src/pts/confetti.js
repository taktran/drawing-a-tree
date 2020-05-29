import { Pt, Util, Const, Triangle, Rectangle } from "pts";

import { LIGHT_COLORS } from "../utils/colors";

/**
 * Adapted from https://ptsjs.org/demo/edit/?name=pt.extends
 */
export class Confetti extends Pt {
  constructor(...args) {
    super(...args);
    this.color = LIGHT_COLORS[Util.randomInt(LIGHT_COLORS.length)];
    this.size = Math.random() * 7 + 2;
    this.angle = Math.random() * Const.two_pi;
    this.dir = Math.random() > 0.5 ? 1 : -1;
    this.shape = ["rect", "circle", "tri"][Util.randomInt(3)];
  }

  render(form) {
    if (this.y < 200) {
      this.y += 2 / this.size + Math.random();
      this.x += Math.random() - Math.random();
      this.angle +=
        this.dir * (Math.random() * Const.one_degree + Const.one_degree);

      if (this.shape === "tri" || this.shape === "rect") {
        let shape =
          this.shape === "tri"
            ? Triangle.fromCenter(this, this.size)
            : Rectangle.corners(Rectangle.fromCenter(this, this.size * 2));
        shape.rotate2D(this.angle, this);
        form.fillOnly(this.color).polygon(shape);
      } else {
        form.fillOnly(this.color).point(this, this.size, "circle");
      }
    }
  }
}
