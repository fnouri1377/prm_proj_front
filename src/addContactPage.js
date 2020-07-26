import React from "react";
import "./index.css";
import { withRouter } from 'react-router-dom';

class AddContactPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {},
            errorMessage: ''
        };
    }

    handleChange = (key, e) => {
        const { values } = this.state;
        this.setState({
            values: { ...values, [key]: e.target.value },
            errorMessage: ""
        });
    };

    putData = async (url = '', data = {}) => {
        const response = await fetch(url, {
            method: 'PUT',
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

    addContact = async (e) => {
        e.preventDefault();
        const { values } = this.state;
        if (!values['name']) {
            console.log("name")
            this.setState({
                errorMessage: 'لطفا نام مخاطب رو وارد کن!'
            });
        }
        else if (values['during_message'] === 0) {
            this.setState({
                errorMessage: 'مقدار دوره تناوب پیام نمیتونه صفر باشه!'
            })
        }
        else if (values['during_call'] === 0) {
            this.setState({
                errorMessage: 'مقدار دوره تناوب تماس نمیتونه صفر باشه!'
            })
        }
        else if (values['during_meeting'] === 0) {
            this.setState({
                errorMessage: 'مقدار دوره تناوب ملاقات نمیتونه صفر باشه!'
            })
        }
        else {
            console.log("this.props.username = ", this.props.username);
            console.log("values['name'] = ", values['name']);

            fetch(`http://localhost:4000/api/getContact/${this.props.username}/${values['name']}`, {
                method: "GET",
                headers: {
                    Accept: "application/json"
                }
            }).then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        if (json) {
                            this.setState({
                                errorMessage: 'مخاطب با این نام رو قبلاً اضافه کردی!'
                            });
                        }
                        else {
                            try {
                                const data = this.putData(`http://localhost:4000/api/addContact`,
                                    { username: this.props.username, values: values });
                                data.then(js => js)
                                    .then(js => {
                                        this.props.history.push(`/user/contacts`);
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
        this.setState({
            values: {},
            errorMessage: ''
        });
    }

    render() {
        return (
            <div>
                <h1>یه مخاطب جدید اضافه کن!</h1>
                <h3>موارد ستاره‌دار، ضروری هستند.</h3>
                <form className="centerDiv formContainer">
                    <p>نام مخاطب*</p>
                    <input
                        type="text"
                        required={true}
                        placeholder="نام مخاطب"
                        className="marginTop"
                        value={this.state.values["name"]}
                        onChange={e => this.handleChange("name", e)}
                    ></input>

                    <p>تاریخ تولد مخاطب</p>
                    <input
                        type="Date"
                        required={false}
                        placeholder="تاریخ تولد مخاطب"
                        className="marginTop"
                        value={this.state.values["birthDate"]}
                        onChange={e => this.handleChange("birthDate", e)}
                    ></input>

                    <p>چند تومان بدهی به این مخاطب داری؟</p>
                    <input
                        type="number"
                        required={false}
                        placeholder="بدهی"
                        className="marginTop"
                        value={this.state.values["debt_userToCon"]}
                        onChange={e => this.handleChange("debt_userToCon", e)}
                    ></input>

                    <p>چند تومان طلب از این مخاطب داری؟</p>
                    <input
                        type="number"
                        required={false}
                        placeholder="طلب"
                        className="marginTop"
                        value={this.state.values["debt_conToUser"]}
                        onChange={e => this.handleChange("debt_conToUser", e)}
                    ></input>

                    <p>یادداشتی درمورد این مخاطب</p>
                    <input
                        type="text"
                        required={false}
                        placeholder="یادداشت"
                        className="marginTop"
                        value={this.state.values["note"]}
                        onChange={e => this.handleChange("note", e)}
                    ></input>

                    <p>چند روز یک بار میخوای به این مخاطب پیام بدی؟</p>
                    <input
                        type="number"
                        required={false}
                        placeholder="دوره تناوب پیام"
                        className="marginTop"
                        value={this.state.values["duration_message"]}
                        onChange={e => this.handleChange("duration_message", e)}
                        min="1"
                        max="400"
                    ></input>

                    <p>چند روز یک بار میخوای با این مخاطب تماس بگیری؟</p>
                    <input
                        type="number"
                        required={false}
                        placeholder="دوره تناوب تماس"
                        className="marginTop"
                        value={this.state.values["duration_call"]}
                        onChange={e => this.handleChange("duration_call", e)}
                        min="1"
                        max="400"
                    ></input>

                    <p>چند روز یک بار میخوای این مخاطب رو ببینی؟</p>
                    <input
                        type="number"
                        required={false}
                        placeholder="دوره تناوب ملاقات"
                        className="marginTop"
                        value={this.state.values["duration_meeting"]}
                        onChange={e => this.handleChange("duration_meeting", e)}
                        min="1"
                        max="400"
                    ></input>

                    <button
                        className="submitButton marginTop"
                        onClick={this.addContact}>اضافه کن
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
        )
    }
}

export default withRouter(AddContactPage);