import React from 'react';
import { connect } from "react-redux"



const DisplayName  = (props) => {
    return (
        <div>
            {props.user.login.values.loggedInUser.displayName}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth
    }
}
  
export default connect(mapStateToProps)(DisplayName)