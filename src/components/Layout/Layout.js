import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LayoutContent from './LayoutContent';

const mapStateToProps = ((state) => ({ headerProps: state.page.headerProps }));

class Layout extends React.Component {

  static propTypes = {
    headerProps: PropTypes.object.isRequired,
    cartItems: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    cartItems: { isLoaded: false, isEmpty: true },
  }

  constructor(props) {
    super(props);
    this.state = {
      menuOpen: '',
      styles: { opacity: 0 },
    };
  }

  componentDidMount = () => {
    this.setState({
      styles: { opacity: 1 },
    });
  }

  mobileNavOpen = (event) => {
    event.preventDefault();
    this.setState({
      menuOpen: 'menuopen',
    });
  }

  mobileNavClose = (event) => {
    event.preventDefault();
    this.setState({
      menuOpen: '',
    });
  }

  render() {
    console.log(this.props.headerProps);
    const { headerClass, activeSlug } = this.props.headerProps;
    return (
      <LayoutContent
        headerClass={headerClass}
        activeSlug={activeSlug}
        cartItems={this.props.cartItems}
        mobileNavOpen={this.mobileNavOpen}
        mobileNavClose={this.mobileNavClose}
        menuOpen={this.state.menuOpen}
        styles={this.state.styles}
      >{this.props.children}</LayoutContent>
    );
  }
}

export default connect(mapStateToProps)(Layout);
