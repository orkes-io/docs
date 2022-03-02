import React from "react";
import styles from "./PaperContainer.module.css";

export const PaperContainer = ({ children, className = "" }) => {
  return <div className={`${styles.paper} ${className}`}>{children}</div>;
};

export const ColumnRenderer = ({ columns, spaceEvenly = false }) => {
  const columnAmount = Math.round(12 / columns.length);
  return (
    <div className={`row ${spaceEvenly ? styles.spaceEvenly : ""}`}>
      {columns.map((elem, idx) => (
        <div key={`col-${idx}`} className={`col col--${columnAmount}`}>
          {elem}
        </div>
      ))}
    </div>
  );
};

export const PaperColumnRenderer = ({
  columns,
  spaceEvenly = false,
  colClassName = "",
}) => {
  const columnAmount = Math.round(12 / columns.length);
  return (
    <PaperContainer className={`container padding--lg`}>
      <div className={`row ${spaceEvenly ? styles.spaceEvenly : ""}`}>
        {columns.map((elem, idx) => (
          <div
            key={`col-${idx}`}
            className={`col col--${columnAmount} ${colClassName}`}
          >
            {elem}
          </div>
        ))}
      </div>
    </PaperContainer>
  );
};

export const InfoPaper = ({ title, infoColumn1, infoColumn2, children }) => (
  <PaperContainer className={`container padding--lg`}>
    <div className="row row--no-gutters">
      <h4>{title}</h4>
    </div>
    <ColumnRenderer columns={[infoColumn1, infoColumn2]} />
    {children}
  </PaperContainer>
);

export const DoubleInfoPaper = ({
  title1,
  title2,
  infoColumn1,
  infoColumn2,
}) => (
  <PaperContainer className={`padding--md padding-top--lg`}>
    <div className="container">
      <div className="row">
        <div className="col col--6">
          <div className="container">
            <div className="row padding-left--md">
              <h4>{title1}</h4>
            </div>
            <div className="row">{infoColumn1}</div>
          </div>
        </div>

        <div className="col col--6">
          <div className="container">
            <div className="row padding-left--md">
              <h4>{title2}</h4>
            </div>
            <div className="row">{infoColumn2}</div>
          </div>
        </div>
      </div>
    </div>
  </PaperContainer>
);
