import React from "react";
import styles from "./SingleStep.module.css";
import Link from "@docusaurus/Link";
import { PaperContainer } from "./PaperContainer";

export const SingleStep = ({ title, description, to }) => (
  <PaperContainer className={styles.singleStep}>
    <Link to={to} className="noStyleLink">
      <div className={`container padding--md`}>
        <div className="row padding-horiz--md">
          <h4 className={styles.title}>{title}</h4>
        </div>
        <div className="row padding-horiz--md">
          <p className="description">{description}</p>
        </div>
      </div>
    </Link>
  </PaperContainer>
);
