import React from "react";

class Subtitle extends React.Component {
    static propTypes = {
        classname: React.PropTypes.string.isRequired,
        text: React.PropTypes.func.isRequired
    }

    render = () => {
        return(
            <h2 className={this.props.classname}>
                {this.props.text}
            </h2>
        );
    }
}

export default Subtitle;