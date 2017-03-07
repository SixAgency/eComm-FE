import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import renderHTML from 'react-render-html';
import s from './EmbeddedVideo.css';

class EmbeddedVideo extends Component {
  static propTypes = {
    videoObj: PropTypes.object.isRequired
  }

  render() {
    return (
      <div className={s.videocontainer}>
        {renderHTML(this.props.videoObj.value)}
      </div>
    );
  }
}

export default withStyles(s)(EmbeddedVideo);

