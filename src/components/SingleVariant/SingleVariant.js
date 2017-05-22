import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import accounting from 'accounting';
import s from './SingleVariant.css';

class SingleVariant extends Component {

  static propTypes = {
    variants: PropTypes.array.isRequired,
    action: PropTypes.func.isRequired,
    price: PropTypes.number.isRequired,
    selected: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedVariantId: this.props.variants[0].id,
      selectedVariant: this.props.variants[0]
    };
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('HHHHHH', nextProps);
    const variant = this.getVariantById(nextProps);
    if (variant) {
      this.setState({
        selectedVariantId: variant.id,
        selectedVariant: variant
      });
    }
  }

  getVariantById = (props) => {
    const { variants, selected } = props;
    return variants.find((variant) => variant.id === selected);
  }

  handleChange = (event) => {
    const variantId = parseInt(event.target.value, 10);
    const variant = this.props.variants.find((v) => (v.id === variantId));
    this.setState({
      selectedVariant: variant,
      selectedVariantId: variantId
    });
    this.props.action(variantId);
  };

  render() {
    const variants = this.props.variants;
    const selectedVariant = this.state.selectedVariant;
    return (
      <div className={s.variants}>
        <h3 className={s.vname}>
          {this.props.variants[0].option_values[0].option_type_presentation}
        </h3>
        <select
          className={s.vselect} name="sizes" onChange={this.handleChange}
          value={this.state.selectedVariantId}
        >
          { variants.map((item) =>
            (<option value={item.id} key={item.id}>
              {item.option_values[0].presentation}
            </option>),
          )}
        </select>
        {parseFloat(selectedVariant.price) !== parseFloat(this.props.price) &&
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
