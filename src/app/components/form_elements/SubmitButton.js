import React from "react";

class SubmitButtun extends React.Component {
    static propTypes = {
        classname: React.PropTypes.string.isRequired,
        value: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired
    }

    render = () => {
        return (
            <input
              className={this.props.classname}
              type="submit"
              value={this.props.value}
              name={this.props.name}
            />
        );
    }
}

export default SubmitButtun;