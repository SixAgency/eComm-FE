import React from "react";

class EditAccountForm extends React.Component {
    render(){
        return(
            <div className="edit-wrapper">
                <h2 className="form-title">
                    edit account
                </h2>
                <h4 className="form-subtitle">
                    Change Password
                </h4>
                <div className="form-container">
                    <form className="edit-account-form">
                        <div className="input-wrapper row-left">
                            <label className="field-names"
                              htmlFor="first-name">
                                First Name *
                            </label>
                            <input type="text"
                              className="input-fields"
                              name="first-name"
                              id="first-name" />
                        </div>
                        <div className="input-wrapper row-right">
                            <label className="field-names"
                              htmlFor="last-name">
                                Last Name *
                            </label>
                            <input type="text"
                              className="input-fields"
                              name="last-name"
                              id="last-name" />
                        </div>
                        <div className="input-wrapper row-big">
                            <label className="field-names"
                              htmlFor="email">
                                Email Address *
                            </label>
                            <input type="text"
                              className="input-fields"
                              name="email"
                              id="email" />
                        </div>
                        <div className="input-wrapper row-big current-pass">
                            <label className="field-names"
                              htmlFor="password">
                                Current Password
                            </label>
                            <input type="text"
                              className="input-fields"
                              name="password"
                              id="password" />
                        </div>
                        <div className="input-wrapper row-left last-input-row">
                            <label className="field-names new-password-label"
                              htmlFor="new-password">
                                New Password
                            </label>
                            <input type="password"
                              className="input-fields"
                              name="new-password"
                              id="new-password" />
                        </div>
                        <div className="input-wrapper row-right last-input-row">
                            <label className="field-names"
                              htmlFor="confirm-password">
                               Confirm New Password
                            </label>
                            <input type="password"
                              className="input-fields"
                              name="confirm-password"
                              id="confirm-password" />
                        </div>
                        <div className="input-wrapper buttons-container">
                            <input type="submit" name="save_account_details"
                              value="Save Changes" className="save-changes" />
                            <a className="my-account-cancel-button"
                              href="https://krissorbie.com">
                                CANCEL
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default EditAccountForm;