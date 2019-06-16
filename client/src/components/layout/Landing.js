import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <div>
            <h1>this is the landing page</h1>
            <Link to="/login">login</Link>
            <Link to="/register">register</Link>
        </div>
    )
}

export default Landing
