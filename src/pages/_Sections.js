import React, { useState, useEffect, useRef } from "react";
import {
  PaperColumnRenderer,
  PaperContainer,
  InfoPaper,
  DoubleInfoPaper,
} from "../components/PaperContainer";
import { SingleStep } from "../components/SingleStep";
import Link from "@docusaurus/Link";
import styles from "./_Sections.module.css";
import { Text } from "../components/Text";
import { WorkflowLanguageExamples } from "../components/WorkflowLanguageExamples";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";
import { faYoutube } from "@fortawesome/free-brands-svg-icons/faYoutube";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import { faDiscord } from "@fortawesome/free-brands-svg-icons/faDiscord";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faSlack } from "@fortawesome/free-brands-svg-icons/faSlack";
import { faJava } from "@fortawesome/free-brands-svg-icons/faJava";
import { faGolang } from "@fortawesome/free-brands-svg-icons/faGolang";
import { faPython } from "@fortawesome/free-brands-svg-icons/faPython";
import { faJs } from "@fortawesome/free-brands-svg-icons/faJs";

export const StepBoxesSection = ({ steps = [] }) => (
  <div className="row">
    <PaperColumnRenderer
      spaceEvenly
      colClassName={styles.mobileSpaced}
      columns={steps.map((singleStepJson, index) => (
        <SingleStep {...singleStepJson} index={index} key={singleStepJson.title} />
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
    <InfoPaper
      title={title}
      infoColumn1={
        <div className="row">
          {sideImage == null ? (
            description
          ) : (
            <>
              <div className="col col--6">{description}</div>
              <div className="col col--6">
                <img src={sideImage} alt="sample_workflow" width="200px"></img>
              </div>
            </>
          )}
        </div>
      }
      infoColumn2={
        <div className="container">
          <div className="row videoContainer">
            <iframe
              src={videoSrc}
              title={videoTitle}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen=""
            ></iframe>
          </div>
          <div className="row">
            <Text align="center" className={styles.videoFooterCaption}>
              {videoFooterCaption}
            </Text>
          </div>
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
  languageSamples,
  rightImage,
  sectionFooter,
}) => {
  return (
  <div className="row">
    <InfoPaper title={title}>
      <div className="row">
        <div className="col col--8">
          <WorkflowLanguageExamples languageSamples={languageSamples} />
        </div>
        <div className="col col--4">
          <PaperContainer className={styles.firstWorkflowContainer}>
            <img src={rightImage} alt="Diagram of a workflow."></img>
          </PaperContainer>
        </div>
      </div>
      <Text align="center" className={styles.firstWorkflowFooter}>
        Tasks such as these makes up steps in your workflows. Learn more <a href="docs/introduction">here</a>
      </Text>
    </InfoPaper>
  </div>
)};

const IconHeader = ({ icon, header }) => (
  <div className={styles.iconHeader}>
    <FontAwesomeIcon style={{ fontSize: 30 }} icon={icon} />
    <h5 className="padding-left--sm">{header}</h5>
  </div>
);

export const SDKList = ({}) => (
    <div>
        <FontAwesomeIcon style={{ fontSize: 60, padding:20 }} icon={faJava}/>
        <FontAwesomeIcon style={{ fontSize: 60, padding:20 }} icon={faGolang} />
        <FontAwesomeIcon style={{ fontSize: 60, padding:20 }} icon={faPython} />
        <FontAwesomeIcon style={{ fontSize: 60, padding:20 }} icon={faJs} />
        <img src="img/csharp.png" style={{ height: 75, width: 75, margin: 5}}/>
        <h4 style={{ padding:20 }}><a href="https://github.com/conductor-sdk">https://github.com/conductor-sdk</a></h4>
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
