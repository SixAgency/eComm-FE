import React from "react";
import { Link } from "react-router";

class CustomList extends React.Component {
    static propTypes = {
        classname: React.PropTypes.string.isRequired,
        divider: React.PropTypes.string.isRequired,
        list: React.PropTypes.arrayOf(React.PropTypes.shape({
            title: React.PropTypes.string.isRequired,
            link: React.PropTypes.string,
            classname: React.PropTypes.string
        })).isRequired
    }

    getContent = (v, k) => {
        if (v.link) {
            return (
                <li key={k}>
                    <Link className={v.classname} to={v.link}>{v.title}</Link>
                    <span>{this.props.divider}</span>
                </li>
            );
        }
        return (
            <li key={k}>{v.title}</li>
        );
    }

    render = () => {
        return (
            <ul className={this.props.classname}>
                { this.props.list.map((v, k) => {
                    return this.getContent(v, k);
                })}
            </ul>
        );
    }
}

export default CustomList;