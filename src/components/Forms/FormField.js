import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Forms.css';

class FormField extends React.Component {
  static propTypes = {
    elem: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any,
    options: PropTypes.array
  };

  render() {
    const { elem, value, options, onChange } = this.props;
    const selectWrapper = elem.isSelect ? 'selectwrapper' : '';
    return (
      <div className={cx(s.inputwrapper, s[elem.className], s[selectWrapper])}>
        {elem.label && <label
          className={s.label}
          htmlFor={elem.name}
        >
          {elem.label} {elem.required && <abbr>*</abbr>}
        </label>}
        {elem.isInput && <input
          id={elem.name}
          type={elem.type}
          name={elem.name}
          value={value}
          className={s.input}
          disabled={elem.disabled}
          placeholder={elem.placeholder}
          onChange={(event) => onChange(elem.name, event.target.value)}
        />}
        {elem.isSelect && <select
          name={elem.name}
          id={elem.name}
          value={value}
          className={s[elem.selectClass]}
          onChange={(event) => onChange(elem.name, event.target.value)}
        >
          <option value={''}>Select an option...</option>
          {options.map((option) => (
            <option value={option.id} key={option.id}>{option.name}</option>
            )
          )}
        </select>}
        {elem.isStatic && <strong>{elem.value}</strong>}
      </div>
    );
  }
}

export default withStyles(s)(FormField);
