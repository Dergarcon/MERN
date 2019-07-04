import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { removeEducation } from '../../actions/profile'


const Education = ({ education, removeEducation }) => {
    const educations = education.map(edu => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>{edu.fieldofstudy}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{edu.from}</Moment> - {
                    edu.to === null ? (' Now') : <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
                }
            </td>
            <td>{edu.description}</td>
            <td onClick={e => removeEducation(edu._id)}>Delete<br /></td>
        </tr>

    ))
    return <Fragment>
        <h2>Education Credentials</h2>
        <table>
            <thead>
                <tr>
                    <th>School</th>
                    <th>Degree</th>
                    <th>Field of Study</th>
                    <th>Years</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {educations}
            </tbody>
        </table>
    </Fragment>
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    removeEducation: PropTypes.func.isRequired
}

export default connect(null, { removeEducation })(Education)
