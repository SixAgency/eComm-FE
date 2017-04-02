import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SingleVariant.css';

class SingleVariant extends Component {

  static propTypes = {
    variants: PropTypes.array.isRequired,
    action: PropTypes.func.isRequired,
  }

  componentWillMount = () => {
    const variant = this.props.variants[0].id;
    this.props.action(variant);
  }

  handleChange = (event) => {
    const variant = parseInt(event.target.value, 10);
    this.props.action(variant);
  }

  render() {
    const variants = this.props.variants;
    return (
      <div className={s.variants}>
        <h3 className={s.vname}>
          {this.props.variants[0].option_values[0].option_type_presentation}
          <abbr className={s.required} title="required">*</abbr>
        </h3>
        <select className={s.vselect} name="sizes" onChange={this.handleChange}>
          { variants.map((item) =>
            (<option value={item.id} key={item.id}>
              {item.option_values[0].presentation}
            </option>),
          )}
        </select>
      </div>
    );
  }
}

export default withStyles(s)(SingleVariant);
