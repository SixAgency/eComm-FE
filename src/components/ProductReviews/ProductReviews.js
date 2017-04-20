import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProductReviews.css';

class ProductReviews extends React.Component {
  static propTypes = {
    toggleReviews: PropTypes.func.isRequired,
    reviews: PropTypes.array.isRequired,
    addProductReview: PropTypes.func.isRequired,
    resetMessages: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      review: '',
      name: '',
      email: ''
    };
  }

  onFieldsUpdate = (e) => {
    switch (e.target.id) {
      case 'review' : this.setState({ review: e.target.value }); break;
      case 'name' : this.setState({ name: e.target.value }); break;
      case 'email' : this.setState({ email: e.target.value }); break;
      default: // do nothing
    }
  }

  hideReviews = (e) => {
    if (e.target.id === 'reviews') {
      this.props.resetMessages();
      this.props.toggleReviews();
    }
  }

  submitReview = (e) => {
    e.preventDefault();
    this.props.addProductReview(this.state);
  }

  render() {
    return (
      <div id="reviews" className={s.reviewsbg} onClick={this.hideReviews}>
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
            <textarea
              id="review" name="review" cols="45" rows="8"
              placeholder="Your Review"
              onChange={this.onFieldsUpdate}
            />
            <input
              id="name" name="name" type="text"
              placeholder="Name *"
              onChange={this.onFieldsUpdate}
            />
            <input
              id="email" name="email" type="text"
              placeholder="Email *"
              onChange={this.onFieldsUpdate}
            />
            <input id="submit" name="submit" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ProductReviews);
