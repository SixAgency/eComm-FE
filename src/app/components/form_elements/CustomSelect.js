import React from "react";

class CustomSelect extends React.Component {
    static propTypes = {
        classname: React.PropTypes.string.isRequired,
        action: React.PropTypes.func.isRequired,
        options: React.PropTypes.arrayOf(React.PropTypes.shape({
            title: React.PropTypes.string.isRequired,
            value: React.PropTypes.string.isRequired
        })).isRequired
    }

    render = () => {
        const opts = this.props.options;
        return (
            <select
              className={this.props.classname}
              onChange={this.props.action}
            >
                {Array.from(opts).map( (v, k) => {
                    return(
                        <option
                          key={k}
                          value={v.value}
                        >
                            {v.title}
                        </option>
                    );
                })}
            </select>
        );
    }
}

export default CustomSelect;