import React from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import { PaperContainer } from "./PaperContainer";
import { capitalize } from "../helpers";
import styles from "./WorkflowLanguageExamples.module.css";

export const WorkflowLanguageExamples = ({ languageSamples }) => {
  const tabs = Object.keys(languageSamples);
  const { values, tabs: tabChildren } = tabs.reduce(
    (acc, tabName) => {
      const label = capitalize(tabName);
      return {
        values: acc.values.concat({
          label,
          value: tabName,
        }),
        tabs: acc.tabs.concat(
          <TabItem value={tabName} label={label} key={tabName}>
            <PaperContainer className={`${styles.codeContainer}` }>{languageSamples[tabName]}</PaperContainer>
          </TabItem>
        ),
      };
    },
    { values: [], tabs: [] }
  );
  return (
    <Tabs values={values} className="outline-tabs">
      {tabChildren}
    </Tabs>
  );
};
