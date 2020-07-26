import React from "react";
import "./index.css";
import { withRouter } from 'react-router-dom';

class ChangeClassificationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            group: null,
            contacts: null,
            selectedContacts: []
        };
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
                        group: json,
                        selectedContacts: json.contacts
                    })
                });
            }
        });
    };

    getContacts = () => {
        fetch(`http://localhost:4000/api/getContacts/${this.props.username}`, {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        }).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    this.setState({ contacts: json });
                });
            }
        });
    };

    componentDidMount() {
        this.getGroup(this.props.group_name);
        this.getContacts();
    }

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

    addContactToGroup = () => {
        console.log("addContactToGroup, contacts_names = ", this.state.selectedContacts);
        try {
            const data = this.putData(`http://localhost:4000/api/addContactToGroup`, { contacts_names: this.state.selectedContacts, group_name: this.state.group.name, username: this.props.username });
            data.then(js => js)
                .then(js => {
                    console.log("message: ", js.message);
                    this.props.history.push(`/user/group/${this.state.group.name}`);
                })
        } catch (err) {
            console.log(err);
        }
    };

    handleChange = (key, e) => {
        let { selectedContacts } = this.state;
        let value = e.target.value;
        console.log("e.target.value = ", value);
        if (selectedContacts.includes(value)) {
            selectedContacts = selectedContacts.filter(function (val, index, arr) { return val !== value });
        }
        else {
            selectedContacts.push(value);
        }
        this.setState({
            selectedContacts: selectedContacts
        });
        console.log("selectedContacts = ", selectedContacts);
    };

    render() {
        console.log("selectedContacts = ", this.state.selectedContacts);
        return !!this.state.group ? (
            <div>
                <h3>گروه {this.state.group.name}</h3>

                <form>
                    {!!this.state.contacts && this.state.contacts.map((contact, index) => {
                        if (this.state.selectedContacts.includes(contact.name)) {
                            return (
                                <div>
                                    <input type="checkbox" id={contact.name} name={contact.name} value={contact.name} onChange={e => this.handleChange(contact.name, e)} checked />
                                    <label htmlFor={contact.name}>{contact.name}</label><br />
                                </div>
                            )
                        }
                        else {
                            return (
                                <div>
                                    <input type="checkbox" id={contact.name} name={contact.name} value={contact.name} onChange={e => this.handleChange(contact.name, e)} />
                                    <label htmlFor={contact.name}>{contact.name}</label><br />
                                </div>
                            )
                        }
                    })}
                </form>

                <div>
                    <button
                        className="submitButton marginTop"
                        onClick={this.addContactToGroup}>افزودن مخاطب‌ها به گروه
				</button>
                </div>

                <div>
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

export default withRouter(ChangeClassificationPage);