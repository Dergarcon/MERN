import React, { Fragment, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createProfile } from '../../actions/profile'


const CreateProfile = ({ createProfile, history }) => {

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
        createProfile(formData, history)
    }



    return <Fragment>
        <h1>Create your profile!</h1>
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
            <input type="submit" class="btn btn-primary" value="Submit" />
            <Link to='/dashboard'>Go back</Link>
        </form>
    </Fragment>
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
}




export default connect(null, { createProfile })(withRouter(CreateProfile))
