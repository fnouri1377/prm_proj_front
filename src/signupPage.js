import React from "react";
import "./index.css";
import { Link, withRouter } from "react-router-dom";

class SignupPage extends React.Component {
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

	signupAction = async (e) => {
		e.preventDefault();
		const { values } = this.state;
		if (!values['name']) {
			console.log("name")
			this.setState({
				errorMessage: 'لطفا نامت رو وارد کن!'
			})
		}
		else if (!values['username']) {
			console.log("username")
			this.setState({
				errorMessage: 'لطفا نام کاربریت رو وارد کن!'
			})
		}
		else if (!values['password']) {
			console.log("password")
			this.setState({
				errorMessage: 'لطفا رمز عبورت رو وارد کن!'
			})
		}
		else {
			fetch(`http://localhost:4000/api/getUserWithUsername/${values['username']}`, {
				method: "GET",
				headers: {
					"Accept": "application/json"
				}
			})
				.then(response => {
					if (response.ok) {
						response.json().then(json => {
							if (json) {
								this.setState({
									errorMessage: 'این نام کاربری رو شخص دیگه‌ای گرفته!'
								});
							}
							else {
								try {
									const data = this.putData(`http://localhost:4000/api/addUser`, values);
									data.then(json => json)
										.then(json => {
											console.log("addUser json: ", json);
											this.props.setUsername(values['username']);
											this.props.setName(values['name']);
											this.props.history.push(`/user`);
										})
								} catch (err) {
									console.log(err);
								}
							}
						});
					}
				})
		}
	};

	componentDidMount() {
		this.setState({
			values: {},
			errorMessage: ''
		});
	}

	render() {
		return (
			<div className="centerDiv">
				<h1>یه حساب کاربری جدید بساز!</h1>
				<form
					className="centerDiv formContainer">
					<input
						type="text"
						required={true}
						placeholder="نام"
						className="marginTop"
						value={this.state.values["name"]}
						onChange={e => this.handleChange("name", e)}
					></input>

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
						onClick={this.signupAction}>ثبت نام
					</button>
				</form>
				<Link
					to={`/login`}
					className="link">حساب کاربری داری؟ وارد حساب خودت شو!
				</Link>
				<p className="errorMessage">{this.state.errorMessage}</p>
			</div>
		);
	}
}

export default withRouter(SignupPage);