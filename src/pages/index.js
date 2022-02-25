import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import SampleWorkflow from "/img/workflow_fork.png";
import SmallDiagram from "/img/small_diagram.png";
import {
  JavaSample,
  JavascriptSample,
  PythonSample,
  TypescriptSample,
  RustSample,
  CurlSample,
} from "./_Languages.js";
import {
  BuildYourFirstWorkflowLinkButton,
  StepBoxesSection,
  TitleDoubleTextSection,
  WhatIsConductorSection,
  YourfirstWorkflowSection,
} from "./_Sections";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Orkes Conductor is a cloud hosted, fully managed version of Netflix Conductor offering full compatibility with the open source version. Use Conductor to hyper charge your application development."
    >
      <main className={`container ${styles.mainContainer}`}>
        <StepBoxesSection
          steps={[
            {
              title: "Get Started",
              description: "Setup your environment to get started",
              to: "/docs/getting-started",
            },
            {
              title: "Cookbook",
              description:
                "Browse a list of sample workflows that you can build",
            },
            {
              title: "Use Cases",
              description: "Setup your environment to get started",
            },
            {
              title: "Videos",
              description: "Watch demo videos, how to guides",
            },
            {
              title: "API Docs",
              description: "Specifications of various components",
              to: "/docs/reference-docs",
            },
          ]}
        />
        <WhatIsConductorSection
          title="What is Conductor?"
          sideImage={SampleWorkflow}
          description="Build powerful workflows across microservices without worrying
                  about maintaining state"
          videoTitle="Explain Like I'm 5: Docusaurus"
          videoSrc="https://www.youtube.com/embed/du7mls9XMUE"
          videoFooterCaption="
                  Watch this short video to learn more about conductor
                "
        />
        <TitleDoubleTextSection
          title="Why Conductor?"
          firstColumnText="
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum
            "
          secondColumnText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum
"
        />
        <BuildYourFirstWorkflowLinkButton
          caption="Build your first Workflow in 2 Minutes"
          to="/docs/introduction"
        />
        <TitleDoubleTextSection
          title="What can you build with Conductor ?"
          firstColumnText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum
"
          secondColumnText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum
"
        />
        <YourfirstWorkflowSection
                languageSamples={{
                  java: <JavaSample />,
                  python: <PythonSample />,
                  javascript: <JavascriptSample />,
                  typescript: <TypescriptSample />,
                  rust: <RustSample />,
                  curl: <CurlSample />,
                }}
            title="Your First Workflow"
            rightImage={SmallDiagram}
            sectionFooter="Simple functional code that can run complex flows"
       /> 
      </main>
    </Layout>
  );
}
