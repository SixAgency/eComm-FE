import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EmbeddedVideo.css';

class EmbeddedVideo extends Component {
  static propTypes = {
    videoObj: PropTypes.object.isRequired
  }

  render() {
    return (
      <div className={s.videocontainer}>
        <video
          width="310"
          height="180"
          controls
        >
          <source src={this.props.videoObj.value} type="video/mp4" />
        </video>
      </div>
    );
  }
}

export default withStyles(s)(EmbeddedVideo);

