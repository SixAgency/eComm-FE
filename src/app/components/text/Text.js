import React from "react";

class Text extends React.Component {
    static propTypes = {
        classname: React.PropTypes.string,
        text: React.PropTypes.string.isRequired
    }
    createMarkup = () => {
        return {__html: this.props.text};
    }
    render() {
        return (
            <p
              className={this.props.classname}
              dangerouslySetInnerHTML={this.createMarkup()}
            />
        );
    }
}

export default Text;
