import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';

// Components
import HeroBanner from '../../components/HeroBanner';
import Grid from '../../components/Grid';
import homeBanner from './home_banner.jpg';
import ErrorDisplay from '../../components/ErrorDisplay';

class Home extends Component {
  static propTypes = {
    gridItems: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired,
    cartItems: PropTypes.array.isRequired,
    setMessage: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired
  };

  static defaultProps = {
    addToCart: () => (true)
  };

  render() {
    const heroText = {
      title: 'Now available the NEW',
      link: 'ks mannequin heads',
      url: '/ks-mannequin-heads'
    };
    const bottomText = { subtitle: 'Shop Now' };
    return (
      <section className={s.page}>
        <HeroBanner
          heroClass="homebanner"
          heroBanner={homeBanner}
          heroText={heroText}
          bottomText={bottomText}
        />
        <ErrorDisplay
          messages={this.props.messages}
          isError
        />
        <Grid
          gridClass="productsgrid"
          gridItems={this.props.gridItems}
          addToCart={this.props.addToCart}
          cartItems={this.props.cartItems}
          setMessage={this.props.setMessage}
        />
      </section>
    );
  }
}

export default withStyles(s)(Home);
