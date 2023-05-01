import React from "react";
import styles from "./SingleStep.module.css";
import Link from "@docusaurus/Link";
import { PaperContainer } from "./PaperContainer";
import classNames from "classnames";

export const SingleStep = ({ title, description, to, index }) => (
    <PaperContainer
        className={classNames(
            styles.singleStep,
            `${styles[`singleStep-step-${index}`]}`
        )}
    >
        <Link to={to} className="noStyleLink">
            <div
                className={classNames(
                    styles.singleStepContent,
                    `container padding--md`
                )}
            >
                <div className="row padding-horiz--md">
                    <h2 className={styles.title}>{title}</h2>
                </div>
                <div className="row padding-horiz--md">
                    <p className="description">{description}</p>
                </div>
            </div>
        </Link>
    </PaperContainer>
);
