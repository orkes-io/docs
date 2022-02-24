import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import CodeBlock from '@theme/CodeBlock';
import styles from "./index.module.css";
import HomepageFeatures from "../components/HomepageFeatures";
import {
  PaperColumnRenderer,
  PaperContainer,
  InfoPaper,
} from "../components/PaperContainer";
import { SingleStep } from "../components/SingleStep";
import { Text } from "../components/Text";
import { WorkflowLanguageExamples } from "../components/WorkflowLanguageExamples";
import Sampleworkflow from "/img/workflow_fork.png";
import SmallDiagram from "/img/small_diagram.png";
import { 
  JavaSample,
  JavascriptSample,
  PythonSample,
  TypescriptSample,
  RustSample} from "./_Languages.js";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Orkes Conductor is a cloud hosted, fully managed version of Netflix Conductor offering full compatibility with the open source version. Use Conductor to hyper charge your application development."
    >
      <main className={`container ${styles.mainContainer}`}>
        <div className="row">
          <PaperColumnRenderer
            spaceEvenly
            columns={[
              <SingleStep
                title="Get Started"
                description="Setup your environment to get started"
                to="/docs/getting-started"
              />,

              <SingleStep
                title="Cookbook"
                description="Browse a list of sample workflows that you can build"
              />,

              <SingleStep
                title="Use Cases"
                description="Setup your environment to get started"
              />,

              <SingleStep
                title="Videos"
                description="Watch demo videos, how to guides"
              />,

              <SingleStep
                title="API Docs"
                description="Specifications of various components"
                to="/docs/reference-docs"
              />,
            ]}
          />
        </div>
        <div className="row">
          <InfoPaper
            title="What is Conductor?"
            infoColumn1={
              <div className="row">
                <div className="col col--6">
                  Build powerful workflows across microservices without worrying
                  about maintaining state
                </div>
                <div className="col col--6">
                  <img
                    src={Sampleworkflow}
                    alt="sample_workflow"
                    width="200px"
                  ></img>
                </div>
              </div>
            }
            infoColumn2={
              <>
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/_An9EsKPhp0"
                  title="Explain Like I'm 5: Docusaurus"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen=""
                ></iframe>
                <Text align="center">
                  Watch this short video to learn more about conductor
                </Text>
              </>
            }
          />
        </div>

        <div className="row">
          <InfoPaper
            title="Why Conductor?"
            infoColumn1={
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum
              </p>
            }
            infoColumn2={
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum
              </p>
            }
          />
        </div>
        <div className="row row--center">
          <Link
            className={`button button--info button--lg ${styles.whiteFont}`}
            to="/docs/introduction"
          >
            Build your first Workflow in 2 Minutes
          </Link>
        </div>
        <div className="row">
          <InfoPaper
            title="What can you build with Conductor ?"
            infoColumn1={
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum
              </p>
            }
            infoColumn2={
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum
              </p>
            }
          />
        </div>
        <div className="row">
          <InfoPaper
            title="Your First Workflow"
            infoColumn1={
              <WorkflowLanguageExamples
                languageSamples={{
                  java: <JavaSample />,
                  python: <PythonSample/>,
                  javascript: <JavascriptSample/>,
                  typescript: <TypescriptSample/>,
                  rust: <RustSample/>,
                  curl:<CodeBlock className="language-bash">
                      {"yarn install\nyarn start"}
                  </CodeBlock> 
                }}
              />
            }
            infoColumn2={
              <PaperContainer className={styles.firstWorkflowContainer}>
                <img src={SmallDiagram} alt="small-diagram" width="300px" height="800px"></img>
              </PaperContainer>
            }
          >
            <Text align="center">
              Simple functional code that can run complex flows
            </Text>
          </InfoPaper>
        </div>
      </main>
    </Layout>
  );
}
