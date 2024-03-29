import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Biography.css';
import HeroBanner from '../../components/HeroBanner';
import Paragraph from '../../components/Paragraph';
import StaticGrid from '../../components/StaticGrid';
import bioBanner from './biography_banner.jpg';

class Biography extends React.Component {
  render() {
    const bottomText = {
      subtitle: 'About Kris Sorbie',
      paragraph: 'AWARD WINNING ARTISTIC DIRECTOR'
    };
    return (
      <section className={s.page}>
        <HeroBanner
          heroClass={'biographybanner'}
          heroBanner={bioBanner}
          bottomText={bottomText}
        />
        <Paragraph />
        <StaticGrid />
      </section>
    );
  }
}

export default withStyles(s)(Biography);
