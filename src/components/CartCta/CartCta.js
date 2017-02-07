import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CartCta.css';
import CtaInfo from './CtaInfo/CtaInfo';

class CartCta extends React.Component {

  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    toggleGiftcard: PropTypes.func.isRequired,
    toggleLogin: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div>
        <CtaInfo
          loggedIn={this.props.loggedIn}
          toggleGiftcard={this.props.toggleGiftcard}
          toggleLogin={this.props.toggleLogin}
          infoClass={'infocart'}
        />
      </div>
    );
  }
}

export default withStyles(s)(CartCta);
