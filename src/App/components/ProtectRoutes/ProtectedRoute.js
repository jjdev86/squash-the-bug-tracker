import React from "react";
import PropTypes from 'prop-types';

import { connect } from "react-redux";

export default function (ComposedComponent) {
  class Authenticate extends React.Component {
    componentDidMount() {
      console.log(this.props.isLoggedIn, `protected route`)
      if (!this.props.isLoggedIn) {
        this.props.history.push('/auth/signin');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

 
  Authenticate.propTypes = {
      isLoggedIn: PropTypes.bool
  }


  function mapStateToProps(state) {
    return {
      isLoggedIn: state.auth.isLoggedIn,
    };
  }
  return connect(mapStateToProps)(Authenticate);
}
