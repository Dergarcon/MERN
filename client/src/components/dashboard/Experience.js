import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { removeExperience } from '../../actions/profile'


const Experience = ({ experience, removeExperience }) => {

    const experiences = experience.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {
                    exp.to === null ? (' Now') : <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
                }
            </td>
            <td onClick={e => removeExperience(exp._id)}>Delete<br /></td>
        </tr>

    ))
    return <Fragment>
        <h2>Experience Credentials</h2>
        <table>
            <thead>
                <tr>
                    <th>Company</th>
                    <th>Title</th>
                    <th>Years</th>
                </tr>
            </thead>
            <tbody>
                {experiences}
            </tbody>
        </table>
    </Fragment>
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    removeExperience: PropTypes.func.isRequired
}

export default connect(null, { removeExperience })(Experience)
