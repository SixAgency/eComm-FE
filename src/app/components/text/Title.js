import React from "react";

class Title extends React.Component {
    static propTypes = {
        classname: React.PropTypes.string,
        text: React.PropTypes.string.isRequired
    }

    render = () => {
        return(
            <h1 className={this.props.classname}>
                {this.props.text}
            </h1>
        );
    }
}

export default Title;