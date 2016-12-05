import React from "react";
import "./my_account_inner.scss";

class MyAccountInner extends React.Component {
    render(){
        return (
            <div className="account-wrapper"> 
                <h2 className="section-header">
                    your account
                </h2>
                <p className="my-account-user-text">
                    Hello <strong>user</strong> ( not user? <a href="#"> 
                    Sign out</a>
                    ). From your account dashboard you can view your recent 
                    orders, manage your shipping and billing addresses and
                    <a href="#"> edit your password and account details. </a> 
                </p>
                <h2 className="section-header addresses-header">
                    my addresses
                </h2>
                <p className="adresses-text">
                    The following addresses will be used on the checkout page
                </p>
                <div className="addresses-container">
                    <div className="address-wrapper">
                        <a href="#" className="title">
                            Edit billing address 
                        </a>
                        <p> Please set up your billing address </p>
                    </div>
                    <div className="address-wrapper">
                        <a href="#" className="title"> 
                            Edit shipping address 
                        </a>
                        <p> Please set up your shipping address </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default MyAccountInner;