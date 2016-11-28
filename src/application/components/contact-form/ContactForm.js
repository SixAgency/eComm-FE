import React from "react";
import "./formStyle.scss";

export default class ContactForm extends React.Component{
    render() {
        return (
            <form className="contact-form">
                <label className="field-names" for="name" > Name </label> <br />
                <input className="input-fields" type="text" name="your-name" id="name" /> <br />
                <label className="field-names" for="email" > Email </label><br />
                <input className="input-fields" type="text" name="your-email" id="email" /> <br />
                <label className="field-names" for="subject" > Subject </label><br />
                <input className="input-fields" type="text" name="your-subject" id="subject" /> <br />
                <label className="field-names" for="message" > Message </label> <br />
                <textarea  rows="11" cols="40" className="input-fields" type="text" name="your-message" id="message" /> <br />
                <input className="submit-button" value="Send" type="submit" />
            </form>
        );
    }
}
