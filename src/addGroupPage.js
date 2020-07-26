import React from "react";
import "./index.css";
import { withRouter } from 'react-router-dom';

class AddGroupPage extends React.Component {
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

    addGroup = async (e) => {
        e.preventDefault();
        const { values } = this.state;
        if (!values['name']) {
            console.log("name")
            this.setState({
                errorMessage: 'لطفا نام گروه رو وارد کن!'
            })
        }
        else {
            fetch(`http://localhost:4000/api/getGroup/${this.props.username}/${values['name']}`, {
                method: "GET",
                headers: {
                    Accept: "application/json"
                }
            }).then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        if (json) {
                            this.setState({
                                errorMessage: 'گروه با این نام رو قبلاً اضافه کردی!'
                            });
                        }
                        else {
                            try {
                                const data = this.putData(`http://localhost:4000/api/addGroup`,
                                    { username: this.props.username, values: values });
                                data.then(js => js)
                                    .then(js => {
                                        this.props.history.push(`/user/groups`);
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
                <h1>یه گروه جدید اضافه کن!</h1>
                <h3>موارد ستاره‌دار، ضروری هستند.</h3>
                <form className="centerDiv formContainer">
                    <p>نام گروه*</p>
                    <input
                        type="text"
                        required={true}
                        placeholder="نام گروه"
                        className="marginTop"
                        value={this.state.values["name"]}
                        onChange={e => this.handleChange("name", e)}
                    ></input>

                    <p>یادداشتی درمورد این گروه</p>
                    <input
                        type="text"
                        required={false}
                        placeholder="یادداشت"
                        className="marginTop"
                        value={this.state.values["note"]}
                        onChange={e => this.handleChange("note", e)}
                    ></input>

                    <button
                        className="submitButton marginTop"
                        onClick={this.addGroup}>اضافه کن
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

export default withRouter(AddGroupPage);