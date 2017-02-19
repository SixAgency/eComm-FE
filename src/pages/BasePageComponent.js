import { PropTypes, Component } from 'react';

class BasePageComponent extends Component {

  static propTypes = {
    route: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    document.title = `${props.route.title || 'Shop'} - krissorbie`;
  }

  render() {
    return null;
  }
}

export default BasePageComponent;
