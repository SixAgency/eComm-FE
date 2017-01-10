import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import Link from '../../Link';
import s from './../ProductGridItem.css';

class ProductAction extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
  }

  static defaultProps = {
    link: '/',
    action: () => (true),
  }

  render() {
    return (
      <Link
        className={cx(s.button, s.select)}
        to={this.props.link}
        onClick={this.props.action}
      >
        {this.props.text}
      </Link>
    );
  }
}

export default withStyles(s)(ProductAction);
