import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import SmallDiagram from "/img/small_diagram.png";
import { JavaSample, PythonSample, GoSample } from "./_Languages.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import Link from "@docusaurus/Link";
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
            description={
              <ul className={styles.spacedUl}>
                <li>
                  <h3>Built at Netflix, &nbsp;<FontAwesomeIcon icon={faHeart} style={{ color: "red", fontSize: 20}}/> by Developers across the world</h3>
                  <h5></h5>
                </li>
                <li>
                  <h3>Distributed Applications made easy</h3>
                  <h5>Durable code execution, visualizations and analytics.</h5>
                  <h5>Build your applications 10x faster!</h5>
                </li>
                <li>
                  <h3><a href="/content/docs/introduction">Run your first Conductor App</a></h3>
                </li>
              </ul>
            }
          />
          <StepBoxesSection
              steps={[
                {
                  title: "Getting Started",
                  description:
                    "Concepts and guide to building applications with Conductor",
                  to: "/docs/getting-started/concepts/overview",
                },
                {
                  title: "API and SDK Docs",
                  description: "Conductor APIs and SDKs for creating workflows and tasks",
                  to: "/docs/api",
                },
                {
                  title: "Developer's Guide",
                  description:
                    "Guide to developing on Conductor, CI/CD, Testing, Metrics, Performance Tuning",
                  to: "/docs/sdk",
                },
              ]}
            />
        <StepBoxesSection
            steps={[
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
                title: "Access Control & Security",
                description: "Specifications of various components",
                to: "/docs/acl",
              },
            ]}
          />
          <div className="row row--center">
              <Link className={`button button--info button--lg ${styles.whiteFont}`} to="codelab">
                Ready to explore more? Checkout Codelabs and Samples
              </Link>
            </div>

        </main>
      </Layout>
    </div>
  );
}
