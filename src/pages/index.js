import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import SmallDiagram from "/img/small_diagram.png";
import { JavaSample, PythonSample, GoSample } from "./_Languages.js";
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
    <div className="homePage">
      <Layout
        title={`${siteConfig.title}`}
        description="Orkes Conductor is a cloud hosted, fully managed version of Netflix Conductor offering full compatibility with the open source version. Use Conductor to hyper charge your application development."
      >
        <main className={`container ${styles.mainContainer}`}>
          <StepBoxesSection
            steps={[
              {
                title: "Getting Started",
                description: "Learn about Conductor and its concepts",
                to: "/docs/introduction",
              },
              {
                title: "Running Conductor",
                description:
                  "Learn how to run Conductor locally and via Docker",
                to: "/docs/getting-started/install/running-locally#download-and-run",
              },
              {
                title: "Running First Workflow",
                description: "Run a workflow to see Conductor in action",
                to: "/docs/getting-started/run/running-first-workflow",
              },
              {
                title: "Running First Worker",
                description:
                  "Add a customer worker that runs your code as part of a workflow",
                to: "/docs/getting-started/run/running-first-worker",
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
            //   sideImage={SampleWorkflow}
            description={
              <ul className={styles.spacedUl}>
                <li>
                  Conductor is an open-source, Apache 2.0 licensed microservices
                  and workflow orchestration framework
                </li>
                <li>
                  Build highly reliable distributed applications using the
                  language of choice
                </li>
                <li>
                  Lets us focus on coding the business logic of the application
                  instead of managing complexities of a distributed ecosystem
                </li>
                <li>
                  Cleanly decouple the design of the application flow from the
                  implementation
                </li>
              </ul>
            }
            videoTitle="Explain Like I'm 5: Docusaurus"
            videoSrc="https://www.youtube.com/embed/du7mls9XMUE"
            videoFooterCaption="
                  Watch this short video to learn more about conductor
                "
          />
          <TitleDoubleTextSection
            title1="Why should you use Conductor?"
            firstColumnText={
              <ul className="liClass">
                <li>
                  Lets you focus on coding the business logic of the application
                  instead of managing the state and complexities of a
                  distributed ecosystem
                </li>
                <li>
                  You can cleanly decouple the design of the application flow
                  from the implementation
                </li>
                <li>
                  Your application’s resilience is increased with native support
                  in Conductor for retries, error handling and rich metrics
                </li>
                <li>
                  You have a powerful visualizations of your application’s
                  execution paths that can shorten debugging times from hours to
                  minutes
                </li>
              </ul>
            }
            title2="What can you build with Conductor?"
            secondColumnText={
              <ul className="liClass">
                <li>
                  Applications composed of distributed microservices or
                  serverless functions
                </li>
                <li>
                  Hybrid applications that span across multiple deployment
                  models (e.g. VM deployed monolith, kubernetes deployed
                  containers)
                </li>
                <li>
                  Long running workflows that need to wait for days, months or
                  even years between executions (e.g. monthly subscription
                  billing)
                </li>
                <li>
                  Mission critical applications with high reliability
                  requirements (e.g. financial transactions
                </li>
              </ul>
            }
          />
          <BuildYourFirstWorkflowLinkButton
            caption="Build your first Workflow in 2 Minutes"
            to="/docs/getting-started/run/running-first-workflow"
          />
          <YourfirstWorkflowSection
            languageSamples={{
              java: <JavaSample />,
              python: <PythonSample />,
              go: <GoSample />,
            }}
            title="Your First Workflow"
            rightImage={SmallDiagram}
            sectionFooter="Simple functional code that can run complex flows"
          />
        </main>
      </Layout>
    </div>
  );
}
