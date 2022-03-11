import React from "react";
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

export const StepBoxesSection = ({ steps = [] }) => (
  <div className="row">
    <PaperColumnRenderer
      spaceEvenly
      colClassName={styles.mobileSpaced}
      columns={steps.map((singleStepJson) => (
        <SingleStep {...singleStepJson} key={singleStepJson.title} />
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
  caption = "Build yoir first Workflow in 2 Minutes",
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
}) => (
  <div className="row">
    <InfoPaper title={title}>
      <div className="row">
        <div className="col col--8">
          <WorkflowLanguageExamples languageSamples={languageSamples} />
        </div>
        <div className="col col--4">
          <PaperContainer className={styles.firstWorkflowContainer}>
            <img src={rightImage} alt="small-diagram"></img>
          </PaperContainer>
        </div>
      </div>
      <Text align="center" className={styles.firstWorkflowFooter}>
        {sectionFooter}
      </Text>
    </InfoPaper>
  </div>
);

const IconHeader = ({ icon, header }) => (
  <div className={styles.iconHeader}>
    <FontAwesomeIcon style={{ fontSize: 30 }} icon={icon} />
    <h5 className="padding-left--sm">{header}</h5>
  </div>
);

export const CommunitySection = ({}) => (
  <div className="row">
    <InfoPaper
      title="Conductor Community"
      titleContainerClass="padding-bottom--md"
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
                <IconHeader icon={faSlack} header="Join Slack Community" />

                <p className=" padding-vert--md">
                  Use slack for reaching us live. You can also connect with
                  other Conductor users.
                </p>
              </a>
            </div>
          </div>
          <div className={`row ${styles.communityRow}`}>
            <div className="col col--12">
              <a
                className={"aClass"}
                href={"https://discord.com/invite/P6vVt9xKSQ"}
                target={"_blank"}
              >
                <IconHeader icon={faDiscord} header="Join Discord Community" />

                <p className=" padding-vert--md">
                  Prefer discord? You can connect with us on Discord too.
                </p>
              </a>
            </div>
          </div>
          <div className={`row ${styles.communityRow}`}>
            <div className="col col--12">
              <a
                className={"aClass"}
                href={"https://twitter.com/orkesio"}
                rel={"noopener"}
                target={"_blank"}
              >
                <IconHeader icon={faTwitter} header="Twitter Community" />
                <p className=" padding-vert--md">
                  Follow us on twitter @orkesio to get updates real time
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
                href={"https://github.com/Netflix/conductor"}
                target={"_blank"}
              >
                <IconHeader icon={faGithub} header="Github Repository" />

                <p className=" padding-vert--md">
                  Give us a star and follow for updates on discussions, releases
                  and other important notifications
                </p>
              </a>
            </div>
          </div>
          <div className={`row ${styles.communityRow}`}>
            <div className="col col--12">
              <a
                className={"aClass"}
                href={"https://www.linkedin.com/company/orkes-inc/"}
                target={"_blank"}
              >
                <IconHeader icon={faLinkedin} header="LinkedIn" />

                <p className=" padding-vert--md">
                  Follow our company on LinkedIn to receive news around our
                  hiring, job openings and more.
                </p>
              </a>
            </div>
          </div>
          <div className={`row ${styles.communityRow}`}>
            <div className="col col--12">
              <a
                className={"aClass"}
                href={
                  "https://www.youtube.com/channel/UCI7sk4DD6F6r9CWg9gHRlVg"
                }
                target={"_blank"}
              >
                <IconHeader icon={faYoutube} header="Youtube Channel" />

                <p className=" padding-vert--md">
                  Follow our youtube channel for watching meetup recaps, how to
                  and learning videos.
                </p>
              </a>
            </div>
          </div>
        </>
      }
    ></InfoPaper>
  </div>
);
