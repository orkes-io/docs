import React, { useState, useEffect, useRef } from "react";
import {
    PaperColumnRenderer,
    PaperContainer,
    InfoPaper,
    InfoPaperNoTitle,
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

const videoSource = [
    {
        src: "https://www.youtube.com/embed/du7mls9XMUE",
        title: "Orkes Conductor Core Concepts",
    },
    {
        src: "https://www.youtube.com/embed/du7mls9XMUE",
        title: "Orkes Conductor: Selected Use Cases",
    },
    {
        src: "https://www.youtube.com/embed/du7mls9XMUE",
        title: "Get Started with Orkes Conductor",
    },
    {
        src: "https://www.youtube.com/embed/du7mls9XMUE",
        title: "Running a Complex Workflow with Orkes Conductor",
    },
    {
        src: "https://www.youtube.com/embed/du7mls9XMUE",
        title: "Creating External Workers with Orkes Conductor",
    },
    {
        src: "https://www.youtube.com/embed/du7mls9XMUE",
        title: "Access Control and Security with Orkes Conductor",
    },
];
const useCases = [
    {
        title: "Microservices Orchestration",
        image: "img/usecases/microservices.svg",
    },
    {
        title: "API Orchestration",
        image: "img/usecases/api.svg",
    },
    {
        title: "Data pipeline orchestration",
        image: "img/usecases/cicd.svg",
    },
    {
        title: "Orchestrate human flows",
        image: "img/usecases/humanflows.svg",
    },
    {
        title: "Event driven orchestration",
        image: "img/usecases/events.svg",
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
                        <PaperContainer
                            className={styles.firstWorkflowContainer}
                        >
                            <img
                                src={rightImage}
                                alt="Diagram of a workflow."
                            ></img>
                        </PaperContainer>
                    </div>
                </div>
                <Text align="center" className={styles.firstWorkflowFooter}>
                    Tasks such as these makes up steps in your workflows. Learn
                    more <a href="docs/introduction">here</a>
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
        <a
            className={"aClass"}
            href={"https://github.com/orkes-io/orkes-conductor-client"}
            target={"_blank"}
        >
            <img
                src="img/java.svg"
                style={{ height: 75, width: 75, margin: 5 }}
            />
        </a>
        <a
            className={"aClass"}
            href={"https://github.com/conductor-sdk/conductor-python"}
            target={"_blank"}
        >
            <img
                src="img/python_logo.svg"
                style={{ height: 75, width: 75, margin: 5 }}
            />
        </a>
        <a
            className={"aClass"}
            href={"https://github.com/conductor-sdk/conductor-csharp"}
            target={"_blank"}
        >
            <img
                src="img/csharp.png"
                style={{ height: 75, width: 75, margin: 5 }}
            />
        </a>
        <a
            className={"aClass"}
            href={"https://github.com/conductor-sdk/conductor-javascript"}
            target={"_blank"}
        >
            <img
                src="img/JavaScript_logo_2.svg"
                style={{ height: 75, width: 75, margin: 5 }}
            />
        </a>
        <a
            className={"aClass"}
            href={"https://github.com/conductor-sdk/conductor-go"}
            target={"_blank"}
        >
            <img
                src="img/Go_Logo_Blue.svg"
                style={{ height: 75, width: 75, margin: 5 }}
            />
        </a>
        <a
            className={"aClass"}
            href={"https://github.com/conductor-sdk/conductor-csharp"}
            target={"_blank"}
        >
            <img
                src="img/csharp.png"
                style={{ height: 75, width: 75, margin: 5 }}
            />
        </a>
        {/* <h3 style={{ paddingTop:0 }}><a href="https://github.com/conductor-sdk">https://github.com/conductor-sdk</a></h3>
        <a className={"aClass"} href={"https://join.slack.com/t/orkes-conductor/shared_invite/zt-xyxqyseb-YZ3hwwAgHJH97bsrYRnSZg"} target={"_blank"}>
        <IconHeader icon={faSlack} header="Join us on Slack for realtime support from Orkes and Community" />
        </a> */}
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
                                <IconHeader
                                    icon={faSlack}
                                    header="Slack Community"
                                />

                                <p className=" padding-vert--sm">
                                    Use slack for reaching us live. You can also
                                    connect with other Conductor users.
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
                                href={
                                    "https://github.com/Netflix/conductor/discussions"
                                }
                                target={"_blank"}
                            >
                                <IconHeader
                                    icon={faGithub}
                                    header="Github Discussions"
                                />
                                <p className=" padding-vert--sm">
                                    Give us a star and follow for updates on
                                    discussions, releases and other important
                                    notifications
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
    <div className="row">
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
    <div className="">
        <h2>Video Library</h2>
        <div className={styles.videoSection}>
            {videoSource &&
                videoSource.map((item, index) => (
                    <div className={styles.videoColumn} key={index}>
                        <iframe
                            className={styles.customIframe}
                            width="100%"
                            height="230px"
                            src={item.src}
                        ></iframe>
                        <h4 className="padding-top--sm padding-left--sm">
                            {item.title}
                        </h4>
                    </div>
                ))}
        </div>
    </div>
);

export const UseCasesSection = ({}) => (
    <div>
        <h2>Use Cases</h2>
        <div className={styles.useCasesSection}>
            {useCases &&
                useCases.map((item, index) => (
                    <div className={styles.useCase} key={index}>
                        <img src={item.image}></img>
                        <div className={styles.useCaseTitle}>{item.title}</div>
                    </div>
                ))}
        </div>
    </div>
);
