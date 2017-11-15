import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';
import SocialMedia from '../SocialMedia/SocialMedia';
import StickySection from '../StickySection';

class Footer extends React.Component {
  render() {
    return (
      <footer className={s.footer}>
        <SocialMedia socialClass={'socialfooter'} />
        <p className={s.credits}>© Kris Sorbie Inc. All rights reserved. 2017</p>
        <StickySection />
      </footer>
    );
  }
}

export default withStyles(s)(Footer);
