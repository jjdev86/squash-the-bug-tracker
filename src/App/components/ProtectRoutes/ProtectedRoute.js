import React from "react";
import PropTypes from 'prop-types';

import { connect } from "react-redux";

export default function (ComposedComponent) {
  class Authenticate extends React.Component {
    componentDidMount() {
      if (!this.props.isAuthenticated) {
        // this.props.addFlashMessage({
        //     type: "error",
        //     text: "You need to login to access this page"
        // });
        console.log("need to get authenticated");
        this.props.history.push('/auth/signin');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

 
  Authenticate.propTypes = {
      isAuthenticated: PropTypes.bool
  }


  function mapStateToProps(state) {
    return {
      isAuthenticated: state.loggedIn,
    };
  }
  return connect(mapStateToProps)(Authenticate);
}
