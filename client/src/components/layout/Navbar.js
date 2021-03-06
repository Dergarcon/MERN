import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'
//imports fontawesome with the library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <ul>
            <li><a onClick={logout} href="#!"><FontAwesomeIcon icon="sign-out-alt" />{' '}<span className='hide-sm'>Logout</span></a></li>
            <li><Link to="/dashboard"><FontAwesomeIcon icon="user" />{' '}<span className='hide-sm'>Dashboard</span></Link></li>
            <li><Link to="/profiles">Developers</Link></li>
        </ul>
    )

    const guestLinks = (
        <ul>
            <li><Link to="/profiles">Developers</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    )

    return (
        <nav>
            <h1><Link to="/">DevConnector</Link></h1>
            {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar)
