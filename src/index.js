import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./homePage";
import LoginPage from "./loginPage";
import SignupPage from './signupPage';
import UserPage from "./userPage";
import AddContactPage from "./addContactPage";
import AddGroupPage from "./addGroupPage";
import ContactsPage from "./contacts";
import GroupsPage from "./groups";
import SeeGroupPage from "./seeGroup";
import SeeContactPage from "./seeContact";
import UpdateContactPage from "./updateContactPage";
import UpdateGroupPage from "./updateGroupPage";
import ProfilePage from "./profilePage";
import UpdateProfilePage from "./updateProfilePage";
import ClassificationPage from "./classificationPage";
import Verification from "./verification";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			name: '',
			group_name: '',
			contact_name: ''
		};
	}

	setUsername = (username) => {
		console.log('setUsername was called => ', username)
		this.setState({
			username: username,
		})
	}

	setName = (name) => {
		console.log('setName was called => ', name)
		this.setState({
			name: name,
		})
	}

	setGroupName = (name) => {
		console.log('setGroupName was called => ', name);
		this.setState({
			group_name: name
		})
	}

	setContactName = (name) => {
		console.log('setContactName was called => ', name);
		this.setState({
			contact_name: name
		})
	}

	render() {
		if (this.state.username === '') {
			console.log(":)")
			return (
				<Router>
					<Switch>
						<Route exact path="/">
							<HomePage />
						</Route>

						<Route exact path="/login">
							<LoginPage
								setUsername={this.setUsername}
								setName={this.setName}
							/>
						</Route>

						<Route exact path="/signup">
							<SignupPage
								setUsername={this.setUsername}
								setName={this.setName}
							/>
						</Route>

						<Route>
							<Redirect to="/" />
						</Route>
					</Switch>
				</Router>
			)
		}
		else {
			console.log(":)))))")
			return (
				<Router>
					<div>
						<Route exact path="/">
							<HomePage />
						</Route>

						<Route exact path="/login">
							<LoginPage
								setUsername={this.setUsername}
								setName={this.setName}
							/>
						</Route>

						<Route exact path="/signup">
							<SignupPage
								setUsername={this.setUsername}
								setName={this.setName}
							/>
						</Route>

						<Route exact path={`/user`}>
							<UserPage
								setUsername={this.setUsername}
								setName={this.setName}
								username={this.state.username}
								name={this.state.name}
							/>
						</Route>

						<Route exact path={`/user/profile`}>
							<ProfilePage
								setUsername={this.setUsername}
								setName={this.setName}
								username={this.state.username}
								name={this.state.name}
							/>
						</Route>

						<Route exact path={`/user/updateProfile`}>
							<UpdateProfilePage
								setUsername={this.setUsername}
								setName={this.setName}
								username={this.state.username}
								name={this.state.name}
							/>
						</Route>

						<Route exact path={`/user/addContact`}>
							<AddContactPage
								setUsername={this.setUsername}
								setName={this.setName}
								username={this.state.username}
								name={this.state.name}
							/>
						</Route>

						<Route exact path={`/user/contacts`}>
							<ContactsPage
								setUsername={this.setUsername}
								setName={this.setName}
								username={this.state.username}
								name={this.state.name}
								contact_name={this.state.contact_name}
								setContactName={this.setContactName}
							/>
						</Route>

						<Route exact path={`/user/contact/${this.state.contact_name}`}>
							<SeeContactPage
								setUsername={this.setUsername}
								setName={this.setName}
								username={this.state.username}
								name={this.state.name}
								contact_name={this.state.contact_name}
								setContactName={this.setContactName}
							/>
						</Route>

						<Route exact path={`/user/updateContact/${this.state.contact_name}`}>
							<UpdateContactPage
								setUsername={this.setUsername}
								setName={this.setName}
								username={this.state.username}
								name={this.state.name}
								contact_name={this.state.contact_name}
								setContactName={this.setContactName}
							/>
						</Route>

						<Route exact path={`/user/addGroup`}>
							<AddGroupPage
								setUsername={this.setUsername}
								setName={this.setName}
								username={this.state.username}
								name={this.state.name}
							/>
						</Route>

						<Route exact path={`/user/groups`}>
							<GroupsPage
								setUsername={this.setUsername}
								setName={this.setName}
								username={this.state.username}
								name={this.state.name}
								group_name={this.state.group_name}
								setGroupName={this.setGroupName}
							/>
						</Route>

						<Route exact path={`/user/group/${this.state.group_name}`}>
							<SeeGroupPage
								setUsername={this.setUsername}
								setName={this.setName}
								username={this.state.username}
								name={this.state.name}
								group_name={this.state.group_name}
								setGroupName={this.setGroupName}
							/>
						</Route>

						<Route exact path={`/user/updateGroup/${this.state.group_name}`}>
							<UpdateGroupPage
								setUsername={this.setUsername}
								setName={this.setName}
								username={this.state.username}
								name={this.state.name}
								group_name={this.state.group_name}
								setGroupName={this.setGroupName}
							/>
						</Route>

						<Route exact path={`/user/group/${this.state.group_name}/classification`}>
							<ClassificationPage
								setUsername={this.setUsername}
								setName={this.setName}
								username={this.state.username}
								name={this.state.name}
								group_name={this.state.group_name}
								setGroupName={this.setGroupName}
							/>
						</Route>

						<Route exact path={`/user/phoneNumberVerification`}>
							<Verification
								setUsername={this.setUsername}
								setName={this.setName}
								username={this.state.username}
								name={this.state.name}
							/>
						</Route>
					</div>
				</Router>
			);
		}
	}
}

ReactDOM.render(<App />, document.getElementById("root"));