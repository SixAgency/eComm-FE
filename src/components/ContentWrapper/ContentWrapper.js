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

  }

  static defaultProps = {
    isActive: 'login',
    tabs: [],
    tabsClass: 'hidden',
    clickTab: () => (true),
  }

  render() {
    const contentTabs = this.props.tabs;
    return (
      <section className={s.wrapper}>
        <div className={s.contentwrapper}>
          <ul className={cx(s.contenttabs, s[this.props.tabsClass])}>
            {contentTabs.map((v, k) => (
              <li key={k} className={s.tab}>
                <button
                  className={cx(s.button, s[v.cname], s[this.props.isActive])}
                  onClick={this.props.clickTab}
                  title={v.title}
                  id={v.id}
                >
                  {v.name}
                </button>
              </li>
            ))}
          </ul>
          <div className={s.formwrapper}>{this.props.children}</div>
        </div>
      </section>
    );
  }
}

export default withStyles(s)(ContentWrapper);
