import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ErrorPopup.css';

class ErrorPopup extends Component {

  static propTypes = {
    showError: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onProceed: PropTypes.func.isRequired
  }

  render() {
    const visibility = this.props.showError ? 'show' : 'hide';
    return (
      <div className={cx(s.errorwrapper, s[visibility])}>
        <div className={s.errorbody}>
          <p>
            The address you are trying to edit is currently in use.
            Are you sure you want to proceed with the change?
          </p>
          <div>
            <button
              className={cx(s.option, s.cancel)}
              onClick={(e) => { e.preventDefault(); this.props.onCancel(); }}
            >
              Cancel
            </button>
            <button
              className={cx(s.option, s.proceed)}
              onClick={(e) => { e.preventDefault(); this.props.onProceed(); }}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ErrorPopup);
