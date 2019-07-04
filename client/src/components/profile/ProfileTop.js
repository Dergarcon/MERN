import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

const ProfileTop = ({profile}) => {
    return <Fragment>
        <h1>Profile Top section:</h1>
        <h4>company: {profile.company}</h4>                
    </Fragment>
}

ProfileTop.propTypes = {
profile: PropTypes.object.isRequired
}

export default ProfileTop