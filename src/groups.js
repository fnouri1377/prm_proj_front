import React from "react";
import ReactList from "react-list";
import "./index.css";
import { withRouter } from 'react-router-dom';
import GroupLinkButton from "./groupLinkButton";

class GroupsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            ready: false
        };
    }

    getGroups = () => {
        fetch(`http://localhost:4000/api/getGroups/${this.props.username}`, {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        }).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    this.setState({
                        groups: json,
                        ready: true
                    });
                });
            }
        });
    };

    seeGroup = name => {
        this.props.setGroupName(name);
        this.props.history.push(`/user/group/${name}`);
    }

    renderItem = (index, key) => {
        return (
            <div style={{ textAlign: 'center' }}>
                <GroupLinkButton className={"link"}
                    group={this.state.groups[index]}
                    seeGroup={this.seeGroup}
                    to={"/user/group/"}
                /><br /><br />
            </div>
        );
    };

    componentDidMount() {
        this.getGroups();
    }

    render() {
        return (this.state.ready === true) ?
            ((this.state.groups.length > 0) ? (
                <div>
                    <div>
                        <ReactList
                            itemRenderer={this.renderItem}
                            length={this.state.groups.length}
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
            ) :
                (
                    <div>
                        <p>هیچ گروهی وجود نداره!</p>
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

export default withRouter(GroupsPage);