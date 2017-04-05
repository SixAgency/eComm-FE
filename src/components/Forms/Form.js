import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Forms.css';

class Form extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    onSubmit: PropTypes.func.isRequired,
    formClass: PropTypes.string,
    formTitle: PropTypes.string,
    formSubtitle: PropTypes.string,
    buttonText: PropTypes.string,
    onCancel: PropTypes.func,
    showCancel: PropTypes.bool
  };

  static defaultProps = {
    buttonText: 'Submit',
    showCancel: false
  };

  render() {
    const {
      children,
      formClass,
      formTitle,
      formSubtitle,
      onSubmit,
      onCancel,
      buttonText,
      showCancel
    } = this.props;

    return (
      <div className={cx(s.cformcontent, s[formClass])}>
        {formTitle && <h1 className={s.title}>{formTitle}</h1>}
        {formSubtitle && <h2 className={s.subtitle}>{formSubtitle}</h2>}
        <form className={cx(s.form)} onSubmit={onSubmit}>
          { children }
          <div className={s.buttonwrapper}>
            <input
              className={s.submit}
              type="submit"
              value={buttonText}
            />
            { showCancel && <input
              className={cx(s.submit, s.cancel)}
              type="button"
              value="Cancel"
              onClick={onCancel}
            /> }
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(s)(Form);
