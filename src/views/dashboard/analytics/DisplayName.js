import React from 'react';
import { connect } from "react-redux"



const DisplayName  = (props) => {
    return (
        <div>
            {/* 인성api 연결시 */}
            {/* {props.user !== undefined 삼항연산자를 자세히 볼것!!!
              ? "John Doe"
              : props.user.login.values.loggedInUser.displayName} */}
              {props.user.login.values.loggedInUser.displayName }

            {/* i4h api 연결시 */}
            {/* {props.user.login.values.loggedInUser.username } */}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth
    }
}
  
export default connect(mapStateToProps)(DisplayName)