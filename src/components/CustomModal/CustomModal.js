import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './CustomModal.css';
import SquareWrapper from '../Square';

class CustomModal extends Component {

  static propTypes = {
    modalContent: PropTypes.string.isRequired,
    showModal: PropTypes.bool.isRequired
  };

  getContent = () => (<SquareWrapper />);

  render() {
    const visibility = this.props.showModal ? 'show' : 'hide';
    return (
      <div className={cx(s.custommodal, s[visibility])}>
        <div className={s.modalbodywrapper}>
          <div className={s.modalbody}>
            {this.getContent()}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(CustomModal);
