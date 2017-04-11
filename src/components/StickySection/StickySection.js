import React from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './StickySection.css';

let pageHeight = 0;

class StickySection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      wrapperClass: 'hidesticky'
    };
  }

  componentDidMount = () => {
    pageHeight = document.body.clientHeight;
    window.addEventListener('scroll', this.stickyScroll);
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.stickyScroll);
  }

  stickyScroll = () => {
    const posCur = window.scrollY;
    if (posCur > pageHeight / 4) {
      this.setState({
        wrapperClass: 'showsticky'
      });
    } else {
      this.setState({
        wrapperClass: 'hidesticky'
      });
    }
  }

  scrollToTop = (duration) => {
    if (duration > 0) {
      const diff = document.body.scrollTop;
      const step = (diff / duration) * 10;
      setTimeout(() => {
        document.body.scrollTop -= step;
        if (document.body.scrollTop > 0) {
          this.scrollToTop(duration - 10);
        }
      }, 10);
    }
  }

  goUp = (e) => {
    e.preventDefault();
    this.scrollToTop(800);
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
              onmouseover="window.status=''"
              onmouseout="window.status=''"
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
