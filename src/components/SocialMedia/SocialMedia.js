import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './SocialMedia.css';
import { SOCIAL_NAV } from '../../constants/AppConsts';

class SocialMedia extends React.Component {

  static propTypes = {
    socialClass: PropTypes.string.isRequired
  };

  render() {
    const socialNav = [...SOCIAL_NAV];
    return (
      <div className={s[this.props.socialClass]}>
        <ul className={s.socialnav}>
          {socialNav.map((item, key) => (
            <li key={key} className={s.socialitem}>
              <Link
                className={cx(s.sociallink, s[item.icon])}
                target="_self"
                to={item.url}
                title={item.title}
              >
                <span className={s.socialtext}>{item.name}</span>
                <i className={s.socialicon} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withStyles(s)(SocialMedia);
