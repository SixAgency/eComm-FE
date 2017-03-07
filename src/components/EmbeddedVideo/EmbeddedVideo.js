import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import renderHTML from 'react-render-html';
import s from './EmbeddedVideo.css';

class EmbeddedVideo extends Component {
  static propTypes = {
    embeddedCode: PropTypes.string.isRequired
  }

  render() {
    return (
      <div className={s.videocontainer}>
        {renderHTML(this.props.embeddedCode)}
      </div>
    );
  }
}

export default withStyles(s)(EmbeddedVideo);

