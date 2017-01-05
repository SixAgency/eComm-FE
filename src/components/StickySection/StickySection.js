import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './StickySection.css';
import Link from '../Link';

class StickySection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      wrapperClass: 'hidesticky',
    };
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.stickyScroll);
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.headerScroll);
  }

  stickyScroll = () => {
    const posCur = window.scrollY;
    if (posCur > 700) {
      this.setState({
        wrapperClass: 'showsticky',
      });
    } else {
      this.setState({
        wrapperClass: 'hidesticky',
      });
    }
  }

  goUp = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className={cx(s.stickywrpr, s[this.state.wrapperClass])}>
        <div className={s.actionscontainer}>
          <div className={s.scrolltop}>
            <a
              href=""
              className={cx(s.actions)}
              onClick={this.goUp}
            >
              <i className={s.iconup} />
            </a>
          </div>
          <h2 className={s.gohomewrpr}>
            <Link
              className={cx(s.actions, s.gohomelink)}
              to="/"
            >
                Home
            </Link>
          </h2>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(StickySection);
