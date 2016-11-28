import React from "react";
import "./buttonStyle.scss";

export default class SubmitButton extends React.Component {
    render() {
        return (
            <input value="Send" className="submitButton" type="submit" />
        );
    }
}