import React from "react";

class SubmitButtun extends React.Component {
    static propTypes = {
        classname: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        action: React.PropTypes.func,
        link: React.PropTypes.string
    }

    static defaultProps = {
        link: '#',
        action: () => { return true; }
    }

    render = () => {
        return (
            <a
              className={this.props.classname}
              href={this.props.link}
              onClick={this.props.action}
            >
                {this.props.title}
            </a>
        );
    }
}

export default SubmitButtun;