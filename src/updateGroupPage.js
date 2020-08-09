import React from "react";
import "./index.css";
import { withRouter } from 'react-router-dom';

class UpdateGroupPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {},
            errorMessage: '',
            group: null
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

    getGroup = name => {
        console.log("getGroup => name: ", name);
        fetch(`http://localhost:4000/api/getGroup/${this.props.username}/${name}`, {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        }).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    console.log("json = ", json);
                    this.setState({
                        group: json
                    })

                    if (json.name !== undefined && json.name !== null) {
                        const { values } = this.state;
                        this.setState({
                            values: { ...values, name: json.name }
                        });
                    }

                    if (json.note !== undefined && json.note !== null) {
                        const { values } = this.state;
                        this.setState({
                            values: { ...values, note: json.note }
                        });
                    }
                });
            }
        });
    };

    updateGroup = async (e) => {
        e.preventDefault();
        const { values } = this.state;
        if (!values['name']) {
            console.log("name")
            this.setState({
                errorMessage: 'لطفا نام گروه رو وارد کن!'
            })
        }
        else {
            console.log("this.props.username = ", this.props.username);
            console.log("values['name'] = ", values['name']);

            fetch(`http://localhost:4000/api/getGroup/${this.props.username}/${values['name']}`, {
                method: "GET",
                headers: {
                    Accept: "application/json"
                }
            }).then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        if (json && json.name !== this.props.group_name) {
                            this.setState({
                                errorMessage: 'گروه با این نام رو قبلاً اضافه کردی!'
                            });
                        }
                        else {
                            try {
                                const data = this.patchData(`http://localhost:4000/api/updateGroup/${this.props.username}/${this.props.group_name}`, values);
                                // console.log("send to server => ", JSON.stringify(data));
                                data.then(json => json)
                                    .then(json => {
                                        this.props.setGroupName(values['name']);
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
        this.setState({
            values: {},
            errorMessage: ''
        });
        this.getGroup(this.props.group_name);
    }

    render() {
        return !!this.state.group ? (
            <div>
                <h1>گروه رو ویرایش کن!</h1>
                <h3>موارد ستاره‌دار، ضروری هستند.</h3>
                <form className="centerDiv formContainer">
                    <p>نام گروه*</p>
                    <input
                        type="text"
                        required={true}
                        className="marginTop"
                        value={this.state.values["name"]}
                        onChange={e => this.handleChange("name", e)}
                    ></input>

                    <p>یادداشتی درمورد این گروه</p>
                    <input
                        type="text"
                        required={false}
                        className="marginTop"
                        value={this.state.values["note"]}
                        onChange={e => this.handleChange("note", e)}
                    ></input>

                    <button
                        className="submitButton marginTop"
                        onClick={this.updateGroup}>ویرایش
					</button>

                    <button
                        className="submitButton marginTop"
                        onClick={() => this.props.history.push(`/user/group/${this.state.group.name}`)}>انصراف از ویرایش
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

export default withRouter(UpdateGroupPage);