import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import { NAV } from '../../constants/AppConsts';
// import setNavigation from '../../utils/utils';

class Navigation extends React.Component {

  static propTypes = {
    activeSlug: PropTypes.string.isRequired,
    navClass: PropTypes.string.isRequired,
    menuOpen: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      currentStyles: {},
    };
  }

  componentDidMount = () => {
    this.setState({
      currentStyles: this.getCurrentStyles(),
    });
  }

  onNavHover = (event) => {
    const currentStyles = {
      width: event.target.parentElement.offsetWidth,
      left: event.target.parentElement.offsetLeft,
      display: 'block',
    };
    this.setState({ currentStyles });
    event.preventDefault();
  }

  onHoverEnd = () => {
    this.setState({
      currentStyles: this.getCurrentStyles(),
    });
  }

  getCurrentStyles = () => {
    let currentStyles = {};
    const elem = Array.from(this.node.childNodes).filter((el) => ((el.className.split(' ').length > 1)));
    currentStyles = {
      left: elem[0].offsetLeft,
      width: elem[0].offsetWidth,
    };
    return currentStyles;
  }


  getActive = (item) => {
    if ((this.props.activeSlug === item.slug)) {
      return s.active;
    }
    return null;
  }

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
            <Link className={s.navlink} to={val.slug}>{val.title}</Link>
            <div className={s.topline} />
          </li>
        ))}
        <li className={s.greenline} style={this.state.currentStyles} />
      </ul>
    );
  }
}

export default withStyles(s)(Navigation);
