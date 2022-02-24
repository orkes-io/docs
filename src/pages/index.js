// import React from 'react';
// import Layout from '@theme/Layout';
// import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// import HomepageFeatures from '../components/HomepageFeatures';

// const boxWidth = 240;
// const boxMargin = 20;

// function HomepageHeader() {
//   const {siteConfig} = useDocusaurusContext();
//     let aLinkStyle = {
//     };
//     let headerBoxStyle = {
//         fontSize: 17,
//         fontFamily: "Gothic A1",
//         fontWeight: "bold",
//     };
//     let headerBoxTextStyle = {
//         fontSize: 14,
//         fontFamily: "Gothic A1",
//         fontWeight: 400,
//     };
//     return (
//     <header className={"homeHeader"}>
//         <div style={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "center",
//             flexWrap: "wrap",
//             paddingTop: 20,
//             paddingBottom: 40,
//         }}>
//             <a href={"/content/docs/introduction"} style={aLinkStyle} className={"aClass"}>
//                 <div style={{
//                     height: 150,
//                     width: boxWidth,
//                     marginLeft: boxMargin,
//                     marginTop: boxMargin,
//                     marginRight: boxMargin,
//                     padding: 20,
//                     border: "1px solid grey",
//                     borderRadius: 5,
//                 }}>
//                     <h4 style={headerBoxStyle}>Getting Started</h4>
//                     <p style={headerBoxTextStyle}>
//                         Learn about Conductor and its concepts
//                     </p>
//                 </div>
//             </a>
//             <a href={"/content/docs/getting-started/install/running-locally#download-and-run"} style={aLinkStyle} className={"aClass"}>
//                 <div style={{
//                     height: 150,
//                     width: boxWidth,
//                     marginLeft: boxMargin,
//                     marginTop: boxMargin,
//                     marginRight: boxMargin,
//                     padding: 20,
//                     border: "1px solid grey",
//                     borderRadius: 5,
//                 }}>
//                     <h4 style={headerBoxStyle}>Running Conductor</h4>
//                     <p style={headerBoxTextStyle}>
//                         Learn how to run Conductor locally and via Docker
//                     </p>
//                 </div>
//             </a>
//             <a href={"/content/docs/getting-started/run/running-first-workflow"} style={aLinkStyle} className={"aClass"}>
//                 <div style={{
//                     height: 150,
//                     width: boxWidth,
//                     marginLeft: boxMargin,
//                     marginTop: boxMargin,
//                     marginRight: boxMargin,
//                     padding: 20,
//                     border: "1px solid grey",
//                     borderRadius: 5,
//                 }}>
//                     <h4 style={headerBoxStyle}>Running First Workflow</h4>
//                     <p style={headerBoxTextStyle}>
//                         Run a workflow to see Conductor in action
//                     </p>
//                 </div>
//             </a>
//             <a href={"/content/docs/getting-started/run/running-first-worker"} style={aLinkStyle} className={"aClass"}>
//                 <div style={{
//                     height: 150,
//                     width: boxWidth,
//                     marginLeft: boxMargin,
//                     marginTop: boxMargin,
//                     marginRight: boxMargin,
//                     padding: 20,
//                     border: "1px solid grey",
//                     borderRadius: 5,
//                 }}>
//                     <h4 style={headerBoxStyle}>Running First Worker</h4>
//                     <p style={headerBoxTextStyle}>
//                         Add a custom worker that runs your code as part of a workflow
//                     </p>
//                 </div>
//             </a>
//         </div>
//     </header>
//   );
// }
// function HomepageHeader() {
//   const {siteConfig} = useDocusaurusContext();
//     let aLinkStyle = {
//     };
//     return (
//     <header className={"homeHeader"}>
//         <div style={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "center",
//             flexWrap: "wrap",
//             paddingTop: 20,
//             paddingBottom: 40,
//         }}>
//             <a href={"/content/docs/introduction"} style={aLinkStyle} className={"aClass"}>
//                 <div style={{
//                     height: 150,
//                     width: boxWidth,
//                     marginLeft: boxMargin,
//                     marginTop: boxMargin,
//                     marginRight: boxMargin,
//                     padding: 20,
//                     border: "1px solid grey",
//                     borderRadius: 5,
//                 }}>
//                     <h4 style={{
//                         fontSize: 18,
//                         fontFamily: "GothicA1-Medium"
//                     }}>Getting Started</h4>
//                     <p style={{
//                         fontSize: 14,
//                         fontFamily: "GothicA1-Regular"
//                     }}>
//                         Learn about Conductor and its concepts
//                     </p>
//                 </div>
//             </a>
//             <a href={"/content/docs/getting-started/install/running-locally#download-and-run"} style={aLinkStyle} className={"aClass"}>
//                 <div style={{
//                     height: 150,
//                     width: boxWidth,
//                     marginLeft: boxMargin,
//                     marginTop: boxMargin,
//                     marginRight: boxMargin,
//                     padding: 20,
//                     border: "1px solid grey",
//                     borderRadius: 5,
//                 }}>
//                     <h4 style={{
//                         fontSize: 18,
//                         fontFamily: "GothicA1-Medium"
//                     }}>Running Conductor</h4>
//                     <p style={{
//                         fontSize: 14,
//                         fontFamily: "GothicA1-Regular"
//                     }}>
//                         Learn how to run Conductor locally and via Docker
//                     </p>
//                 </div>
//             </a>
//             <a href={"/content/docs/getting-started/run/running-first-workflow"} style={aLinkStyle} className={"aClass"}>
//                 <div style={{
//                     height: 150,
//                     width: boxWidth,
//                     marginLeft: boxMargin,
//                     marginTop: boxMargin,
//                     marginRight: boxMargin,
//                     padding: 20,
//                     border: "1px solid grey",
//                     borderRadius: 5,
//                 }}>
//                     <h4 style={{
//                         fontSize: 18,
//                         fontFamily: "GothicA1-Medium"
//                     }}>Running First Workflow</h4>
//                     <p style={{
//                         fontSize: 14,
//                         fontFamily: "GothicA1-Regular"
//                     }}>
//                         Run a workflow to see Conductor in action
//                     </p>
//                 </div>
//             </a>
//             <a href={"/content/docs/getting-started/run/running-first-worker"} style={aLinkStyle} className={"aClass"}>
//                 <div style={{
//                     height: 150,
//                     width: boxWidth,
//                     marginLeft: boxMargin,
//                     marginTop: boxMargin,
//                     marginRight: boxMargin,
//                     padding: 20,
//                     border: "1px solid grey",
//                     borderRadius: 5,
//                 }}>
//                     <h4 style={{
//                         fontSize: 18,
//                         fontFamily: "GothicA1-Medium"
//                     }}>Running First Worker</h4>
//                     <p style={{
//                         fontSize: 14,
//                         fontFamily: "GothicA1-Regular"
//                     }}>
//                         Add a custom worker that runs your code as part of a workflow
//                     </p>
//                 </div>
//             </a>
//         </div>
//     </header>
//   );
// }
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
  RustSample,
  CurlSample,
} from "./_Languages.js";

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
                  curl: <CurlSample /> 
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
