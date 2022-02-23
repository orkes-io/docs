import React from "react";
import styles from "./SingleStep.module.css";

export const SingleStep = ({ title, description }) => (
  <div className={`container padding--md ${styles.singleStep}`}>
    <div className="row padding-horiz--md">
      <h4 className={styles.title}>{title}</h4>
    </div>
    <div className="row padding-horiz--md">
      <p className="description">{description}</p>
    </div>
  </div>
);
