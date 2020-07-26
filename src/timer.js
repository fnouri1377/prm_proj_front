import * as React from "react";
import "./index.css";

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reset: props.reset,
            counter: 59,
            interval: null
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => this.working(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    working = () => {
        if (this.state.counter > 0) {
            this.setState({
                counter: this.state.counter - 1
            });
        }
        else {
            this.setState({
                counter: 59
            });
            this.state.reset();
        }
    }

    render() {
        return (this.state.counter > 9) ?
            (
                <div>
                    <div>00:{this.state.counter}</div>
                </div>
            ) :
            (
                <div>
                    <div>00:0{this.state.counter}</div>
                </div>
            );
    }
}