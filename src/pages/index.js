import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '../components/HomepageFeatures';

const boxWidth = 240;
const boxMargin = 20;

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
    let aLinkStyle = {
    };
    let headerBoxStyle = {
        fontSize: 17,
        fontFamily: "Gothic A1",
        fontWeight: "bold",
    };
    let headerBoxTextStyle = {
        fontSize: 14,
        fontFamily: "Gothic A1",
        fontWeight: 400,
    };
    return (
    <header className={"homeHeader"}>
        <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
            paddingTop: 20,
            paddingBottom: 40,
        }}>
            <a href={"/content/docs/introduction"} style={aLinkStyle} className={"aClass"}>
                <div style={{
                    height: 150,
                    width: boxWidth,
                    marginLeft: boxMargin,
                    marginTop: boxMargin,
                    marginRight: boxMargin,
                    padding: 20,
                    border: "1px solid grey",
                    borderRadius: 5,
                }}>
                    <h4 style={headerBoxStyle}>Getting Started</h4>
                    <p style={headerBoxTextStyle}>
                        Learn about Conductor and its concepts
                    </p>
                </div>
            </a>
            <a href={"/content/docs/getting-started/install/running-locally#download-and-run"} style={aLinkStyle} className={"aClass"}>
                <div style={{
                    height: 150,
                    width: boxWidth,
                    marginLeft: boxMargin,
                    marginTop: boxMargin,
                    marginRight: boxMargin,
                    padding: 20,
                    border: "1px solid grey",
                    borderRadius: 5,
                }}>
                    <h4 style={headerBoxStyle}>Running Conductor</h4>
                    <p style={headerBoxTextStyle}>
                        Learn how to run Conductor locally and via Docker
                    </p>
                </div>
            </a>
            <a href={"/content/docs/getting-started/run/running-first-workflow"} style={aLinkStyle} className={"aClass"}>
                <div style={{
                    height: 150,
                    width: boxWidth,
                    marginLeft: boxMargin,
                    marginTop: boxMargin,
                    marginRight: boxMargin,
                    padding: 20,
                    border: "1px solid grey",
                    borderRadius: 5,
                }}>
                    <h4 style={headerBoxStyle}>Running First Workflow</h4>
                    <p style={headerBoxTextStyle}>
                        Run a workflow to see Conductor in action
                    </p>
                </div>
            </a>
            <a href={"/content/docs/getting-started/run/running-first-worker"} style={aLinkStyle} className={"aClass"}>
                <div style={{
                    height: 150,
                    width: boxWidth,
                    marginLeft: boxMargin,
                    marginTop: boxMargin,
                    marginRight: boxMargin,
                    padding: 20,
                    border: "1px solid grey",
                    borderRadius: 5,
                }}>
                    <h4 style={headerBoxStyle}>Running First Worker</h4>
                    <p style={headerBoxTextStyle}>
                        Add a custom worker that runs your code as part of a workflow
                    </p>
                </div>
            </a>
        </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Orkes Conductor is a cloud hosted, fully managed version of Netflix Conductor offering full compatibility with the open source version. Use Conductor to hyper charge your application development.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
