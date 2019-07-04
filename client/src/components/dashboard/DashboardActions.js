import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const DashboardActions = () => {
    return <Fragment>
        <Link to="/edit-profile"><FontAwesomeIcon icon="user-circle" /> Edit Profile</Link><br />
        <Link to="/add-experience"><FontAwesomeIcon icon={['fab', 'black-tie']} /> Add Experience</Link><br />
        <Link to="/add-education"><FontAwesomeIcon icon="graduation-cap" /> Add Education</Link><br />
    </Fragment>
}

export default DashboardActions
