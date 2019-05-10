import React from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions";
import StreamForm from "./StreamForm";
import createBrowserHistory from "../../history";

class StreamCreate extends React.Component {
  onSubmit = formValues => {
    this.props.createStream(formValues);
    createBrowserHistory.push("/");
  };

  render() {
    return (
      <div>
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  { createStream }
)(StreamCreate);
