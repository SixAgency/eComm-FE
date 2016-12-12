import React from "react";

class CustomInput extends React.Component {
    static propTypes = {
        classname: React.PropTypes.string.isRequired,
        action: React.PropTypes.func.isRequired,
        name: React.PropTypes.string.isRequired,
        type: React.PropTypes.string,
        value: React.PropTypes.string,
        placeholder: React.PropTypes.string,
    }

    static defaultProps = {
        type: 'text',
        value: '',
        placeholder: ''
    }

    render = () => {
        return (
            <input
              className={this.props.classname}
              type={this.props.type}
              value={this.props.value}
              name={this.props.name}
              placeholder={this.props.placeholder}
              onChange={this.props.action}
            />
        );
    }
}

export default CustomInput;