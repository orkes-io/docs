import React from "react";
import styles from "./Text.module.css";

const textAlignmentToClass = (alignmentEnum) => {
  switch (alignmentEnum) {
    case "center":
      return styles.alignCenter;
    default:
      return "";
  }
};

export const Text = ({ children, align, className }) => {
  return <p className={`${textAlignmentToClass(align)} ${className}`}>{children}</p>;
};
