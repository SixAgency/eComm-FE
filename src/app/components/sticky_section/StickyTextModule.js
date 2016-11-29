import React from "react";

class StickyTextModule extends React.Component {
    static propTypes = {
        text_obj: React.PropTypes.object,
        class_name: React.PropTypes.string.isRequired
    }

    setSubtitle = () => {
        if (this.props.text_obj && this.props.text_obj.subtitle) {
            if (this.props.text_obj.subtitle_url) {
                return (
                    <a 
                      href="{this.props.text_obj.subtitle_url}"
                    >{this.props.text_obj.subtitle}</a>
                );
            }
            return (<span>{this.props.text_obj.subtitle}</span>);
        }
    }

    render() {
        const subTitle = this.setSubtitle();
        if (this.props.text_obj && this.props.text_obj.title) {
            return (
                <div className={this.props.class_name}>
                    <h1>{this.props.text_obj.title}</h1>
                    {subTitle}
                </div>
            );
        }
        return null;
    }
}

export default StickyTextModule;