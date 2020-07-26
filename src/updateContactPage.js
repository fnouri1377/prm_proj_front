import React from "react";
import "./index.css";
import { withRouter } from 'react-router-dom';

class UpdateContactPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {},
            errorMessage: '',
            contact: null
        };
    }

    handleChange = (key, e) => {
        const { values } = this.state;
        this.setState({
            values: { ...values, [key]: e.target.value },
            errorMessage: ""
        });

        console.log("$$$$ ", this.state.values, "$$$$");
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

    getContact = name => {
        console.log("getContact => name: ", name);
        fetch(`http://localhost:4000/api/getContact/${this.props.username}/${name}`, {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        }).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    console.log("json = ", json);
                    this.setState({
                        contact: json
                    })

                    if (json.name !== undefined && json.name !== null) {
                        const { values } = this.state;
                        this.setState({
                            values: { ...values, name: json.name }
                        });
                    }

                    if (json.birthDate !== undefined && json.birthDate !== null) {
                        const { values } = this.state;
                        this.setState({
                            values: { ...values, birthDate: json.birthDate }
                        });
                    }

                    if (json.debt_userToCon !== undefined && json.debt_userToCon !== null) {
                        const { values } = this.state;
                        this.setState({
                            values: { ...values, debt_userToCon: json.debt_userToCon }
                        });
                    }

                    if (json.debt_conToUser !== undefined && json.debt_conToUser !== null) {
                        const { values } = this.state;
                        this.setState({
                            values: { ...values, debt_conToUser: json.debt_conToUser }
                        });
                    }

                    if (json.note !== undefined && json.note !== null) {
                        const { values } = this.state;
                        this.setState({
                            values: { ...values, note: json.note }
                        });
                    }

                    if (json.duration_message !== undefined && json.duration_message !== null) {
                        const { values } = this.state;
                        this.setState({
                            values: { ...values, duration_message: json.duration_message }
                        });
                    }

                    if (json.duration_call !== undefined && json.duration_call !== null) {
                        const { values } = this.state;
                        this.setState({
                            values: { ...values, duration_call: json.duration_call }
                        });
                    }

                    if (json.duration_meeting !== undefined && json.duration_meeting !== null) {
                        const { values } = this.state;
                        this.setState({
                            values: { ...values, duration_meeting: json.duration_meeting }
                        });
                    }
                });
            }
        });
    };

    updateContact = async (e) => {
        e.preventDefault();
        const { values } = this.state;
        if (!values['name']) {
            console.log("name")
            this.setState({
                errorMessage: 'لطفا نام مخاطب رو وارد کن!'
            })
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
                        if (json && json.name !== this.props.contact_name) {
                            this.setState({
                                errorMessage: 'مخاطب با این نام رو قبلاً اضافه کردی!'
                            });
                        }
                        else {
                            try {
                                const data = this.patchData(`http://localhost:4000/api/updateContact/${this.props.username}/${this.props.contact_name}`, values);
                                // console.log("send to server => ", JSON.stringify(data));
                                data.then(js => js)
                                    .then(js => {
                                        console.log("message: ", js.message);
                                        this.props.setContactName(values['name']);
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
        this.getContact(this.props.contact_name);
        this.setState({
            values: {},
            errorMessage: ''
        });
    }

    render() {
        return !!this.state.contact ? (
            <div>
                <h1>مخاطب رو ویرایش کن!</h1>
                <h3>موارد ستاره‌دار، ضروری هستند.</h3>
                <form className="centerDiv formContainer">
                    <p>نام مخاطب*</p>
                    <input
                        type="text"
                        required={true}
                        // placeholder={this.state.contact.name}
                        className="marginTop"
                        value={this.state.values['name']}
                        onChange={e => this.handleChange("name", e)}
                    ></input>

                    <p>تاریخ تولد مخاطب</p>
                    <input
                        type="Date"
                        required={false}
                        // placeholder={this.state.contact.birthDate}
                        className="marginTop"
                        value={this.state.values['birthDate']}
                        onChange={e => this.handleChange("birthDate", e)}
                    ></input>

                    <p>چند تومان بدهی به این مخاطب داری؟</p>
                    <input
                        type="number"
                        required={false}
                        // placeholder={this.state.contact.debt_userToCon}
                        className="marginTop"
                        value={this.state.values['debt_userToCon']}
                        onChange={e => this.handleChange("debt_userToCon", e)}
                    ></input>

                    <p>چند تومان طلب از این مخاطب داری؟</p>
                    <input
                        type="number"
                        required={false}
                        // placeholder={this.state.contact.debt_conToUser}
                        className="marginTop"
                        value={this.state.values['debt_conToUser']}
                        onChange={e => this.handleChange("debt_conToUser", e)}
                    ></input>

                    <p>یادداشتی درمورد این مخاطب</p>
                    <input
                        type="text"
                        required={false}
                        // placeholder={this.state.contact.note}
                        className="marginTop"
                        value={this.state.values['note']}
                        onChange={e => this.handleChange("note", e)}
                    ></input>

                    <p>چند روز یک بار میخوای به این مخاطب پیام بدی؟</p>
                    <input
                        type="number"
                        required={false}
                        // placeholder={this.state.contact.duration_message}
                        className="marginTop"
                        value={this.state.values['duration_message']}
                        onChange={e => this.handleChange("duration_message", e)}
                        min="1"
                        max="400"
                    ></input>

                    <p>چند روز یک بار میخوای با این مخاطب تماس بگیری؟</p>
                    <input
                        type="number"
                        required={false}
                        // placeholder={this.state.contact.duration_call}
                        className="marginTop"
                        value={this.state.values['duration_call']}
                        onChange={e => this.handleChange("duration_call", e)}
                        min="1"
                        max="400"
                    ></input>

                    <p>چند روز یک بار میخوای این مخاطب رو ببینی؟</p>
                    <input
                        type="number"
                        required={false}
                        // placeholder={this.state.contact.duration_meeting}
                        className="marginTop"
                        value={this.state.values['duration_meeting']}
                        onChange={e => this.handleChange("duration_meeting", e)}
                        min="1"
                        max="400"
                    ></input>

                    <button
                        className="submitButton marginTop"
                        onClick={this.updateContact}>ویرایش
					</button>

                    <button
                        className="submitButton marginTop"
                        onClick={() => this.props.history.push(`/user/contact/${this.state.contact.name}`)}>انصراف از ویرایش
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

export default withRouter(UpdateContactPage);