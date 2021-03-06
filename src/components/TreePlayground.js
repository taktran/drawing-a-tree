import React from "react";

import { QuickStartCanvas } from "react-pts-canvas";
import { Util, Tempo } from "pts";

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
  "#F5A40E",
  secondaryYellow[3],
  secondaryYellow[5]
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

function createPlaceholderTreeProps({ width = 30, height = 20 } = {}) {
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
  const tempo = new Tempo(120);
  let placeholderTree;
  let placeholderTreeProps = createPlaceholderTreeProps();

  return (
    <>
      <QuickStartCanvas
        background={neutrals[0]}
        style={style}
        onStart={(bound, space) => {
          tempo.every(1).start(count => {
            // Move leaves of all trees
            plantedTrees.forEach(tree => tree.moveLeaves());
          });

          space.add(tempo);
        }}
        onAnimate={(space, form, time, ftime) => {
          // Render all planted trees
          plantedTrees.forEach(tree => tree.render(form));

          // Create placeholder tree based on where the pointer is
          placeholderTree = new Tree({
            point: space.pointer,
            ...placeholderTreeProps
          });

          // Render placeholder tree
          placeholderTree.render(form);
        }}
        onAction={(space, form, type, px, py, evt) => {
          if (type === "down") {
            // Set up new tree
            const newTree = placeholderTree.clone({
              width,
              height,
              leavesColor: getRandomLeavesColor()
            });

            // Plant tree
            plantedTrees.push(newTree);

            // New placeholder tree props
            placeholderTreeProps = createPlaceholderTreeProps();
          }
        }}
      />
    </>
  );
}
