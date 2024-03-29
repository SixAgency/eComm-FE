import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import BasePageComponent from '../BasePageComponent';
import Biography from './Biography';

// Actions
import { setHeaderProps, resetMessages, toggleLoader } from '../../actions/page';

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (toggle) => dispatch(toggleLoader(toggle)),
    resetMessages: () => dispatch(resetMessages())
  }
));

class BiographyWrapper extends BasePageComponent {

  static propTypes = {
    setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired
  };

  componentWillMount = () => {
    const props = {
      headerClass: 'default',
      activeSlug: '/biography'
    };
    this.props.setHeaderProps(props);
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.props.toggleLoader(false);
    }, 500);
  };

  componentWillUnmount = () => {
    console.log('remove');
    this.props.toggleLoader(true);
  };

  render() {
    return (
      <Biography />
    );
  }
}

export default connect(null, mapDispatchToProps)(BiographyWrapper);

