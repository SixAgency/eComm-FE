import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MultiVariant.css';

class MultiVariant extends React.Component {
  static propTypes = {
    variants: PropTypes.array.isRequired,
    hasVariants: PropTypes.bool.isRequired,
    handleId: PropTypes.func.isRequired,

  }
  render() {
    if (!this.props.hasVariants) {
      return null;
    }
    const variants = this.props.variants;
    return (
      <div className={s.variants}>
        <h3 className={s.vname}>
          {this.props.variants[0].option_values[0].option_type_presentation}
          <abbr className={s.required} title="required">*</abbr>
        </h3>
        <select className={s.vselect} name="sizes" onChange={this.props.handleId}>
          { variants.map((item) =>
            (<option value={item.id} key={item.id}>
              {item.option_values[0].presentation}
            </option>),
          )}
        </select>
        <select>
          <option></option>
        </select>
      </div>
    );
  }
}

export default withStyles(s)(MultiVariant);
