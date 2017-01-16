import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ErrorDisplay.css';

class ErrorDisplay extends React.Component {
  static propTypes = {
    message: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      backgroundClass: '',
      content: '',
    };
  }

  componentDidMount = () => {
    const content = this.setContent();
    this.setState({
      backgroundClass: this.props.isError ? 'wrprpink' : 'wrprgreen',
      content,
    });
  }

  setContent = () => {
    let content;
    if (this.props.isError) {
      content = this.props.message.map((item, index) => (
        <li index={index} className={s.message}>
          Error: {item}
        </li>
      ));
    } else {
      content = <li className={s.message}>{this.props.message}</li>;
    }
    return content;
  }

  render() {
    return (
      <ul className={cx(s.errorwrpr, s[this.state.backgroundClass])}>
        {this.state.content}
      </ul>
    );
  }
}

export default withStyles(s)(ErrorDisplay);

