import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Category.css';
import HeroBanner from '../../components/HeroBanner';
import Grid from '../../components/Grid';
import homeBanner from './home_banner.jpg';

class Category extends React.Component {
  static propTypes = {
    gridItems: React.PropTypes.object.isRequired,
  }
  render() {
    const bottomText = { subtitle: 'Shop Now' };
    return (
      <section className={s.page}>
        <HeroBanner
          heroClass={'homebanner'}
          heroBanner={homeBanner}
          bottomText={bottomText}
        />
        <Grid
          gridClass={'productsgrid'}
          gridItems={this.props.gridItems}
        />
      </section>
    );
  }
}

export default withStyles(s)(Category);
