import React from "react";
import styles from "./PaperContainer.module.css";

export const PaperContainer = ({ children, className = "" }) => {
  return <div className={`${styles.paper} ${className}`}>{children}</div>;
};

export const ColumnRenderer = ({ columns, spaceEvenly = false }) => {
  return columns.length === 0 ? null : (
    <div className={`row ${spaceEvenly ? styles.spaceEvenly : ""}`}>
      {columns.map((elem, idx) => (
        <div
          key={`col-${idx}`}
          className={`col col--${Math.round(12 / columns.length)}`}
        >
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
  return (
    <PaperContainer className={`container padding--md`}>
      <div className={`row ${spaceEvenly ? styles.spaceEvenly : ""}`}>
        {columns.map((elem, idx) => (
          <div
            key={`col-${idx}`}
            className={`col ${colClassName}`}
          >
            {elem}
          </div>
        ))}
      </div>
    </PaperContainer>
  );
};

export const InfoPaper = ({
  title,
  infoColumn1,
  infoColumn2,
  children,
  titleContainerClass = "",
}) => (
  <PaperContainer className={`container padding--md`}>
    <div className={`row row--no-gutters ${titleContainerClass}`}>
      <h1>{title}</h1>
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
              <h1>{title1}</h1>
            </div>
            <div className="row">{infoColumn1}</div>
          </div>
        </div>

        <div className="col col--6">
          <div className="container">
            <div className="row padding-left--md">
              <h1>{title2}</h1>
            </div>
            <div className="row">{infoColumn2}</div>
          </div>
        </div>
      </div>
    </div>
  </PaperContainer>
);
