import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CartCta.css';
import CtaMessage from './CtaMessage/CtaMessage';
import CtaInfo from './CtaInfo/CtaInfo';

class CartCta extends React.Component {

  static propTypes = {
    toggleGiftcard: React.PropTypes.func.isRequired,
  }

  render() {
    return (
      <div>
        <CtaMessage />
        <CtaInfo toggleGiftcard={this.props.toggleGiftcard} />
      </div>
    );
  }
}

export default withStyles(s)(CartCta);
