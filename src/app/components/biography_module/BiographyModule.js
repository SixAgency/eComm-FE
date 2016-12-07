import React from "react";
import { biographyGrid } from "../../site_const";
import GridText from "./GridText";
import "./biography_module.scss";

class BiographyModule extends React.Component {
    render() {
        return(
            <div className="grid-module-wrapper">
                { biographyGrid.map( (item) => {
                    return (
                        <div key={item.id} className="grid-item">
                            <img className="grid-image" src={item.gridImage} />
                            <GridText
                              gridText={item.gridText}
                              gridKey={item.id}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default BiographyModule;