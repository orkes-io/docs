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
export const PaperColumnRenderer = ({ columns, spaceEvenly = false }) => {
  const columnAmount = Math.round(12 / columns.length);
  return (
    <PaperContainer className={`container padding--lg`}>
      <div className={`row ${spaceEvenly ? styles.spaceEvenly : ""}`}>
        {columns.map((elem, idx) => (
          <div key={`col-${idx}`} className={`col col--${columnAmount}`}>
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
