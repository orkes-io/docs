import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import SmallDiagram from "/img/small_diagram.png";
import { JavaSample, PythonSample, GoSample } from "./_Languages.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import {
  BuildYourFirstWorkflowLinkButton,
  StepBoxesSection,
  TitleDoubleTextSection,
  WhatIsConductorSection,
  YourfirstWorkflowSection,
  CommunitySection,
  SDKList,
} from "./_Sections";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div className="homePage">
      <Layout
        title={`${siteConfig.title}`}
        description="Orkes Conductor is a cloud hosted, fully managed version of Netflix Conductor offering full compatibility with the open source version. Use Conductor to hyper charge your application development."
      >
        <main className={`container ${styles.mainContainer}`}>
          <WhatIsConductorSection
            title="What is Conductor?"
            //   sideImage={SampleWorkflow}
            description={
              <ul className={styles.spacedUl}>
                <li>
                  <h3>Built at Netflix &nbsp;<FontAwesomeIcon icon={faHeart} style={{ color: "red", fontSize: 20}}/> by Developers across the world</h3>
                  <h5>Open source under Apache 2.0 licensed</h5>
                </li>
                <li>
                  <h3>Distributed Applications made easy</h3>
                  <h5>Durable code execution, visualizations and analytics</h5>
                </li>
              </ul>
            }
            videoTitle="Netflix Conductor"
            videoSrc="https://www.youtube.com/embed/du7mls9XMUE"
            videoFooterCaption="Conductor is the workflow system of choice at Netflix. Learn more in this video"
          />
          <StepBoxesSection
              steps={[
                {
                  title: "Build Your First App",
                  description: "Build your first distributed application using Conductor",
                  to: "/docs/introduction",
                },
                {
                  title: "Getting Started",
                  description:
                    "Concepts and guide to building applications with Conductor",
                  to: "/docs/getting-started/concepts/overview",
                },
                {
                  title: "API Docs",
                  description: "Run a workflow to see Conductor in action",
                  to: "/docs/api",
                },
                {
                  title: "Conductor SDK",
                  description:
                    "Add a customer worker that runs your code as part of a workflow",
                  to: "/docs/sdk",
                },
              ]}
            />
        <StepBoxesSection
            steps={[
              {
                title: "Access Control & Security",
                description: "Specifications of various components",
                to: "/docs/acl",
              },
              {
                title: "Workflow Scheduler",
                description: "Specifications of various components",
                to: "/docs/scheduler",
              },
              {
                title: "Eventing & Serverless",
                description: "Specifications of various components",
                to: "/docs/events",
              },
              {
                title: "Observability and Metrics",
                description: "Specifications of various components",
                to: "/docs/metrics",
              },
            ]}
          />
          <StepBoxesSection
              steps={[
                {
                  title: "Unit & Integration Testing",
                  description: "Specifications of various components",
                  to: "/docs/testing",
                },
                {
                  title: "Performance Tuning",
                  description: "Specifications of various components",
                  to: "/docs/performance",
                },
                {
                  title: "Development & CI/CD",
                  description: "Specifications of various components",
                  to: "/docs/cicd",
                },
                {
                  title: "Code Labs",
                  description: "Specifications of various components",
                  to: "/docs/codelab",
                },
              ]}
            />
          <CommunitySection />
        </main>
      </Layout>
    </div>
  );
}
