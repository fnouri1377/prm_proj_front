import React from "react";
import "./index.css";
import { withRouter } from 'react-router-dom';

class SeeContactPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: null
        };
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
                });
            }
        });
    };

    componentDidMount() {
        this.getContact(this.props.contact_name);
    }

    goToUpdateContact = () => {
        this.props.history.push(`/user/updateContact/${this.state.contact.name}`);
    }

    deleteContact = () => {
        fetch(`http://localhost:4000/api/deleteContact/${this.props.username}/${this.state.contact.name}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json"
            }
        }).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    console.log("json = ", json);
                    this.setState({
                        contact: null
                    })
                    this.props.history.push(`/user`);
                });
            }
        });
    }

    render() {
        let birthDate = '';
        if (!!this.state.contact) {
            if (!!this.state.contact.birthDate) {
                birthDate = `${this.state.contact.birthDate.substring(5, 7)}/${this.state.contact.birthDate.substring(8, 10)}/${this.state.contact.birthDate.substring(0, 4)}`
            }
        }
        return !!this.state.contact ? (
            <div>
                <form className="centerDiv formContainer">
                    <p>نام مخاطب*</p>
                    <input
                        type="text"
                        className="marginTop"
                        value={this.state.contact.name}
                        disabled
                    ></input>

                    <p>تاریخ تولد مخاطب</p>
                    <input
                        type="text"
                        className="marginTop"
                        value={birthDate}
                        disabled
                    ></input>

                    <p>چند تومان بدهی به این مخاطب داری؟</p>
                    <input
                        type="number"
                        className="marginTop"
                        value={this.state.contact.debt_userToCon}
                        disabled
                    ></input>

                    <p>چند تومان طلب از این مخاطب داری؟</p>
                    <input
                        type="number"
                        className="marginTop"
                        value={this.state.contact.debt_conToUser}
                        disabled
                    ></input>

                    <p>یادداشتی درمورد این مخاطب</p>
                    <input
                        type="text"
                        className="marginTop"
                        value={this.state.contact.note}
                        disabled
                    ></input>

                    <p>چند روز یک بار میخوای به این مخاطب پیام بدی؟</p>
                    <input
                        type="number"
                        className="marginTop"
                        value={this.state.contact.duration_message}
                        disabled
                    ></input>

                    <p>چند روز یک بار میخوای با این مخاطب تماس بگیری؟</p>
                    <input
                        type="number"
                        className="marginTop"
                        value={this.state.contact.duration_call}
                        disabled
                    ></input>

                    <p>چند روز یک بار میخوای این مخاطب رو ببینی؟</p>
                    <input
                        type="number"
                        className="marginTop"
                        value={this.state.contact.duration_meeting}
                        disabled
                    ></input>
                </form>

                <div style={{ textAlign: 'center' }}>
                    <button
                        className="submitButton marginTop"
                        style={{ margin: '10px 10px' }}
                        onClick={this.goToUpdateContact}>ویرایش مخاطب
			        </button>

                    <button
                        className="submitButton marginTop"
                        style={{ margin: '10px 10px' }}
                        onClick={this.deleteContact}>حذف مخاطب
				    </button>

                    <button
                        className="submitButton marginTop"
                        style={{ margin: '10px 10px' }}
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

export default withRouter(SeeContactPage);