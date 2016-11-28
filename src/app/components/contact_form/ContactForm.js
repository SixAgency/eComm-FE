import React from "react";
import "./contact_form.scss";

export default class ContactForm extends React.Component{
    render() {
        return (
            <form className="contact-form">
                <div className="input-wrapper">
                    <label 
                      className="field-names" 
                      htmlFor="name" >Name</label>
                    <input 
                      className="input-fields" 
                      type="text"
                      name="your-name"
                      id="name"
                    />
                </div>
                <div className="input-wrapper">
                    <label 
                      className="field-names" 
                      htmlFor="email" >Email</label>
                    <input 
                      className="input-fields" 
                      type="text" 
                      name="your-email" 
                      id="email" 
                    />
                </div>
                <div className="input-wrapper">
                    <label 
                      className="field-names" 
                      htmlFor="subject" >Subject</label>
                    <input 
                      className="input-fields" 
                      type="text" 
                      name="your-subject"
                      id="subject" 
                    />
                </div>
                <div className="textarea-wrapper">
                    <label 
                      className="field-names"
                      htmlFor="message">Message</label>
                    <textarea 
                      rows="10" 
                      cols="40"
                      className="input-fields"
                      type="text"
                      name="your-message"
                      id="message" />
                </div>
                <div className="input-wrapper">
                    <input 
                      className="submit-button"
                      value="Send"
                      type="submit"
                    />
                </div>
            </form>
        );
    }
}
