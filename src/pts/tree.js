import { Pt, Rectangle, Triangle, Util } from "pts";

import { COLORS } from "../utils/colors";

const { primaryGreen, secondaryYellow } = COLORS;

const randomDeltas = [-2 - 1, 0, 1, 2];
function getRandomDelta() {
  return randomDeltas[Util.randomInt(randomDeltas.length)];
}

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

    this.args = args;

    this.point = point;
    this.width = width;
    this.height = height;

    const { leavesCenter } = this.getTreeCoords({ point, width, height });
    this.currentLeavesCenter = leavesCenter;

    this.trunkColor = trunkColor;

    if (leavesColor) {
      this.hasLeaves = true;
      this.leavesColor = leavesColor;
    }
  }

  getTreeCoords({ point, width, height }) {
    const trunkWidth = width / 10;
    const trunkHeight = height / 2;
    const trunkBaseHeight = height / 15;
    const leavesRadius = width / 2;

    const top = point.y - trunkHeight - trunkBaseHeight;
    const middleX = point.x - trunkWidth / 2;

    const trunkTopLeft = [point.x - trunkWidth, top];
    const leavesCenter = new Pt(middleX, top);
    const trunkBaseCenter = [middleX, point.y - (2 * trunkBaseHeight) / 3];

    return {
      trunkTopLeft,
      trunkWidth,
      trunkHeight,
      trunkBaseCenter,
      trunkBaseHeight,
      leavesCenter,
      leavesRadius
    };
  }

  clone(newArgs) {
    const args = Object.assign({}, this.args, newArgs);
    return new Tree(args);
  }

  addLeaves({ color = primaryGreen[3] } = {}) {
    this.hasLeaves = true;
    this.leavesColor = color;
  }

  moveLeaves() {
    const { leavesCenter } = this.getTreeCoords({
      point: this.point,
      width: this.width,
      height: this.height
    });
    this.currentLeavesCenter = [
      leavesCenter.x + getRandomDelta(),
      leavesCenter.y + getRandomDelta()
    ];
  }

  render(form) {
    const {
      trunkTopLeft,
      trunkWidth,
      trunkHeight,
      trunkBaseCenter,
      trunkBaseHeight,
      leavesRadius
    } = this.getTreeCoords({
      point: this.point,
      width: this.width,
      height: this.height
    });
    const trunk = Rectangle.corners(
      Rectangle.fromTopLeft(trunkTopLeft, trunkWidth, trunkHeight)
    );
    const trunkBase = Triangle.fromCenter(trunkBaseCenter, trunkBaseHeight);

    form.fillOnly(this.trunkColor).polygon(trunk);
    form.fillOnly(this.trunkColor).polygon(trunkBase);

    if (this.hasLeaves) {
      form
        .fillOnly(this.leavesColor)
        .point(this.currentLeavesCenter, leavesRadius, "circle");
    }
  }
}
