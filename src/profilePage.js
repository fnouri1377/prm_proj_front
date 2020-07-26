import React from "react";
import "./index.css";
import { withRouter } from 'react-router-dom';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }

    getUser = () => {
        fetch(`http://localhost:4000/api/getUserWithUsername/${this.props.username}`, {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        }).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    this.setState({ user: json });
                });
            }
        });
    };

    componentDidMount() {
        this.getUser();
    }

    goToUpdateProfile = () => {
        this.props.history.push(`/user/updateProfile`);
    }

    deleteAccount = () => {
        fetch(`http://localhost:4000/api/deleteUser/${this.props.username}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json"
            }
        }).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    console.log("json = ", json);
                    this.props.setUsername('');
                    this.props.history.push('/');
                });
            }
        });
    }

    render() {
        return !!this.state.user ? (
            <div>
                <form className="centerDiv formContainer">
                    <p>نام</p>
                    <input
                        type="text"
                        className="marginTop"
                        value={this.state.user.name}
                        disabled
                    ></input>

                    <p>نام کاربری</p>
                    <input
                        type="text"
                        className="marginTop"
                        value={this.state.user.username}
                        disabled
                    ></input>

                    <p>رمز عبور</p>
                    <input
                        type="text"
                        className="marginTop"
                        value={this.state.user.password}
                        disabled
                    ></input>
                </form>

                <div style={{ textAlign: 'center' }}>
                    <button
                        className="submitButton marginTop"
                        style={{ margin: '10px 10px' }}
                        onClick={this.goToUpdateProfile}>ویرایش اطلاعات کاربری
				    </button>

                    <button
                        className="submitButton marginTop"
                        style={{ margin: '10px 10px' }}
                        onClick={this.deleteAccount}>حذف حساب کاربری
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

export default withRouter(ProfilePage);