import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Category.css';
import HeroBanner from '../../components/HeroBanner';
import Grid from '../../components/Grid';
import ErrorDisplay from '../../components/ErrorDisplay';
import homeBanner from './home_banner.jpg';

class Category extends React.Component {
  static propTypes = {
    gridItems: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired,
    cartItems: PropTypes.object.isRequired,
    isError: PropTypes.bool.isRequired,
    messages: PropTypes.array.isRequired,
    setMessage: PropTypes.func.isRequired
  };
  render() {
    const bottomText = { subtitle: 'Shop Now' };
    return (
      <section className={s.page}>
        <HeroBanner
          heroClass={'homebanner'}
          heroBanner={homeBanner}
          bottomText={bottomText}
        />
        <ErrorDisplay messages={this.props.messages} isError={this.props.isError} />
        <Grid
          gridClass={'productsgrid'}
          gridItems={this.props.gridItems}
          addToCart={this.props.addToCart}
          cartItems={this.props.cartItems.cart.line_items}
          isError={this.props.isError}
          messages={this.props.messages}
          setMessage={this.props.setMessage}
        />
      </section>
    );
  }
}

export default withStyles(s)(Category);
