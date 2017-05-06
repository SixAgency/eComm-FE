import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Loader.css';
import image from './loader.jpg';

class Loader extends React.Component {

  static propTypes = {
    loaderClass: PropTypes.string,
    image: PropTypes.string
  }

  render() {
    const bgImage = this.props.image || image;
    return (
      <div className={cx(s.loader, s[this.props.loaderClass])}>
        <div className={s.loaderimage} style={{ backgroundImage: `url(${bgImage})` }} />
        <div className={s.spinner} />
      </div>
    );
  }
}

export default withStyles(s)(Loader);
