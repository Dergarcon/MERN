import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import ProfileItem from './ProfileItem'
import Spinner from '../layout/Spinner'
import { getProfiles } from '../../actions/profile'
import { connect } from 'react-redux'

const Profiles = ({ profile: { profiles, loading }, getProfiles }) => {
    const allProfiles = profiles.map(userProfile => (
        <ProfileItem key={userProfile._id} userProfile={userProfile} />
    ))
    useEffect(() => {
        getProfiles()
    }, [getProfiles])

    return loading ? <Spinner /> : (
        <Fragment>
            {profiles.length > 0 ? allProfiles : <h4>No profiles found ...</h4>}
        </Fragment>
    )

}

Profiles.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfiles: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles)
