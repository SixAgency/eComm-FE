import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ContentWrapper.css';
import ContentTabs from '../ContentTabs';

class ContentWrapper extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    showContentTabs: PropTypes.bool,
    activeTab: PropTypes.string,
    tabs: PropTypes.array,
    wrprClass: PropTypes.string,
    contentClass: PropTypes.string,
    noPaddingClass: PropTypes.string,
    clickTab: PropTypes.func,
    setDisabled: PropTypes.func
  };

  render() {
    const {
      children,
      noPaddingClass,
      wrprClass,
      contentClass,
      showContentTabs,
      tabs,
      activeTab,
      clickTab,
      setDisabled
    } = this.props;
    return (
      <section className={cx(s.wrapper, s[noPaddingClass])}>
        <div className={cx(s.contentwrapper, s[wrprClass])}>
          {showContentTabs && <ContentTabs
            tabs={tabs}
            activeTab={activeTab}
            onClick={clickTab}
            setDisabled={setDisabled}
          />}
          <div className={cx(s.formwrapper, s[contentClass])}>{children}</div>
        </div>
      </section>
    );
  }
}

export default withStyles(s)(ContentWrapper);
