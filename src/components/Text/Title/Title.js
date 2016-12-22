import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Title.css';

class Title extends React.Component {
  static propTypes = {
    classname: React.PropTypes.string,
    text: React.PropTypes.string.isRequired,
  }

  render() {
    return (
      <h1 className={s[this.props.classname]}>
        {this.props.text}
      </h1>
    );
  }
}

export default withStyles(s)(Title);
