import React from 'react';

const DisplayName  = (props) => {
    return (
        <div>
            {props.user.login.values.loggedInUser.displayName}
        </div>
    )
}
export default DisplayName