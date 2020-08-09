import React from "react";
import "./index.css";
import { withRouter } from 'react-router-dom';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    goToLogin = () => {
        this.props.history.push(`/login`)
    }

    goToSignUp = () => {
        this.props.history.push(`/signup`)
    }

    render() {
        return (
            <div className="centerDiv">
                <h2>به سامانه‌ی ماش (مدیریت ارتباطات شخصی) خوش اومدی!</h2>
                <span>
                    <button
                        className="homePageButton marginTop"
                        onClick={this.goToLogin}>ورود</button>
                </span>
                <span>
                    <button
                        className="homePageButton marginTop"
                        onClick={this.goToSignUp}>ثبت نام</button>
                </span>
            </div>
        );
    }
}

export default withRouter(HomePage);