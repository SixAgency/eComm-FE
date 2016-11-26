import React from "react";
import SubmitButton from "../submitButton/SubmitButton";
import "./formStyle.scss";

export default class ContactForm extends React.Component{
    render() {
        return (
            <form className="contactForm">
                <p className="input-fields"> Name 
                    <br />
                    <span>
                        <input type="text" name="your-name" />
                    </span>
                </p>
                <p className="input-fields"> Email 
                    <br />
                    <span>
                        <input type="text" name="your-email" />
                    </span>
                </p>
                <p className="input-fields"> Subject 
                    <br />
                    <span>
                        <input type="text" name="your-subject" />
                    </span>
                </p>
                <p className="input-fields"> Message 
                    <br />
                    <span>
                        <textarea type="text" name="your-message" />
                    </span>
                </p>
                <p>
                    <SubmitButton />
                </p>
            </form>
        );
    }
}
