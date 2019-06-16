import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'
import PropTypes from 'prop-types'




const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    //destructuring
    const { name, email, password, password2 } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()
        if (password !== password2) {
            setAlert('passwords do not match', 'danger')
        } else {
            register({ name, email, password })
        }
    }
    //Redirect if logged in
    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <Fragment>
            <h1>Sign Up</h1>
            <p><i class="fas fa-user"></i> Create Your Account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div >
                    <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} />
                </div>
                <div>
                    <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"

                        value={password}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        value={password2}
                        minLength="6"
                        onChange={e => onChange(e)}
                    />
                </div>
                <input type="submit" class="btn btn-primary" value="Register" />
            </form>
            <p class="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    )
}
Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register)
