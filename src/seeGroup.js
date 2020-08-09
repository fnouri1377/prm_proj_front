import React from "react";
import "./index.css";
import { withRouter } from 'react-router-dom';

class SeeGroupPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            group: null
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
                        group: json
                    })
                });
            }
        });
    };

    componentDidMount() {
        this.getGroup(this.props.group_name);
    }

    goToUpdateGroup = () => {
        this.props.history.push(`/user/updateGroup/${this.state.group.name}`);
    }

    deleteGroup = () => {
        fetch(`http://localhost:4000/api/deleteGroup/${this.props.username}/${this.state.group.name}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json"
            }
        }).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    console.log("json = ", json);
                    this.setState({
                        group: null
                    })
                    this.props.history.push(`/user`);
                })
            }
        });
    }

    goToClassification = () => {
        this.props.history.push(`/user/group/${this.state.group.name}/classification`);
    }

    render() {
        return !!this.state.group ? (
            <div>
                <form className="centerDiv formContainer">
                    <p>نام گروه*</p>
                    <input
                        type="text"
                        className="marginTop"
                        value={this.state.group.name}
                        disabled
                    ></input>

                    <p>یادداشتی درمورد این گروه</p>
                    <input
                        type="text"
                        className="marginTop"
                        value={this.state.group.note}
                        disabled
                    ></input>
                </form>

                <div style={{ textAlign: 'center' }}>
                    <button
                        className="submitButton marginTop"
                        style={{ margin: '10px 10px' }}
                        onClick={this.goToUpdateGroup}>ویرایش گروه
			        </button>

                    <button
                        className="submitButton marginTop"
                        style={{ margin: '10px 10px' }}
                        onClick={this.goToClassification}>مشاهده و تغییر گروه‌بندی مخاطبان در این گروه
			        </button>

                    <button
                        className="submitButton marginTop"
                        style={{ margin: '10px 10px' }}
                        onClick={this.deleteGroup}>حذف گروه
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

export default withRouter(SeeGroupPage);