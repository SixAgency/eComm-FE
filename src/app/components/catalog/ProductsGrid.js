import React from "react";
import Masonry from "react-masonry-component";
import GridElement from "./GridElement";
import { connect } from "react-redux";
import { getProducts } from "../../actions/commonActions";
import "./products_grid.scss";


const mapStateToProps = ((state) => {
    return { products: state.products };
});

const mapDispatchToProps = ((dispatch) => {
    return {
        getProducts: () => dispatch(getProducts())
    };
});

class ProductsGrid extends React.Component {

    static propTypes = {
        products: React.PropTypes.array.isRequired,
        getProducts: React.PropTypes.func.isRequired,
        toggleLoader: React.PropTypes.func.isRequired
    }

    componentWillMount = () => {
        this.props.getProducts();
    }

    handleImagesLoaded = () => {
        this.props.toggleLoader(false);
    }

    render() {
        var childElements = this.props.products.map(function(product){
            return (
                <li key={product.id} className="grid-elem">
                    <GridElement product={product} />
                </li>
            );
        });
        return (
            <div className="products-wrapper">
                <Masonry
                  className={'products'}
                  elementType={'ul'}
                  onImagesLoaded={this.handleImagesLoaded}
                >
                    {childElements}
                </Masonry>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsGrid);