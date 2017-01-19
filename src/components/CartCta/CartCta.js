import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CartCta.css';
import CtaMessage from './CtaMessage/CtaMessage';
import CtaInfo from './CtaInfo/CtaInfo';

class CartCta extends React.Component {

  static propTypes = {
    toggleGiftcard: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    isError: PropTypes.bool.isRequired,
  }

  render() {
    return (
      <div>
        <CtaMessage
          message={this.props.message}
          isError={this.props.isError}
        />
        <CtaInfo toggleGiftcard={this.props.toggleGiftcard} infoClass={'infocart'} />
      </div>
    );
  }
}

export default withStyles(s)(CartCta);
