import React, { Fragment, useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createProfile, getCurrentProfile } from '../../actions/profile'


const EditProfile = ({ profile: { profile, loading }, createProfile, history, getCurrentProfile }) => {



    const [formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',
        skills: [],
        bio: '',
        status: '',
        githubusername: '',
        youtube: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        instagram: '',
        xing: ''
    })
    useEffect(() => {
        getCurrentProfile()

        setFormData({
            company: loading || !profile.company ? '' : profile.company,
            website: loading || !profile.website ? '' : profile.website,
            location: loading || !profile.location ? '' : profile.location,
            status: loading || !profile.status ? '' : profile.status,
            skills: loading || !profile.skills ? '' : profile.skills.join(','),
            githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
            bio: loading || !profile.bio ? '' : profile.bio,
            twitter: loading || !profile.social ? '' : profile.social.twitter,
            facebook: loading || !profile.social ? '' : profile.social.facebook,
            linkedin: loading || !profile.social ? '' : profile.social.linkedin,
            youtube: loading || !profile.social ? '' : profile.social.youtube,
            instagram: loading || !profile.social ? '' : profile.social.instagram,
            xing: loading || !profile.social ? '' : profile.social.xing
        })


    }, [loading, getCurrentProfile])


    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        instagram,
        twitter,
        linkedin,
        xing
    } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()
        createProfile(formData, history, true)
    }



    return <Fragment>
        <h1>Update your profile!</h1>
        <form onSubmit={e => onSubmit(e)}>
            <div>
                <select name="status" value={status} onChange={e => onChange(e)}>
                    <option value="0">* Select Professional Status</option>
                    <option value="Developer">Developer</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Student or Learning">Student or Learning</option>
                    <option value="Instructor">Instructor or Teacher</option>
                    <option value="Intern">Intern</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div >
                <input type="text" placeholder="Company" name="company" value={company} onChange={e => onChange(e)} />
            </div>
            <div>
                <input type="text" placeholder="Website" name="website" value={website} onChange={e => onChange(e)} />
            </div>
            <div>
                <input type="text" placeholder="location" name="location" value={location} onChange={e => onChange(e)} />
            </div>

            <div>
                <input type="text" placeholder="skills" name="skills" value={skills} onChange={e => onChange(e)} />
            </div>
            <div>
                <input type="text" placeholder="bio" name="bio" value={bio} onChange={e => onChange(e)} />
            </div>
            <div>
                <input type="text" placeholder="githubusername" name="githubusername" value={githubusername} onChange={e => onChange(e)} />
            </div>

            <h2>Social</h2>
            <div>
                <input type="text" placeholder="youtube" name="youtube" value={youtube} onChange={e => onChange(e)} />
            </div>
            <div>
                <input type="text" placeholder="twitter" name="twitter" value={twitter} onChange={e => onChange(e)} />
            </div>
            <div>
                <input type="text" placeholder="facebook" name="facebook" value={facebook} onChange={e => onChange(e)} />
            </div>
            <div>
                <input type="text" placeholder="linkedin" name="linkedin" value={linkedin} onChange={e => onChange(e)} />
            </div>
            <div>
                <input type="text" placeholder="instagram" name="instagram" value={instagram} onChange={e => onChange(e)} />
            </div>
            <div>
                <input type="text" placeholder="xing" name="xing" value={xing} onChange={e => onChange(e)} />
            </div>
            <input type="submit" class="btn btn-primary" value="Register" />

            <Link to='/dashboard'>Go back</Link>
        </form>
    </Fragment>
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile
})


export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile))
