import React from "react";
import {
  DoubleInfoPaper,
  InfoPaper,
  InfoPaperNoTitle,
  PaperColumnRenderer,
  PaperContainer,
} from "./PaperContainer";
import { SingleStep } from "./SingleStep";
import Link from "@docusaurus/Link";
import styles from "./_Sections.module.css";
import { Text } from "./Text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faSlack } from "@fortawesome/free-brands-svg-icons/faSlack";
import AccordionWithImg from "../components/AccordionWithImg";

const videoSource = [
  {
    src: "https://www.youtube.com/embed/VV036Ljs2ns",
    title: "Introduction to Orkes Conductor",
  },
  {
    src: "https://www.youtube.com/embed/tVUaDtoKNgE",
    title: "How to Login to Orkes Conductor Playground",
  },
  {
    src: "https://www.youtube.com/embed/f1b5vZRKn2Q",
    title: "How to get an Access Key & Secret",
  },
  {
    src: "https://www.youtube.com/embed/_cy9lIYJwmo",
    title: "How to run Workflows",
  },
  {
    src: "https://www.youtube.com/embed/PY34TcVzof0",
    title: "How to configure and manage Applications",
  },
  {
    src: "https://www.youtube.com/embed/O9lj4TAqldc",
    title: "How to configure and manage Users",
  },
];
const useCases = [
  {
    title: "Microservices Orchestration",
    image: "/content/img/usecases/microservices.svg",
    alt: "Microservices Orchestration",
  },
  {
    title: "API Orchestration",
    image: "/content/img/usecases/api.svg",
    alt: "API Orchestration",
  },
  {
    title: "Data Pipeline Orchestration",
    image: "/content/img/usecases/cicd.svg",
    alt: "Data Pipeline Orchestration",
  },
  {
    title: "Orchestrate Human Flows",
    image: "/content/img/usecases/humanflows.svg",
    alt: "Orchestrate Human Flows",
  },
  {
    title: "Event Driven Orchestration",
    image: "/content/img/usecases/events.svg",
    alt: "Event Driven Orchestration",
  },
];

const accordionData = [
  {
    title: "Create Workflows",
    description:
      "Define workflows consisting of multiple tasks that are executed in a specific order.",
    image: "/content/img/what-conductor-can-do/1_Create-Workflows.png",
  },
  {
    title: "Branch Your Flows",
    description: "Use switch-case operator to make branching decisions.",
    image: "/content/img/what-conductor-can-do/2_Branch-Your-Flows.png",
  },
  {
    title: "Run Loops",
    description:
      "Use the Do-While loop operator to iterate through a set of tasks.",
    image: "/content/img/what-conductor-can-do/3_Run-Loops.png",
  },
  {
    title: "Parallelize Your Tasks",
    description:
      "Execute tasks in parallel using either static or dynamic forks.",
    image: "/content/img/what-conductor-can-do/4_Parallelize-Your-Tasks.png",
  },
  {
    title: "Run Your Tasks Externally",
    description:
      "Implement tasks using external workers in microservices, serverless functions, or applications.",
    image: "/content/img/what-conductor-can-do/5_Run-Your-Tasks-Externally.png",
  },
  {
    title: "Use Built In Tasks",
    description:
      "Use built-in tasks for common actions such as calling HTTP endpoints, writing to event queues etc.",
    image: "/content/img/what-conductor-can-do/6_Use-Built-In-Tasks.png",
  },
  {
    title: "Handle Errors & Failures",
    description: "Set timeouts, auto retries and failure handlers for tasks.",
    image: "/content/img/what-conductor-can-do/7_Handle-Errors-Failures.png",
  },
  {
    title: "Integrate With Applications",
    description: "Integrate the workflows into your application using SDKs.",
    image:
      "/content/img/what-conductor-can-do/8_Integrate-With-Applications.png",
  },
  {
    title: "Debug Visually",
    description: "Identify and debug failing workflows in the UI.",
    image: "/content/img/what-conductor-can-do/9_Debug-Visually.png",
  },
  {
    title: "Collaborate Securely",
    description: "Use role based access controls to share workflows and tasks.",
    image: "/content/img/what-conductor-can-do/10_Collaborate-Securely.png",
  },
  {
    title: "Run In The Cloud",
    description:
      "Orkes Cloud provides SLA backed, enterprise grade and fully managed Conductor clusters.",
    image: "/content/img/what-conductor-can-do/11_Run-In-The-Cloud.png",
  },
];
export const StepBoxesSection = ({ steps = [] }) => (
  <div className="row">
    <PaperColumnRenderer
      spaceEvenly
      colClassName={styles.mobileSpaced}
      columns={steps.map((singleStepJson, index) => (
        <SingleStep
          {...singleStepJson}
          index={index}
          key={singleStepJson.title}
        />
      ))}
    />
  </div>
);

export const WhatIsConductorSection = ({
  title = "What is Conductor?",
  description = "",
  sideImage,
  videoTitle,
  videoSrc,
  videoFooterCaption,
}) => (
  <div className="row">
    <InfoPaperNoTitle
      children={
        <div style={{ textAlign: "center" }}>
          <h3>Works in your language, with your framework</h3>
          <SDKList />
        </div>
      }
    />
  </div>
);

export const TitleDoubleTextSection = ({
  title1 = "Why Conductor?",
  title2 = "",
  firstColumnText,
  secondColumnText,
}) => (
  <div className="row">
    <DoubleInfoPaper
      title1={title1}
      title2={title2}
      infoColumn1={firstColumnText}
      infoColumn2={secondColumnText}
    />
  </div>
);

export const BuildYourFirstWorkflowLinkButton = ({
  caption = "Build your first Workflow in 2 Minutes",
  to,
}) => (
  <div className="row row--center">
    <Link
      className={`button button--info button--lg ${styles.whiteFont}`}
      to={to}
    >
      {caption}
    </Link>
  </div>
);

export const YourfirstWorkflowSection = ({
  title,
  rightImage,
  sectionFooter,
}) => {
  return (
    <div className="row">
      <InfoPaper title={title}>
        <div className="row">
          <div className="col col--4">
            <PaperContainer className={styles.firstWorkflowContainer}>
              <img src={rightImage} alt="Diagram of a workflow."></img>
            </PaperContainer>
          </div>
        </div>
        <Text align="center" className={styles.firstWorkflowFooter}>
          Tasks such as these makes up steps in your workflows. Learn more{" "}
          <a href="docs/introduction">here</a>
        </Text>
      </InfoPaper>
    </div>
  );
};

const IconHeader = ({ icon, header }) => (
  <div className={styles.iconHeader}>
    <FontAwesomeIcon style={{ fontSize: 30 }} icon={icon} />
    <h5 className="padding-left--sm">{header}</h5>
  </div>
);

export const SDKList = ({}) => (
  <div className={styles.sdklist}>
    <a className={"aClass"} href={"/content/sdks/java"}>
      <img
        src="/content/img/java.svg"
        style={{ height: 75, width: 75, margin: 5 }}
        alt="Java SDK"
      />
    </a>
    <a className={"aClass"} href={"/content/sdks/python"}>
      <img
        src="/content/img/Python_logo.svg"
        style={{ height: 75, width: 75, margin: 5 }}
        alt="Python SDK"
      />
    </a>
    <a className={"aClass"} href={"/content/sdks/csharp"}>
      <img
        src="/content/img/csharp.png"
        style={{ height: 75, width: 75, margin: 5 }}
        alt="C# SDK"
      />
    </a>
    <a className={"aClass"} href={"/content/sdks/javascript"}>
      <img
        src="/content/img/JavaScript_logo_2.svg"
        style={{ height: 75, width: 75, margin: 5 }}
        alt="JavaScript SDK"
      />
    </a>
    <a className={"aClass"} href={"/content/sdks/golang"}>
      <img
        src="/content/img/Go_Logo_Blue.svg"
        style={{ height: 75, width: 75, margin: 5 }}
        alt="Go SDK"
      />
    </a>
    <a className={"aClass"} href={"/content/sdks/clojure"}>
      <img
        src="/content/img/clojure.png"
        style={{ height: 75, width: 75, margin: 5 }}
        alt="Clojure SDK"
      />
    </a>
  </div>
);
export const CommunitySection = ({}) => (
  <div className="row">
    <InfoPaper
      title=""
      titleContainerClass="padding-bottom--sm"
      infoColumn1={
        <>
          <div className={`row ${styles.communityRow}`}>
            <div className="col col--12">
              <a
                className={"aClass"}
                href={
                  "https://join.slack.com/t/orkes-conductor/shared_invite/zt-xyxqyseb-YZ3hwwAgHJH97bsrYRnSZg"
                }
                target={"_blank"}
              >
                <IconHeader icon={faSlack} header="Slack Community" />

                <p className=" padding-vert--sm">
                  Use slack for reaching us live. You can also connect with
                  other Conductor users.
                </p>
              </a>
            </div>
          </div>
        </>
      }
      infoColumn2={
        <>
          <div className={`row ${styles.communityRow}`}>
            <div className="col col--12">
              <a
                className={"aClass"}
                href={"https://github.com/Netflix/conductor/discussions"}
                target={"_blank"}
              >
                <IconHeader icon={faGithub} header="Github Discussions" />
                <p className=" padding-vert--sm">
                  Give us a star and follow for updates on discussions, releases
                  and other important notifications
                </p>
              </a>
            </div>
          </div>
        </>
      }
    ></InfoPaper>
  </div>
);
export const FirstSection = ({ content }) => (
  <div className={styles.firstSection}>{content}</div>
);
export const NewToConductorSection = ({ title, description }) => (
  <div className={"row"}>
    <div className="col">
      <h2>{title}</h2>
      <div>{description}</div>
    </div>
  </div>
);

export const LanguagesSection = ({}) => (
  <div className="row padding-vert--md">
    <InfoPaperNoTitle
      children={
        <div>
          <h2>Works in your language, with your framework</h2>
          <SDKList />
        </div>
      }
    />
  </div>
);

export const VideoSection = ({}) => (
  <div className="padding-vert--md">
    <h2>Video Library</h2>
    <div className={styles.videoSection}>
      {videoSource &&
        videoSource.map((item, index) => (
          <div className={styles.videoColumn} key={index}>
            <iframe
              className={styles.customIframe}
              src={item.src}
              allowfullscreen="allowfullscreen"
              mozallowfullscreen="mozallowfullscreen"
              msallowfullscreen="msallowfullscreen"
              oallowfullscreen="oallowfullscreen"
              webkitallowfullscreen="webkitallowfullscreen"
            ></iframe>
            <h4 className="padding-top--sm padding-left--sm">{item.title}</h4>
          </div>
        ))}
    </div>
  </div>
);

export const UseCasesSection = ({}) => (
  <div className="padding-vert--md">
    <h2>Use Cases</h2>
    <div className={styles.useCasesSection}>
      {useCases &&
        useCases.map((item, index) => (
          <div className={styles.useCase} key={index}>
            <img src={item.image} alt={item.alt}></img>
            <div className={styles.useCaseTitle}>{item.title}</div>
          </div>
        ))}
    </div>
  </div>
);

export const AccordionSection = ({}) => (
  <div className="padding-vert--md">
    <h2>What can Conductor do?</h2>
    <h5>
      Here are some of the key features we can do with Orkes Conductor platform:
    </h5>
    <AccordionWithImg data={accordionData} />
  </div>
);
