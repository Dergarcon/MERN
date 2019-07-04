import React, { Fragment, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addExperience } from '../../actions/profile'

const AddExperience = ({ addExperience, history }) => {

    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    })

    const [toDateDisabled, toggleDisabled] = useState(false)

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
    } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()
        addExperience(formData, history)
    }



    return <Fragment>
        <h1>Add an Experience!</h1>
        <form onSubmit={e => onSubmit(e)}>
            <div>
                <input type="text" placeholder="Title" name="title" value={title} onChange={e => onChange(e)} />
            </div>
            <div >
                <input type="text" placeholder="Company" name="company" value={company} onChange={e => onChange(e)} />
            </div>
            <div>
                <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)} />
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

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired
}

export default connect(null, { addExperience })(withRouter(AddExperience))