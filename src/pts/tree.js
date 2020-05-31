import { Pt, Rectangle } from "pts";

import { COLORS } from "../utils/colors";

const { primaryGreen, secondaryYellow } = COLORS;

export class Tree extends Pt {
  constructor(args) {
    const {
      point,
      width,
      height,
      trunkColor = secondaryYellow[9],
      leavesColor
    } = args;

    super(point);

    // Store args for cloning
    this.args = args;

    this.trunkColor = trunkColor;
    this.trunkWidth = width / 10;
    this.trunkHeight = height / 2;
    this.leavesRadius = width / 2;

    if (leavesColor) {
      this.hasLeaves = true;
      this.leavesColor = leavesColor;
    }
  }

  clone(newArgs) {
    const args = Object.assign({}, this.args, newArgs);
    return new Tree(args);
  }

  addLeaves({ color = primaryGreen[3] } = {}) {
    this.hasLeaves = true;
    this.leavesColor = color;
  }

  render(form) {
    const top = this.y - this.trunkHeight;
    const topLeft = [this.x - this.trunkWidth, top];
    const topMiddle = [this.x - this.trunkWidth / 2, top];
    const shape = Rectangle.corners(
      Rectangle.fromTopLeft(topLeft, this.trunkWidth, this.trunkHeight)
    );

    form.fillOnly(this.trunkColor).polygon(shape);

    if (this.hasLeaves) {
      form
        .fillOnly(this.leavesColor)
        .point(topMiddle, this.leavesRadius, "circle");
    }
  }
}
