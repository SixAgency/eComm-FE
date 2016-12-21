import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Loader.css';

class Loader extends React.Component {

  static propTypes = {
    loaderClass: PropTypes.string,
  }

  render() {
    return (
      <div className={cx(s.loader, s.hidden, s[this.props.loaderClass])}>
        <div className={s.loaderimage} />
        <div className={s.spinner} />
      </div>
    );
  }
}

export default withStyles(s)(Loader);
