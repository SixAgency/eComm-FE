import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import HeroBanner from '../../components/HeroBanner';
import homeBanner from './home_banner.jpg';

class Home extends React.Component {
  render() {
    const heroText = {
      title: 'Now available the NEW',
      link: 'ks mannequin heads',
      url: '/ks-mannequin-heads',
    };
    const bottomText = { subtitle: 'Shop Now' };
    return (
      <section className={s.page}>
        <HeroBanner
          heroClass={'homebanner'}
          heroBanner={homeBanner}
          heroText={heroText}
          bottomText={bottomText}
        />
      </section>
    );
  }
}

export default withStyles(s)(Home);
