import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

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
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
