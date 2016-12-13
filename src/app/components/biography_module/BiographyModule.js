import React from "react";
import { biographyGrid } from "../../site_const";
import Text from "../text/Text";

class BiographyModule extends React.Component {
    render() {
        return(
            <div className="grid-module-wrapper">
                { biographyGrid.map( (item) => {
                    return (
                        <div key={item.id} className="grid-item">
                            <img className="grid-image" src={item.gridImage} />
                            <div className="grid-text-wrapper">
                                <div className="grid-text">
                                    <div className="text">
                                        <Text text={item.gridText}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })} </div>
        );
    }
}

export default BiographyModule;