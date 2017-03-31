import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ProductTab.css';

class ProductTab extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
    open: PropTypes.bool,
    onClick: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className={cx(s.tab, this.props.open ? s.open : '')} onClick={this.props.onClick}>
        <h3
          className={s.title}
        >
            {this.props.title}
        </h3>
        <div className={s.content}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ProductTab);
