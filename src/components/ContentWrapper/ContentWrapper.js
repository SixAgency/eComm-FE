import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ContentWrapper.css';

class ContentWrapper extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    clickTab: PropTypes.func,
    tabs: PropTypes.array,
    tabsClass: PropTypes.string,
    isActive: PropTypes.string,
    wrprClass: PropTypes.string,
    contentClass: PropTypes.string,
    isError: PropTypes.bool,
    message: PropTypes.string,
    noPaddingClass: PropTypes.string,
    isSent: PropTypes.bool,
  }

  static defaultProps = {
    isActive: 'login',
    tabs: [],
    tabsClass: 'hidden',
    clickTab: () => (true),
  }

  getActive = (id) => {
    if (id === this.props.isActive) {
      return 'active';
    }
    return '';
  }

  getDisabled = (id) => {
    if (id === this.props.isActive) {
      return false;
    }
    return true;
  }

  render() {
    const contentTabs = this.props.tabs;
    return (
      <section className={cx(s.wrapper, s[this.props.noPaddingClass])}>
        <div className={cx(s.contentwrapper, s[this.props.wrprClass])}>
          <ul className={cx(s.contenttabs, s[this.props.tabsClass])}>
            {contentTabs.map((v, k) => (
              <li key={k} className={s.tab}>
                <button
                  className={cx(s.button, s[v.cname], s[this.getActive(v.id)])}
                  onClick={this.props.clickTab}
                  title={v.title}
                  id={v.id}
                  disabled={this.getDisabled(v.id)}
                >
                  {v.name}
                </button>
              </li>
            ))}
          </ul>
          <div className={cx(s.formwrapper, s[this.props.contentClass])}>{this.props.children}</div>
        </div>
      </section>
    );
  }
}

export default withStyles(s)(ContentWrapper);
