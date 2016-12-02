import "./sticky_section.scss";
import React from "react";
import { connect } from "react-redux";
import { setHeroHeight } from "../../actions/commonActions";
import StickyTextModule from "./StickyTextModule";


const mapDispatchToProps = ((dispatch) => {
    return {
        setHeroHeight: (height) => dispatch(setHeroHeight(height))
    };
});

class StickySection extends React.Component {

    static propTypes = {
        main_banner: React.PropTypes.string.isRequired,
        setHeroHeight: React.PropTypes.func.isRequired,
        main_copy: React.PropTypes.object,
        bottom_copy: React.PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
            sticky_styles: { transform: 'translate3d(0px, 0px, 0px)' },
            hero_height: window.outerHeight
        };
    }

    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleImageLoad);
        this.props.setHeroHeight(127);
    }

    componentDidMount = () => {
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', this.handleImageLoad);
    }

    handleImageLoad = () => {
        this.props.setHeroHeight(this.node.offsetHeight);
        this.setState({
            hero_height: this.node.offsetHeight
        });
    }

    handleScroll = (event) => {
        let parRatio = Math.round(
            (event.srcElement.body.offsetHeight/this.state.hero_height) + 5),
            itemTranslate = (-event.srcElement.body.scrollTop/parRatio);

        this.setState({
            sticky_styles: {
                transform: 'translate3d(0px,'+itemTranslate+"px"+',0px)'
            }
        });
    }

    render() {
        return (
            <div
              className="sticky-wrapper"
              style={{'height': this.state.hero_height}}>
                <div className="sticky-container" ref={c => this.node = c}>
                    <div
                      className="sticky-content"
                      style={this.state.sticky_styles}>
                        <img
                          className="hero-image"
                          onLoad={this.handleImageLoad}
                          src={this.props.main_banner}
                          alt="Hero Image"
                        />
                        <StickyTextModule
                          class_name="sticky-hero-text"
                          text_obj={this.props.main_copy}
                        />
                    </div>
                </div>
                <StickyTextModule
                  class_name="sticky-bottom-text"
                  text_obj={this.props.bottom_copy}
                />
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(StickySection);