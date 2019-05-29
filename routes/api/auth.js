const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const auth = require('../../middleware/auth')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../../models/User')
const { check, validationResult } = require('express-validator/check')

// @route   GET api/auth
// @desc    Get token
// access   Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.send(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server error' })
    }
})

// @route   GET api/auth
// @desc    Authenticate user and get token
// access   Public
router.post('/', [
    check('email', 'include a valid email').isEmail(),
    check('password', 'fill in password').exists()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    //destructuring
    const { email, password } = req.body

    try {

        let user = await User.findOne(({ email }))
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] })

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'),
            {
                expiresIn: 300000000
            }, (err, token) => {
                if (err) throw err
                res.json({ token })
            })



    } catch (error) {




    }



})


module.exports = router