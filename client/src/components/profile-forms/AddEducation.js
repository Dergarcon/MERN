import React, { Fragment, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addEducation } from '../../actions/profile'

const AddEducation = ({ addEducation, history }) => {

    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    })

    const [toDateDisabled, toggleDisabled] = useState(false)

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
    } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()
        addEducation(formData, history)
    }



    return <Fragment>
        <h1>Add an Education!</h1>
        <form onSubmit={e => onSubmit(e)}>
            <div>
                <input type="text" placeholder="school" name="school" value={school} onChange={e => onChange(e)} />
            </div>
            <div >
                <input type="text" placeholder="degree" name="degree" value={degree} onChange={e => onChange(e)} />
            </div>
            <div>
                <input type="text" placeholder="fieldofstudy" name="fieldofstudy" value={fieldofstudy} onChange={e => onChange(e)} />
            </div>
            <div>
                <input type="date" placeholder="From Date" name="from" value={from} onChange={e => onChange(e)} />
            </div>
            <div>
                <input type="checkbox" name="current" checked={current} value={current} onChange={e => {
                    setFormData({ ...formData, current: !current })
                    toggleDisabled(!toDateDisabled)
                }} /> current?
            </div>
            <div>
                <input type="date" placeholder="To Date" name="to" value={to} onChange={e => onChange(e)} disabled={toDateDisabled ? 'disabled' : ''} />
            </div>

            <div>
                <input type="text" placeholder="description" name="description" value={description} onChange={e => onChange(e)} />
            </div>
            <input type="submit" class="btn btn-primary" value="Submit" />
            <Link to='/dashboard'>Go back</Link>
        </form>
    </Fragment>
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired
}

export default connect(null, { addEducation })(withRouter(AddEducation))