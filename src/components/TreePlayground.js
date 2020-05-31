import React from "react";

import { QuickStartCanvas } from "react-pts-canvas";
import { Util, Color } from "pts";

import { COLORS } from "../utils/colors";
import { Tree } from "../pts/tree";

const { neutrals, primaryGreen, secondaryYellow } = COLORS;

const style = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
};

const leavesColors = [
  ...primaryGreen.slice(1),
  ...secondaryYellow.slice(1, secondaryYellow.length - 3)
];
const trunkColors = [
  "#725409",
  secondaryYellow[9],
  "#4C3806",
  "#392A05",
  "#261c03",
  "#130e02"
];

function getRandomLeavesColor() {
  return leavesColors[Util.randomInt(leavesColors.length)];
}

function getRandomTrunkColor() {
  return trunkColors[Util.randomInt(trunkColors.length)];
}

function createPlaceholderTreeProps({ width = 20, height = 20 } = {}) {
  const trunkColor = getRandomTrunkColor();

  return {
    width,
    height,
    trunkColor
  };
}

export function TreePlayground() {
  const plantedTrees = [];
  const width = 50;
  const height = 100;
  let placeholderTreeProps = createPlaceholderTreeProps();

  return (
    <>
      <QuickStartCanvas
        background={neutrals[0]}
        style={style}
        onAnimate={(space, form, time, ftime) => {
          // Render all planted trees
          plantedTrees.forEach(tree => tree.render(form));

          // Create placeholder tree based on where the pointer is
          const placeholderTree = new Tree({
            point: space.pointer,
            ...placeholderTreeProps
          });

          // Render placeholder tree
          placeholderTree.render(form);
        }}
        onAction={(space, form, type, px, py, evt) => {
          if (type == "down") {
            // Add leaves
            const newTree = new Tree({
              point: space.pointer,
              ...placeholderTreeProps,
              width,
              height,
              leavesColor: getRandomLeavesColor()
            });

            // Plant tree
            plantedTrees.push(newTree);

            // New placeholder tree properties
            placeholderTreeProps = createPlaceholderTreeProps();
          }
        }}
      />
    </>
  );
}