import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProductReviews.css';

class ProductReviews extends React.Component {
  static propTypes = {
    toggleReviews: PropTypes.func.isRequired,
    reviews: PropTypes.array.isRequired
  }

  toggleReviews = (e) => {
    if (e.target.id === 'reviews') {
      this.props.toggleReviews();
    }
  }

  submitReview = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <div id="reviews" className={s.reviewsbg} onClick={this.toggleReviews}>
        <div className={s.reviews}>
          <div className={s.title}>
            Reviews
          </div>
          <div className={s.content}>
            {this.props.reviews.map((rev, index) => (
              <div className={s.review} key={index}>
                <p className={s.left}>
                  {rev.name}<br />
                  <span className={s.date}>19th Apr 2017</span>
                </p>
                <p className={s.right}>
                  {rev.review}
                </p>
              </div>
            ))}
          </div>
          <form onSubmit={this.submitReview}>
            <textarea id="review" name="review" cols="45" rows="8" placeholder="Your Review" />
            <input id="name" name="name" type="text" placeholder="Name *" />
            <input id="email" name="email" type="text" placeholder="Email *" />
            <input id="submit" name="submit" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ProductReviews);
