import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

export default class ContactLinkButton extends React.Component {
    render() {
        return (
            <Link
                to={`${this.props.to}${this.props.contact.name}`}
                onClick={() => this.props.seeContact(this.props.contact.name)}
                className={'link marginTop'}
            >
                {this.props.contact.name}
            </Link>
        );
    }
}
