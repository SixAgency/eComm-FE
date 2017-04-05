import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ToggleLink.css';

class ToggleLink extends React.Component {
  static propTypes = {
    toggleForm: PropTypes.func.isRequired,
    preText: PropTypes.string,
    linkText: PropTypes.string,
    className: PropTypes.string
  };

  render() {
    const { toggleForm, className, preText, linkText } = this.props;
    return (
      <div className={cx(s.infowrpr, s[className])}>
        {preText} &nbsp;
        <a
          href="/"
          className={s.togglelink}
          onClick={toggleForm}
        >{linkText}</a>
      </div>
    );
  }
}

export default withStyles(s)(ToggleLink);
