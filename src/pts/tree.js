import { Pt, Rectangle, Triangle } from "pts";

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
    this.trunkBaseHeight = height / 15;
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
    const top = this.y - this.trunkHeight - this.trunkBaseHeight;
    const middleX = this.x - this.trunkWidth / 2;
    const topLeft = [this.x - this.trunkWidth, top];
    const topMiddle = [middleX, top];
    const trunk = Rectangle.corners(
      Rectangle.fromTopLeft(topLeft, this.trunkWidth, this.trunkHeight)
    );
    const trunkBaseCenter = [middleX, this.y - (2 * this.trunkBaseHeight) / 3];
    const trunkBase = Triangle.fromCenter(
      trunkBaseCenter,
      this.trunkBaseHeight
    );

    form.fillOnly(this.trunkColor).polygon(trunk);
    form.fillOnly(this.trunkColor).polygon(trunkBase);

    if (this.hasLeaves) {
      form
        .fillOnly(this.leavesColor)
        .point(topMiddle, this.leavesRadius, "circle");
    }
  }
}
