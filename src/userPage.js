import React from "react";
import "./index.css";
import { withRouter } from 'react-router-dom';

class UserPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	goToAddContact = () => {
		this.props.history.push(`/user/addContact`);
	}

	seeContacts = () => {
		this.props.history.push(`/user/contacts`);
	}

	goToAddGroup = () => {
		this.props.history.push(`/user/addGroup`);
	}

	seeGroups = () => {
		this.props.history.push(`/user/groups`);
	}

	seeProfile = () => {
		this.props.history.push(`/user/profile`);
	}

	verifyPhoneNumber = () => {
		this.props.history.push(`/user/phoneNumberVerification`);
	}

	logout = () => {
		this.props.setName('')
		this.props.setUsername('')
		this.props.history.push(`/`);
	}

	render() {
		return (
			<div>
				<h3 className="welcomeBox">
					سلام {this.props.name} عزیز، خوش اومدی!
				</h3>

				<button className="logoutButton" onClick={this.goToAddContact}>
					یه مخاطب جدید اضافه کن!
				</button>

				<button className="logoutButton" onClick={this.seeContacts}>
					مخاطب‌هایی که ایجاد کردی رو ببین.
				</button>

				<button className="logoutButton" onClick={this.goToAddGroup}>
					یه گروه جدید اضافه کن!
				</button>

				<button className="logoutButton" onClick={this.seeGroups}>
					گروه‌هایی که ایجاد کردی رو ببین.
				</button>

				<button className="logoutButton" onClick={this.seeProfile}>
					اطلاعات کاربریت رو ببین.
				</button>

				<button className="logoutButton" onClick={this.verifyPhoneNumber}>
					شماره موبایلت رو وارد و تأیید کن.
				</button>

				<button className="logoutButton" onClick={this.logout}>
					خروج
				</button>

				<p>اگر میخوای تاریخ‌های خاص و پیام دادن و تماس گرفتن و ملاقات با مخاطب‌ها بهت یادآوری بشه و تا حالا شماره موبایلت رو ثبت نکردی، باید شماره موبایلت رو وارد و تأیید کنی.</p>
			</div >
		)
	}
}

export default withRouter(UserPage);