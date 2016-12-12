import React from "react";

class FormError extends React.Component {
    static propTypes = {
        formErrorText: React.PropTypes.array.isRequired,
        loggedIn: React.PropTypes.bool.isRequired
    }

    mapError = () => {
        let keyword = '';
        if (!this.props.loggedIn)
            keyword = 'Error: ';
        return keyword;
    }

    render(){
        const keyword = this.mapError();
        return(
            <ul className="error-container">
                {
                    this.props.formErrorText.map(function(err){
                        return (
                            <div>
                                <strong> {keyword} </strong>
                                <span key={err}>{err}</span>
                            </div>
                        );
                    })
                }
            </ul>
        );
    }
}

export default FormError;