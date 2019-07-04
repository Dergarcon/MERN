import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const ProfileItem = ({ userProfile: { company, location, githubusername, user: { _id, name, avatar } } }) => {
    return <Fragment>{name} - {githubusername} - {location} - {company} <Link to={`/profile/${_id}`}>zum Profil</Link> <br /></Fragment>
}

ProfileItem.propTypes = {

}

export default ProfileItem
