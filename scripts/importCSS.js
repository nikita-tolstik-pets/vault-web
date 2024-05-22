// Tailwind doesn't support intellisense for custom class names from .css files
// This code is related to this issue https://github.com/tailwindlabs/tailwindcss-intellisense/issues/227#issuecomment-1462034856
// 2023/12/03
// Nikita Tolstik @vibegame

import * as fs from "fs";
import postcss from "postcss";
import postcssJs from "postcss-js";

export const importCSS = (filename) => {
  return ({ addBase, addComponents, addUtilities } = {}) => {
    const css = fs.readFileSync(filename, "utf8");
    const root = postcss.parse(css);
    const jss = postcssJs.objectify(root);

    if ("@layer base" in jss) {
      addBase(jss["@layer base"]);
    }
    if ("@layer components" in jss) {
      addComponents(jss["@layer components"]);
    }
    if ("@layer utilities" in jss) {
      addUtilities(jss["@layer utilities"]);
    }
  };
};
