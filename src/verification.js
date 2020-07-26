import React from "react";
import "./index.css";
import { withRouter } from 'react-router-dom';
import Timer from "./timer";

class Verification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            verification_state: 'input', // input, verification, verified
            phone_number: '',
            input_code: '',
            errorMessage: '',
            previous_phone_number: '',
            ready: false
        };
    }

    reset = () => {
        this.setState({
            verification_state: 'input',
            errorMessage: 'اعتبار کد ارسال شده به پایان رسید. دوباره دکمه ارسال کد تأیید رو بزن.',
            input_code: ''
        })
    }

    patchData = async (url = '', data = {}) => {
        const response = await fetch(url, {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    putData = async (url = '', data = {}) => {
        const response = await fetch(url, {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    handleChange = (key, e) => {
        this.setState({
            [key]: e.target.value,
            errorMessage: ''
        });
        console.log("state changed. state: ", this.state);
    }

    send_code = async (e) => {
        e.preventDefault();
        this.setState({
            errorMessage: ''
        })

        if (!this.state.phone_number) {
            this.setState({
                errorMessage: 'لطفا شماره موبایلت رو وارد کن!'
            })
        }
        else if (this.state.phone_number.length < 11 || this.state.phone_number[0] !== '0' || this.state.phone_number[1] !== '9') {
            this.setState({
                errorMessage: 'فرمت شماره موبایل نادرسته!'
            })
        }
        else if (this.state.previous_phone_number === this.state.phone_number) {
            this.setState({
                errorMessage: 'این که همون شماره موبایل قبلیه!'
            })
        }
        else {
            fetch(`http://localhost:4000/api/getUserWithPhoneNumber/${this.state.phone_number}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            })
                .then(response => {
                    if (response.ok) {
                        response.json().then(json => {
                            if (json) {
                                this.setState({
                                    errorMessage: 'این شماره موبایل توسط یه حساب کاربری دیگه ثبت شده!'
                                });
                            }
                            else {
                                try {
                                    const data = this.putData(`http://localhost:4000/api/sendSMS/${this.state.phone_number}/${this.props.username}`);
                                    data.then(json => json)
                                        .then(json => {
                                            console.log("sendSMS json: ", json);
                                            this.setState({
                                                verification_state: 'verification'
                                            });
                                        })
                                } catch (err) {
                                    console.log(err);
                                }
                            }
                        })
                    }
                })
        }
    }

    verify = async (e) => {
        e.preventDefault();
        this.setState({
            errorMessage: ''
        })

        if (!this.state.input_code) {
            this.setState({
                errorMessage: 'لطفا کد ارسال شده رو وارد کن!'
            })
        }
        else if (this.state.input_code.length !== 4) {
            this.setState({
                errorMessage: 'کد تأیید باید چهار رقم باشه!'
            })
        }
        else {
            fetch(`http://localhost:4000/api/verifyPhoneNumber/${this.state.phone_number}/${this.state.input_code}/${this.props.username}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            })
                .then(response => {
                    if (response.ok) {
                        response.json().then(json => {
                            if (json) {
                                if (json.message === 'verified') {
                                    try {
                                        console.log("this.props.username = ", this.props.username);
                                        const data = this.patchData(`http://localhost:4000/api/updateUser/${this.props.username}`, { username: this.props.username, phone_number: this.state.phone_number });
                                        // console.log("send to server => ", JSON.stringify(data));
                                        data.then(json => json)
                                            .then(json => {
                                                this.setState({ verification_state: 'verified' })
                                            })
                                    } catch (err) {
                                        console.log(err);
                                    }
                                }
                                else if (json.message === 'not verified') {
                                    this.setState({
                                        errorMessage: 'کد تأیید ورودی نادرسته!'
                                    })
                                }
                                else if (json.message === 'expired') {
                                    console.log(json.message);
                                }
                                else {
                                    console.log("#### INVALID JSON.MESSAGE ####");
                                }
                            }
                        })
                    }
                });
        }
    }

    componentDidMount() {
        fetch(`http://localhost:4000/api/getUserWithUsername/${this.props.username}`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })
            .then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        if (json) {
                            if (json.phone_number !== undefined && json.phone_number !== null) {
                                this.setState({
                                    errorMessage: 'قبلا شماره موبایلت رو ثبت کردی. اگر میخوای عوضش کنی، یه شماره جدید رو وارد کن.',
                                    previous_phone_number: json.phone_number,
                                });
                            }
                        }
                    })
                }
                this.setState({
                    ready: true
                });
            });
        this.setState({
            verification_state: 'input',
            phone_number: '',
            input_code: '',
            errorMessage: ''
        });
    }

    render() {
        console.log("####", this.state.verification_state, "####");
        if (this.state.ready === true) {
            if (this.state.verification_state === 'input') {
                return (
                    <div>
                        <form className="centerDiv formContainer">
                            <p>شماره موبایل</p>
                            <input
                                type="text"
                                style={{ direction: "ltr", textAlign: "left" }}
                                required={true}
                                placeholder={(this.state.previous_phone_number === '') ? "09*********" : this.state.previous_phone_number}
                                className="marginTop"
                                value={this.state.phone_number}
                                onChange={e => this.handleChange("phone_number", e)}
                            ></input>

                            <button
                                className="submitButton marginTop"
                                onClick={this.send_code}>ارسال کد تأیید
                            </button>
                        </form>

                        <div style={{ textAlign: 'center' }}>
                            <button
                                className="submitButton marginTop"
                                onClick={() => this.props.history.push(`/user`)}>بازگشت به صفحه اصلی
				            </button>
                        </div>

                        <p className="errorMessage">{this.state.errorMessage}</p>

                    </div>
                )
            }
            else if (this.state.verification_state === 'verification') {
                return (
                    <div>
                        <form className="centerDiv formContainer">
                            <p>شماره موبایل</p>
                            <input
                                style={{ direction: "ltr", textAlign: "left" }}
                                type="text"
                                placeholder={this.state.phone_number}
                                className="marginTop"
                                value={this.state.phone_number}
                                disabled
                            ></input>

                            <p>کد تأیید</p>
                            <input
                                style={{ direction: "ltr", textAlign: "left" }}
                                type="text"
                                required={true}
                                placeholder="****"
                                className="marginTop"
                                value={this.state.input_code}
                                onChange={e => this.handleChange("input_code", e)}
                            ></input>

                            <Timer reset={this.reset} />

                            <button
                                className="submitButton marginTop"
                                onClick={this.verify}>تأیید
				            </button>
                        </form>

                        <div style={{ textAlign: 'center' }}>
                            <button
                                className="submitButton marginTop"
                                onClick={() => this.props.history.push(`/user`)}>بازگشت به صفحه اصلی
				            </button>
                        </div>
                        <p className="errorMessage">{this.state.errorMessage}</p>

                    </div>
                )
            }
            else {
                return (
                    <div>
                        <div style={{ textAlign: 'center' }}>
                            <p>شماره موبایل شما تأیید شد.</p>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <button
                                className="submitButton marginTop"
                                onClick={() => this.props.history.push(`/user`)}>بازگشت به صفحه اصلی
				            </button>
                        </div>
                    </div>
                )
            }
        }
        else {
            return (
                <div>
                    لطفا صبر کنید...
                </div>
            )
        }
    }
}

export default withRouter(Verification);