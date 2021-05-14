import React from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux"
import { history } from "../../../history"

const DisplayName  = (props) => {
    return (
        <Fragment>
            {/* 인성api 연결시 */}
            {/* {props.user !== undefined 삼항연산자를 자세히 볼것!!!
              ? "John Doe"
              : props.user.login.values.loggedInUser.displayName} */}
              {props.user.login.values != null 
                ?props.user.login.values.loggedInUser.username
                :history.push("/")}
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth
    }
}
  
export default connect(mapStateToProps)(DisplayName)