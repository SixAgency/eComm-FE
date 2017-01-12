import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Forms.css';

class LostPasswordInputs extends React.Component {

  static propTypes = {
    formTitle: PropTypes.string.isRequired,
    formSubtitle: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    onSubmit: PropTypes.func,
  }

  render() {
    return (
      <div className={s.cformcontent2}>
        <h1 className={s.title}>{this.props.formTitle}</h1>
        <h2 className={cx(s.subtitle, s.subtitlesmall)}>{this.props.formSubtitle}</h2>
        <form className={s.form} onSubmit={this.props.onSubmit} >
          <div className={s.inputwrapper2}>
            <label
              className={s.label}
              htmlFor="password"
            >
              Username or email
            </label>
            <input
              id="password"
              className={s.input}
            />
          </div>
          <div className={s.buttonwrapper2}>
            <input
              className={s.submit}
              type="submit"
              value={this.props.buttonText}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(s)(LostPasswordInputs);
