import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Subtitle.css';

class Subtitle extends React.Component {
  static propTypes = {
    classname: React.PropTypes.string,
    text: React.PropTypes.string.isRequired,
  }

  render() {
    return (
      <h2 className={s[this.props.classname]}>
        {this.props.text}
      </h2>
    );
  }
}

export default withStyles(s)(Subtitle);
