import React from "react";
import "./index.css";
import { withRouter } from 'react-router-dom';

class UpdateProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {},
            errorMessage: '',
            user: null
        };
    }

    handleChange = (key, e) => {
        const { values } = this.state;
        this.setState({
            values: { ...values, [key]: e.target.value },
            errorMessage: ""
        });
    };

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

    getUser = () => {
        fetch(`http://localhost:4000/api/getUserWithUsername/${this.props.username}`, {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        }).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    this.setState({ user: json });

                    if (json.name !== undefined && json.name !== null) {
                        const { values } = this.state;
                        this.setState({
                            values: { ...values, name: json.name }
                        });
                    }

                    if (json.username !== undefined && json.username !== null) {
                        const { values } = this.state;
                        this.setState({
                            values: { ...values, username: json.username }
                        });
                    }

                    if (json.password !== undefined && json.password !== null) {
                        const { values } = this.state;
                        this.setState({
                            values: { ...values, password: json.password }
                        });
                    }
                });
            }
        });
    };

    updateUser = async (e) => {
        e.preventDefault();
        const { values } = this.state;
        if (!values['name']) {
            console.log("name")
            this.setState({
                errorMessage: 'لطفا نامت رو وارد کن!'
            })
        }
        else if (!values['username']) {
            console.log("username")
            this.setState({
                errorMessage: 'لطفا نام کاربریت رو وارد کن!'
            })
        }
        else if (!values['password']) {
            console.log("password")
            this.setState({
                errorMessage: 'لطفا رمز عبورت رو وارد کن!'
            })
        }
        else {
            fetch(`http://localhost:4000/api/getUserWithUsername/${values['username']}`, {
                method: "GET",
                headers: {
                    Accept: "application/json"
                }
            }).then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        if (json && json.username !== this.props.username) {
                            this.setState({
                                errorMessage: 'این نام کاربری رو شخص دیگه‌ای گرفته!'
                            });
                        }
                        else {
                            try {
                                const data = this.patchData(`http://localhost:4000/api/updateUser/${this.props.username}`, values);
                                // console.log("send to server => ", JSON.stringify(data));
                                data.then(json => json)
                                    .then(json => {
                                        this.props.setUsername(values['username']);
                                        this.props.setName(values['name']);
                                        this.props.history.push(`/user`);
                                    })
                            } catch (err) {
                                console.log(err);
                            }
                        }
                    })
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }

    componentDidMount() {
        this.getUser();
        this.setState({
            values: {},
            errorMessage: ''
        });
    }

    render() {
        return !!this.state.user ? (
            <div>
                <h1>اطلاعات کاربریت رو ویرایش کن!</h1>
                <form className="centerDiv formContainer">
                    <p>نام</p>
                    <input
                        type="text"
                        required={true}
                        // placeholder={this.state.user.name}
                        className="marginTop"
                        value={this.state.values['name']}
                        onChange={e => this.handleChange("name", e)}
                    ></input>

                    <p>نام کاربری</p>
                    <input
                        type="text"
                        required={true}
                        // placeholder={this.state.user.username}
                        className="marginTop"
                        value={this.state.values['username']}
                        onChange={e => this.handleChange("username", e)}
                    ></input>

                    <p>رمز عبور</p>
                    <input
                        type="text"
                        required={true}
                        // placeholder={this.state.user.password}
                        className="marginTop"
                        value={this.state.values['password']}
                        onChange={e => this.handleChange("password", e)}
                    ></input>

                    <button
                        className="submitButton marginTop"
                        onClick={this.updateUser}>ویرایش
					</button>

                    <button
                        className="submitButton marginTop"
                        onClick={() => this.props.history.push(`/user/profile`)}>انصراف از ویرایش
					</button>
                </form>

                <p className="errorMessage">{this.state.errorMessage}</p>

                <div style={{ textAlign: 'center' }}>
                    <button
                        className="submitButton marginTop"
                        onClick={() => this.props.history.push(`/user`)}>بازگشت به صفحه اصلی
    		        </button>
                </div>
            </div>
        ) :
            (
                <div>
                    لطفا صبر کنید...
                </div>
            )
    }
}

export default withRouter(UpdateProfilePage);