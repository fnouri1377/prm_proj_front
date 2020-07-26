import React from "react";
import "./index.css";
import { Link, withRouter } from 'react-router-dom';

class LoginPage extends React.Component {
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
			errorMessage: "",
		});
	};

	putData = async (url = '', data = {}) => {
		const response = await fetch(url, {
			method: 'PUT',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			body: JSON.stringify(data)
		});
		return await response.json();
	}

	loginAction = async (e) => {
		e.preventDefault();
		const { values } = this.state;
		if (!values['username']) {
			this.setState({
				errorMessage: 'لطفا نام کاربریت رو وارد کن!'
			})
		}
		else if (!values['password']) {
			this.setState({
				errorMessage: 'لطفا رمز عبورت رو وارد کن!'
			})
		}
		else {
			fetch(`http://localhost:4000/api/auth/${values['username']}/${values['password']}`, {
				method: "GET",
				headers: {
					Accept: "application/json"
				}
			}).then(response => {
				if (response.ok) {
					response.json().then(json => {
						if (json.message === 'login') {
							console.log("auth result: ", json.message);
							this.props.setUsername(values['username']);
							this.props.setName(json.user.name);
							this.props.history.push(`/user`);
						}
						else if (json.message === 'not existed') {
							this.setState({
								errorMessage: 'حسابی با این نام کاربری در سیستم وجود نداره!'
							});
						}
						else {
							this.setState({
								errorMessage: 'نام کاربری یا رمز عبورت نادرسته!'
							});
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
			<div className="centerDiv">
				<h1>وارد حساب کاربری خودت شو!</h1>
				<form className="centerDiv formContainer">
					<input
						type="text"
						required={true}
						placeholder="نام کاربری"
						className="marginTop"
						value={this.state.values["username"]}
						onChange={e => this.handleChange("username", e)}
					></input>

					<input
						type="password"
						required={true}
						placeholder="رمز عبور"
						className="marginTop"
						value={this.state.values["password"]}
						onChange={e => this.handleChange("password", e)}
					></input>

					<button
						className="submitButton marginTop"
						onClick={this.loginAction}>ورود
					</button>
				</form>
				<Link
					to={`/signup`}
					className="link">حساب کاربری نداری؟ یه حساب جدید بساز!
				</Link>
				<p className="errorMessage">{this.state.errorMessage}</p>
			</div>
		);
	}
}

export default withRouter(LoginPage);