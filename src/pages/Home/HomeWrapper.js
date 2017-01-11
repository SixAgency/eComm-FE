import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import setHeaderProps from '../../actions/page';
import Home from './Home';

const mapDispatchToProps = ((dispatch) => (
  {
    setHeaderProps: (props) => dispatch(setHeaderProps(props)),
  }
));
class HomeWrapper extends React.Component {

  static propTypes = {
    gridItems: PropTypes.object.isRequired,
    setHeaderProps: PropTypes.func.isRequired,
  }

  static defaultProps = {
    gridItems: { isLoaded: false, products: [] },
  }

  componentWillMount = () => {
    const props = {
      headerClass: 'default',
      activeSlug: '/',
    };
    this.props.setHeaderProps(props);
  }

  render() {
    console.log('client');
    return (
      <Home gridItems={this.props.gridItems} />
    );
  }
}

export default connect(null, mapDispatchToProps)(HomeWrapper);
