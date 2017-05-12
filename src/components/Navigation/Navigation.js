import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import { NAV } from '../../constants/AppConsts';

class Navigation extends React.Component {

  static propTypes = {
    activeSlug: PropTypes.string.isRequired,
    navClass: PropTypes.string.isRequired,
    menuOpen: PropTypes.string,
    isMobile: PropTypes.bool.isRequired,
    getProduct: PropTypes.func.isRequired,
    toggleLoader: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      currentStyles: {},
      currentUrl: '/'
    };
  }

  componentDidMount = () => {
    console.log('MOUNT');
    this.setState({
      currentStyles: this.getCurrentStyles()
    });
  };

  componentDidUpdate = (prevProps) => {
    // Reset the green line position to active navitem
    if (this.props.activeSlug !== prevProps.activeSlug) {
      this.setState({
        currentStyles: this.getCurrentStyles()
      });
    }
  };

  onNavHover = (event) => {
    const currentStyles = {
      width: event.target.parentElement.offsetWidth,
      left: event.target.parentElement.offsetLeft,
      display: 'block'
    };
    this.setState({ currentStyles });
    event.preventDefault();
  };

  onHoverEnd = () => {
    this.setState({
      currentStyles: this.getCurrentStyles()
    });
  };

  getCurrentStyles = () => {
    let currentStyles = {};
    const elem = Array.from(this.node.childNodes).filter((el) => ((el.className.split(' ').length > 1)));
    currentStyles = {
      left: elem[0].offsetLeft,
      width: elem[0].offsetWidth
    };
    return currentStyles;
  };


  getActive = (item) => {
    if ((this.props.activeSlug === item.slug)) {
      return s.active;
    }
    if (this.props.isMobile && this.props.activeSlug === '/product/mentoring-program-day' && item.slug === '/') {
      return s.active;
    }
    return null;
  };

  handleClick = (slug) => {
    if (slug === '/product/mentoring-program-day') {
      this.props.getProduct('mentoring-program-day');
      this.props.toggleLoader(true);
      setTimeout(() => {
        browserHistory.push('/product/mentoring-program-day');
      }, 250);
    } else {
      browserHistory.push(slug);
    }
  };

  render() {
    const navItems = [...NAV];
    return (
      <ul className={cx(s[this.props.navClass], s[this.props.menuOpen])} ref={c => (this.node = c)} role="navigation">
        {navItems.map((val, key) => (
          <li
            key={key}
            className={cx(s.navitem, this.getActive(val))}
            onMouseEnter={this.onNavHover}
            onMouseLeave={this.onHoverEnd}
          >
            <Link
              className={s.navlink}
              onClick={() => this.handleClick(val.slug)}
              to={val.slug}
            >{val.title}</Link>
            <div className={s.topline} />
          </li>
        ))}
        <li className={s.greenline} style={this.state.currentStyles} />
      </ul>
    );
  }
}

export default withStyles(s)(Navigation);
