import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ErrorDisplay.css';

class ErrorDisplay extends React.Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    isError: PropTypes.bool.isRequired,
    loggedIn: PropTypes.bool.isRequired,
  }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     backgroundClass: '',
  //     content: '',
  //   };
  // }

  // componentWillMount = () => {
  //   if (this.props.isError) {
  //     const content = this.setContent();
  //     this.setState({
  //       backgroundClass: this.props.isError ? 'wrprpink' : 'wrprgreen',
  //       content,
  //     });
  //   } else {
  //     this.setState({
  //       backgroundClass: 'wrprhide',
  //     });
  //   }
  // }

  // componentWillUnmount = () => {
  //   if (!this.props.isError) {
  //     this.setState({
  //       backgroundClass: 'wrprhide',
  //     });
  //   }
  // }

  // setContent = () => {
  //   let content;
  //   if (this.props.isError) {
  //     content = this.props.message.map((item, index) => (
  //       <li index={index} className={s.message}>
  //         Error: {item}
  //       </li>
  //     ));
  //   } else {
  //     content = <li className={s.message}>{this.props.message}</li>;
  //   }
  //   return content;
  // }

  render() {
    if (this.props.message === '') {
      return null;
    }
    // const message = this.props.message;
    const bg = this.props.isError ? 'wrprpink' : 'wrprgreen';
    return (
      <ul className={cx(s.errorwrpr, s[bg])}>
        <li className={s.message}>{this.props.message}</li>
      </ul>
    );
  }
}

export default withStyles(s)(ErrorDisplay);

