import React from "react";
import ReactList from "react-list";
import "./index.css";
import { withRouter } from 'react-router-dom';
import ContactLinkButton from "./contactLinkButton";

class ContactsPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			contacts: [],
			ready: false
		};
	}

	getContacts = () => {
		fetch(`http://localhost:4000/api/getContacts/${this.props.username}`, {
			method: "GET",
			headers: {
				Accept: "application/json"
			}
		}).then(response => {
			if (response.ok) {
				response.json().then(json => {
					this.setState({
						contacts: json,
						ready: true
					});
				});
			}
		});
	};

	seeContact = name => {
		this.props.setContactName(name);
		this.props.history.push(`/user/contact/${name}`);
	}

	renderItem = (index, key) => {
		return (
			<div style={{ textAlign: 'center' }}>
				<ContactLinkButton className={"link"}
					contact={this.state.contacts[index]}
					seeContact={this.seeContact}
					to={"/user/contact/"}
				/><br /><br />
			</div>
		);
	};

	componentDidMount() {
		this.getContacts();
	}

	render() {
		return (this.state.ready === true) ?
			((this.state.contacts.length > 0) ? (
				<div>
					<div>
						<ReactList
							itemRenderer={this.renderItem}
							length={this.state.contacts.length}
							type="uniform"
						/>
					</div>
					<div style={{ textAlign: 'center' }}>
						<button
							className="submitButton marginTop"
							onClick={() => this.props.history.push('/user')}>بازگشت به صفحه اصلی
						</button>
					</div>
				</div>
			)
				:
				(
					<div>
						<p>هیچ مخاطبی وجود نداره!</p>
						<div style={{ textAlign: 'center' }}>
							<button
								className="submitButton marginTop"
								onClick={() => this.props.history.push('/user')}>بازگشت به صفحه اصلی
							</button>
						</div>
					</div>
				)) :
			(
				<div>
					لطفا صبر کنید...
				</div>
			)
	}
}

export default withRouter(ContactsPage);