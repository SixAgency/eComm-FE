import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './HeroBanner.css';
import Link from '../Link';

class HeroBanner extends React.Component {
  static propTypes = {
    heroClass: PropTypes.string.isRequired,
    heroBanner: PropTypes.string.isRequired,
    heroText: PropTypes.object,
    bottomText: PropTypes.object,
  }

  static defaultProps = {
    heroText: {
      title: '',
      url: '#',
      link: '',
    },
    bottomText: {
      subtitle: '',
      paragraph: '',
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      transform: 'translate3d(0px, 0px, 0px)',
      heroHeight: '',
    };
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleImageLoad);
    this.handleImageLoad();
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleImageLoad);
  }

  handleImageLoad = () => {
    this.setState({
      heroHeight: this.node.offsetHeight,
    });
  }

  handleScroll = (event) => {
    const parRatio = Math.round((event.srcElement.body.offsetHeight / this.state.heroHeight) + 5);
    const itemTranslate = (-event.srcElement.body.scrollTop / parRatio);

    this.setState({
      transform: `translate3d(0px,${itemTranslate}px,0px)`,
    });
  }

  render = () => {
    const { heroText, bottomText, heroBanner } = this.props;
    return (
      <section
        className={cx(s.herobanner, s[this.props.heroClass])}
        style={{ height: this.state.heroHeight }}
      >
        <div className={s.container} ref={c => (this.node = c)}>
          <div className={s.content} style={{ transform: this.state.transform }}>
            <img className={s.heroimage} src={heroBanner} ref={c => (this.node = c)} alt="Hero Banner" />
            <div className={s.herotext}>
              <h1 className={s.title}>{heroText.title}</h1>
              <Link className={s.link} to={heroText.url}>{heroText.link}</Link>
            </div>
          </div>
        </div>
        <div className={s.bottomtext}>
          <h2 className={s.subtitle}>{bottomText.subtitle}</h2>
          <span className={s.paragraph}>{bottomText.paragraph}</span>
        </div>
      </section>
    );
  }
}

export default withStyles(s)(HeroBanner);
