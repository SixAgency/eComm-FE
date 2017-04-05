import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ContentTabs.css';

class ContentTabs extends React.Component {
  static propTypes = {
    tabs: PropTypes.array.isRequired,
    activeTab: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    setDisabled: PropTypes.func
  };

  /**
   * Set button's disabled attribute
   * by default returns false.
   * @param elem
   * @returns {*}
   */
  setDisabled = (elem) => {
    const { setDisabled } = this.props;
    if (setDisabled) {
      return setDisabled(elem);
    }
    return false;
  };

  /**
   * Returns 'active' class for the appropriate element
   * @param id
   */
  getActive = (id) => (this.props.activeTab === id ? 'active' : '');

  render() {
    const {
      tabs,
      onClick
    } = this.props;
    return (
      <ul className={cx(s.contenttabs)}>
        {tabs.map((v, k) => (
          <li key={k} className={s.tab}>
            <button
              className={cx(s.button, s[this.getActive(v.id)])}
              onClick={onClick}
              title={v.title}
              id={v.id}
              disabled={this.setDisabled(v)}
            >
              {v.name}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

export default withStyles(s)(ContentTabs);
