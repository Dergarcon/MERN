import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { login } from '../../actions/auth'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'


const Login = ({ login, setAlert, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    //destructuring
    const { email, password } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()
        login(email, password)
    }

    //Redirect if logged in
    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <Fragment>
            <h1>Sign Up</h1>
            <p><i className="fas fa-user"></i> Sign in to your account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div>
                    <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        value={password}
                        onChange={e => onChange(e)}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    )
}
Login.propTypes = {    
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateTpProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateTpProps, { login })(Login)