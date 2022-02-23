import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'What is Conductor?',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        
        <br/>
        What use cases do Conductor solve?
      </>
    ),
  },
  {
    title: 'Conductor Open Source Docs',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        The open source docs for Conductor. build locally, tutorials and all the docs you need to harness the power of Open Source Conductor.
      </>
    ),
  },
  {
    title: 'Conductor Open Source Docs',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        The open source docs for Conductor. build locally, tutorials and all the docs you need to harness the power of Open Source Conductor.
      </>
    ),
  },
  {
    title: 'Orkes Enterprise Docs',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
       Run your Conductor workflow in our managed Cloud.  Try it out with our free playground!.
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
