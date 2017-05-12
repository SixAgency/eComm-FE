import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MultiVariant.css';

class MultiVariant extends React.Component {
  static propTypes = {
    variants: PropTypes.array.isRequired,
    action: PropTypes.func.isRequired,
    selected: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {
      variantOne: this.props.variants[0].option_values[0].id,
      variantTwo: this.props.variants[0].option_values[1].id
    };
  }

  componentWillMount = () => {
    const idOne = this.props.variants[0].option_values[0].id;
    const idTwo = this.props.variants[0].option_values[1].id;
    const variant = this.getVariant(idOne, idTwo);
    this.props.action(variant);
  };

  componentDidMount = () => {
    const idOne = this.props.variants[0].option_values[0].id;
    const idTwo = this.props.variants[0].option_values[1].id;
    const variant = this.getVariant(idOne, idTwo);
    this.props.action(variant);
  }

  componentWillReceiveProps = (nextProps) => {
    const variant = this.getVariantById(nextProps);
    if (variant) {
      this.setState({
        variantOne: variant.option_values[0].id,
        variantTwo: variant.option_values[1].id
      });
    }
  }

  getVariant = (idOne, idTwo) => {
    const item = this.props.variants.find((variant) => (
      variant.option_values[0].id === idOne &&
        variant.option_values[1].id === idTwo
    ));
    return item.id || null;
  };

  getVariantById = (props) => {
    const { variants, selected } = props;
    return variants.find((variant) => variant.id === selected);
  }

  changeVariantOne = (event) => {
    const idOne = parseInt(event.target.value, 10);
    const idTwo = this.state.variantTwo;
    this.setState({
      variantOne: idOne
    });
    const variant = this.getVariant(idOne, idTwo);
    this.props.action(variant);
  };

  changeVariantTwo = (event) => {
    const idOne = this.state.variantOne;
    const idTwo = parseInt(event.target.value, 10);
    this.setState({
      variantTwo: idTwo
    });
    const variant = this.getVariant(idOne, idTwo);
    this.props.action(variant);
  };

  formatVariants = () => {
    const arrayOne = [];
    const arrayTwo = [];
    this.props.variants.forEach((item) => {
      const existsOne = arrayOne.filter((option) => (option.id === item.option_values[0].id));
      if (existsOne.length < 1) {
        arrayOne.push(item.option_values[0]);
      }
      const existsTwo = arrayTwo.filter((option) => (option.id === item.option_values[1].id));
      if (existsTwo.length < 1) {
        arrayTwo.push(item.option_values[1]);
      }
    });
    return {
      one: arrayOne,
      two: arrayTwo
    };
  };

  render() {
    const variants = this.formatVariants();
    return (
      <div className={s.variants}>
        <h3 className={s.vname}>
          {variants.one[0].option_type_presentation}
          <abbr className={s.required} title="required">*</abbr>
        </h3>
        <select className={s.vselect} name="size" onChange={this.changeVariantOne} value={this.state.variantOne}>
          { variants.one.map((item) =>
            (<option value={item.id} key={item.id}>
              {item.presentation}
            </option>),
          )}
        </select>
        <h3 className={s.vname}>
          {variants.two[0].option_type_presentation}
          <abbr className={s.required} title="required">*</abbr>
        </h3>
        <select className={s.vselect} name="color" onChange={this.changeVariantTwo} value={this.state.variantTwo}>
          { variants.two.map((item) =>
            (<option value={item.id} key={item.id}>
              {item.presentation}
            </option>),
          )}
        </select>
      </div>
    );
  }
}

export default withStyles(s)(MultiVariant);
