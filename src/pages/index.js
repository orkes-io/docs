import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import SmallDiagram from "/img/small_diagram.png";
import { JavaSample, PythonSample, GoSample } from "./_Languages.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Link from "@docusaurus/Link";
import {
    BuildYourFirstWorkflowLinkButton,
    StepBoxesSection,
    TitleDoubleTextSection,
    WhatIsConductorSection,
    YourfirstWorkflowSection,
    CommunitySection,
    SDKList,
    FirstSection,
    NewToConductorSection,
    LanguagesSection,
    VideoSection,
    UseCasesSection,
    AccordionSection,
} from "./_Sections";

export default function Home() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <div className="homePage">
            <Layout
                title={`${siteConfig.title}`}
                description="Orkes Conductor is a cloud hosted, fully managed version of Netflix Conductor offering full compatibility with the open source version. Use Conductor to hyper charge your application development."
            >
                <main
                    className={`container ${styles.mainContainer} padding-vert--md`}
                >
                    <FirstSection content="Orkes Conductor: the battle-tested, open-source based application orchestration platform for developers." />
                    <FirstSection content="Build composable workflows visually or with code, orchestrate executions across any language and deployment model, and scale your applications with high reliability and observability." />

                    <StepBoxesSection
                        steps={[
                            {
                                title: "Developer Guide",
                                description:
                                    "Learn how to build workflows, discover key concepts, and explore powerful features.",
                                to: "/docs/getting-started",
                            },
                            {
                                title: "Examples",
                                description:
                                    "Examples and easy to get started templates for various use cases",
                                to: "/docs/management",
                            },
                            {
                                title: "Reference Docs",
                                description:
                                    "Conductor features, capabilities and APIs",
                                to: "/docs/developer",
                            },
                        ]}
                    />

                    <NewToConductorSection
                        title="New to Conductor?"
                        description={
                            <div>
                                Discover the possibilities with Orkes Conductor
                                - build microservices, hybrid apps, long-running
                                workflows, and mission-critical applications
                                with high reliability.
                                <br /> Learn the key concepts, set up your
                                cluster, and build your first workflow with our
                                getting started guide.
                            </div>
                        }
                    />
                    <LanguagesSection />
                    <AccordionSection />
                    <UseCasesSection />
                    <VideoSection />
                </main>
            </Layout>
        </div>
    );
}
