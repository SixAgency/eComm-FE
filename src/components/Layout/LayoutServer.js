import React, { PropTypes } from 'react';
import LayoutContent from './LayoutContent';

class Layout extends React.Component {

  static propTypes = {
    headerProps: PropTypes.object.isRequired,
    cartItems: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired
  };

  static defaultProps = {
    cartItems: { isLoaded: false, isEmpty: true, cart: {} }
  };

  mobileNavOpen = () => (true);
  mobileNavClose = () => (true);

  render() {
    const { headerClass, activeSlug } = this.props.headerProps;
    const showLoader = { toggle: true, image: null };
    const showModal = true;
    const modalContent = '';
    return (
      <LayoutContent
        headerClass={headerClass}
        activeSlug={activeSlug}
        cartItems={this.props.cartItems}
        mobileNavOpen={this.mobileNavOpen}
        mobileNavClose={this.mobileNavClose}
        proceedToCheckout={() => (true)}
        toggleLoader={() => (true)}
        getProduct={() => (true)}
        showModal={showModal}
        modalContent={modalContent}
        showLoader={showLoader}
        layoutStyles={{ opacity: 0 }}
        menuOpen={''}
      >{this.props.children}</LayoutContent>
    );
  }
}

export default Layout;
