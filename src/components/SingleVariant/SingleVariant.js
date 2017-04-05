import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import accounting from 'accounting';
import s from './SingleVariant.css';

class SingleVariant extends Component {

  static propTypes = {
    variants: PropTypes.array.isRequired,
    action: PropTypes.func.isRequired,
    price: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedVariant: 0
    };
  }

  componentWillMount = () => {
    const variant = this.props.variants[0].id;
    this.props.action(variant);
  }

  handleChange = (event) => {
    const variant = parseInt(event.target.value, 10);
    this.setState({ selectedVariant: variant });
    this.props.action(this.props.variants[variant].id);
  }

  render() {
    const variants = this.props.variants;
    const selectedVariant = variants[this.state.selectedVariant];
    return (
      <div className={s.variants}>
        <h3 className={s.vname}>
          {this.props.variants[0].option_values[0].option_type_presentation}
          <abbr className={s.required} title="required">*</abbr>
        </h3>
        <select className={s.vselect} name="sizes" onChange={this.handleChange}>
          { variants.map((item, index) =>
            (<option value={index} key={index}>
              {item.option_values[0].presentation}
            </option>),
          )}
        </select>
        {selectedVariant.price !== this.props.price &&
          <div className={s.addons}>
            <span>Grand<br />total:</span>
            <span>{accounting.formatMoney(selectedVariant.price)}</span>
          </div>
        }
      </div>
    );
  }
}

export default withStyles(s)(SingleVariant);
