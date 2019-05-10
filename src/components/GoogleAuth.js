import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", async () => {
      await window.gapi.client.init({
        clientId:
          "671275375720-7eas8demum84tvqgg1k3jdhav1jfk65p.apps.googleusercontent.com",
        scope: "email"
      });

      this.auth = window.gapi.auth2.getAuthInstance();

      this.onAuthChange(this.auth.isSignedIn.get());
      this.auth.isSignedIn.listen(this.onAuthChange);
    });
  }

  //On auth change
  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(
        this.auth.currentUser.get().getId(),
        this.auth.currentUser
          .get()
          .getBasicProfile()
          .getName()
      );
    } else {
      this.props.signOut();
    }
  };
  //dont realllllly need this
  onSignInClick = () => {
    this.auth.signIn();
  };
  //dont realllllly need this
  onSignOutClick = () => {
    this.auth.signOut();
  };

  //Helper method
  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);
