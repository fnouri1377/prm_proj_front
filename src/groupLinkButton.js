import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

export default class GroupLinkButton extends React.Component {
    render() {
        return (
            <Link
                to={`${this.props.to}${this.props.group.name}`}
                onClick={() => this.props.seeGroup(this.props.group.name)}
                className={'link marginTop'}
            >
                {this.props.group.name}
            </Link>
        );
    }
}