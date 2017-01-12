import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Biography from './Biography';
// Actions
import setHeaderProps from '../../actions/page';

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
  }
));
class BiographyWrapper extends React.Component {

  static propTypes = {
    setHeaderProps: PropTypes.func.isRequired,
  }

  componentWillMount = () => {
    const props = {
      headerClass: 'default',
      activeSlug: '/biography',
    };
    this.props.setHeaderProps(props);
  }

  render() {
    console.log('client');
    return (
      <Biography />
    );
  }
}

export default connect(null, mapDispatchToProps)(BiographyWrapper);

