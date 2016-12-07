import React from "react";

class GridText extends React.Component {
    static propTypes = {
        gridText: React.PropTypes.array.isRequired
    }

    render() {
        if (this.props.gridText.length > 0) {
            return (
                <div className="grid-text-wrapper">
                    <div className="grid-text">
                        <div className="text">
                            {this.props.gridText.map( (paragraph) => {
                                return (
                                    <p>{paragraph}</p>
                                );
                            })}
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    }
}

export default GridText;