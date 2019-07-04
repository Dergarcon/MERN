import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import ProfileTop from './ProfileTop'
import {getProfileById} from '../../actions/profile'

const Profile = ({getProfileById, profile:{loading, profile}, match, auth}) => {        
    useEffect(() => {        
        getProfileById(match.params.id)
    }, [getProfileById, match.params.id])
    return loading || profile === null ? <Spinner /> : <Fragment>
        <h1>Einzelprofil:</h1>
        <p>Willkommen {profile && profile.company}</p>                            
            {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (<Link to='/edit-profile'>Edit Profile</Link>) }      
            <Link to='/profiles'>Back to Profiles</Link>             
            <ProfileTop profile={profile} />
    </Fragment>
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, {getProfileById}) (Profile)
