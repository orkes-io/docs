import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTwitter} from "@fortawesome/free-brands-svg-icons/faTwitter";
import {faYoutube} from "@fortawesome/free-brands-svg-icons/faYoutube";
import {faLinkedin} from "@fortawesome/free-brands-svg-icons/faLinkedin";
import {faDiscord} from "@fortawesome/free-brands-svg-icons/faDiscord";
import {faGithub} from "@fortawesome/free-brands-svg-icons/faGithub";
import {faSlack} from "@fortawesome/free-brands-svg-icons/faSlack";

const FeatureList = [
  {
    title: 'Getting Started',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Learn about how to get started on your local. Build your first workflow and learn the key features of Conductor.
      </>
    ),
  },
  {
    title: 'SDKs (Client Libraries)',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Our support for multiple languages will make it easy for you to go to production.
      </>
    ),
  },
  {
    title: 'Production Deployment',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Learn how to install and manage a production environment for Conductor. This section also covers details of how
          you can run at scale.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section>
      <div className="midSectionOdd">
          <div style={{
              width: 550,
              padding: 20,
              paddingTop: 40
          }}><h4 style={{
                  fontSize: 18,
                  fontFamily: "Gothic A1",
                  fontWeight: "bold",
              }}>What is Conductor?</h4>
              <ul style={{paddingTop: 10}}>
                  <li className={"liClass"}>
                      Conductor is an open-source, Apache 2.0 licensed microservices and workflow orchestration framework
                  </li>
                  <li className={"liClass"}>
                      With Conductor you can build highly reliable distributed applications using the language of choice
                  </li>
                  <li className={"liClass"}>
                      Conductor scales seamlessly whether you have a few hundred workflow executions or a few billion
                  </li>
                  <li className={"liClass"}>
                      Conductor is battle tested and runs mission critical workflows for organizations ranging from startups to Fortune 100s
                  </li>
              </ul>
          </div>
          <div style={{
              width: 550,
              padding: 20,
              paddingTop: 40
          }}>
              <iframe width={"550"} height={"300"} src={"https://www.youtube.com/embed/du7mls9XMUE"}
                      title={"Orkes"} frameBorder={"0"}
                      allow={"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}
                      allowFullScreen></iframe>
          </div>
      </div>
      <div className="midSectionPair">
          <div style={{
              width: 550,
              padding: 20,
              paddingTop: 40
          }}><h4 style={{
                  fontSize: 18,
                  fontFamily: "Gothic A1",
                  fontWeight: "bold",
              }}>Why should you use Conductor?</h4>
              <ul style={{paddingTop: 10}} className="liClass">
                  <li >
                    Lets you focus on coding the business logic of the application instead of managing the state and complexities of a distributed ecosystem
                  </li>
                  <li >
                    You can cleanly decouple the design of the application flow from the implementation
                  </li>
                  <li >
                    Your application’s resilience is increased with native support in Conductor for retries, error handling and rich metrics
                  </li>
                  <li >
                    You have a powerful visualizations of your application’s execution paths that can shorten debugging times from hours to minutes
                  </li>
              </ul>
          </div>
          <div style={{
              width: 550,
              padding: 20,
              paddingTop: 40
          }}>
            <h4 style={{
                  fontSize: 18,
                  fontFamily: "Gothic A1",
                  fontWeight: "bold",
              }}>What can you build with Conductor?</h4>
              <ul style={{paddingTop: 10}} className="liClass">
                  <li >
                    Applications composed of distributed microservices or serverless functions
                  </li>
                  <li >
                    Hybrid applications that span across multiple deployment models (e.g. VM deployed monolith, kubernetes deployed containers)
                  </li>
                  <li >
                    Long running workflows that need to wait for days, months or even years between executions (e.g. monthly subscription billing)
                  </li>
                  <li >
                    Mission critical applications with high reliability requirements (e.g. financial transactions)
                  </li>
              </ul>
          </div>
      </div>
        <div className="midSectionOdd">
            <div style={{
                width: 1100,
                padding: 20,
                paddingTop: 60,
            }}>
                <h4 style={{
                    fontSize: 18,
                    fontFamily: "Gothic A1",
                    fontWeight: "bold",
                }}>Conductor Community</h4>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                }}>
                    <div className={"communityClassWrapper"}>
                        <a className={"aClass"} href={"https://join.slack.com/t/orkes-conductor/shared_invite/zt-xyxqyseb-YZ3hwwAgHJH97bsrYRnSZg"}
                           target={"_blank"}>
                            <div className={"communityClass"}>
                                <div className={"communityClassHeader"}>
                                    <FontAwesomeIcon style={{fontSize: 30}} icon={faSlack} />
                                    <h4>Join Slack Community</h4>
                                </div>
                                <p>Use slack for reaching us live. You can also connect with other Conductor users.</p>
                            </div>
                        </a>
                    </div>
                    <div className={"communityClassWrapper"}>
                        <a className={"aClass"} href={"https://github.com/Netflix/conductor"} target={"_blank"}>
                            <div className={"communityClass"}>
                                <div className={"communityClassHeader"}>
                                    <FontAwesomeIcon style={{fontSize: 30}} icon={faGithub} />
                                    <h4>Github Repository</h4>
                                </div>
                                <p>Give us a star and follow for updates on discussions, releases and other important
                                    notifications</p>
                            </div>
                        </a>
                    </div>
                    <div className={"communityClassWrapper"}>
                        <a className={"aClass"} href={"https://discord.com/invite/P6vVt9xKSQ"} target={"_blank"}>
                            <div className={"communityClass"}>
                                <div className={"communityClassHeader"}>
                                    <FontAwesomeIcon style={{fontSize: 30}} icon={faDiscord} />
                                    <h4>Join Discord Community</h4>
                                </div>
                                <p>Prefer discord? You can connect with us on Discord too.</p>
                            </div>
                        </a>
                    </div>
                    <div className={"communityClassWrapper"}>
                        <a className={"aClass"} href={"https://www.linkedin.com/company/orkes-inc/"} target={"_blank"}>
                            <div className={"communityClass"}>
                                <div className={"communityClassHeader"}>
                                    <FontAwesomeIcon style={{fontSize: 30}} icon={faLinkedin} />
                                    <h4>LinkedIn</h4>
                                </div>
                                <p>Follow our company on LinkedIn to receive news around our hiring, job openings and
                                    more.</p>
                            </div>
                        </a>
                    </div>
                    <div className={"communityClassWrapper"}>
                        <a className={"aClass"} href={"https://twitter.com/orkesio"} rel={"noopener"} target={"_blank"}>
                            <div className={"communityClass"}>
                                <div className={"communityClassHeader"}>
                                    <FontAwesomeIcon style={{fontSize: 30}} icon={faTwitter} />
                                    <h4>Twitter Community</h4>
                                </div>
                                <p>Follow us on twitter @orkesio to get updates real time</p>
                            </div>
                        </a>
                    </div>
                    <div className={"communityClassWrapper"}>
                        <a className={"aClass"} href={"https://www.youtube.com/channel/UCI7sk4DD6F6r9CWg9gHRlVg"} rel={"noopener"}
                           target={"_blank"}>
                            <div className={"communityClass"}>
                                <div className={"communityClassHeader"}>
                                    <FontAwesomeIcon style={{fontSize: 30}} icon={faYoutube} />
                                    <h4>Youtube Channel</h4>
                                </div>
                                <p>Follow our youtube channel for watching meetup recaps, how to and learning
                                    videos.</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
