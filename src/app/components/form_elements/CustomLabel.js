import React from "react";

class CustomLabel extends React.Component {
    static propTypes = {
        classname: React.PropTypes.string.isRequired,
        for: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        required: React.PropTypes.bool
    }

    isRequired = () => {
        if (this.props.required) {
            return (
                <abbr className="required"> *</abbr>
            );
        }
        return null;
    }

    render = () => {
        return (
            <label
              className={this.props.classname}
              htmlFor={this.props.for}
            >
                {this.props.title}
                {this.isRequired()}
            </label>
        );
    }
}

export default CustomLabel;