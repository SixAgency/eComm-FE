import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Forms.css';

class LostPasswordInputs extends React.Component {

  static propTypes = {
    formTitle: PropTypes.string.isRequired,
    formSubtitle: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    onSubmit: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      authfield: ''
    };
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  }

  handleAuthfield = (event) => {
    this.setState({
      authfield: event.target.value
    });
  }

  render() {
    return (
      <div className={s.cformcontent2}>
        <h1 className={s.title}>{this.props.formTitle}</h1>
        <h2 className={cx(s.subtitle, s.subtitlesmall)}>{this.props.formSubtitle}</h2>
        <form className={s.form} onSubmit={this.onSubmit} >
          <div className={s.inputwrapper3}>
            <label
              className={s.label}
              htmlFor="password"
            >
              Username or email
            </label>
            <input
              id="password"
              className={s.input}
              onChange={this.handleAuthfield}
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
