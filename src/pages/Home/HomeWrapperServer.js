import React, { PropTypes } from 'react';
import Home from './Home';

class HomeWrapper extends React.Component {

  static propTypes = {
    gridItems: PropTypes.object.isRequired,
  }

  static defaultProps = {
    gridItems: { isLoaded: false, products: [] },
  }

  render() {
    console.log('server');
    return (
      <Home gridItems={this.props.gridItems} />
    );
  }
}

export default HomeWrapper;
