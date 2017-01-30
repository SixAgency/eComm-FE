import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import ksMannequinHeads from './ksMannequinHeads';
// Actions
import { setHeaderProps, resetMessages, toggleLoader } from '../../actions/page';
// import sendContact from '../../actions/contact';

const mapStateToProps = ((state) => (
  {
    // isSent: state.contact.isSent,
    // message: state.contact.message,
  }
));

const mapDispatchToProps = ((dispatch) => (
  {
    // setHeaderProps: (props) => dispatch(setHeaderProps(props)),
    toggleLoader: (toggle) => dispatch(toggleLoader(toggle)),
    // resetMessages: () => dispatch(resetMessages()),
    // sendContact: () => dispatch(sendContact()),
  }
));

class ksMannequinHeadsWrapper extends Component {

  static propTypes = {
    // setHeaderProps: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired,
    // sendContact: PropTypes.func.isRequired,
    // isSent: PropTypes.bool.isRequired,
    // message: PropTypes.string.isRequired,
  }

  // componentWillMount = () => {
  //   const props = {
  //     // headerClass: 'colored',
  //     // activeSlug: '/contact',
  //   };
  //   this.props.setHeaderProps(props);
  // }

  componentDidMount = () => {
    setTimeout(() => {
      this.props.toggleLoader(false);
    }, 500);
  }

  componentWillUnmount = () => {
    console.log('remove');
    this.props.toggleLoader(true);
  }

  render() {
    console.log('client');
    return (
      <ksMannequinHeads />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ksMannequinHeadsWrapper);

