const express = require('express')
const { check, validationResult } = require('express-validator/check')
const router = express.Router()
const User = require('../../models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

// @route   POST api/users
// @desc    Register user
// access   Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'include a valid email').isEmail(),
    check('password', 'password must be at least 5 characters').isLength({ min: 5 }),
    check('password', 'fill in password').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    //destructuring
    const { name, email, password } = req.body

    try {
        //see if user exists
        let user = await User.findOne(({ email }))
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'email already exists' }] })
        }

        const newUser = new User()
        newUser.name = name
        newUser.email = email


        //get users gravatar
        newUser.avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        //encrypt pw        
        const salt = await bcrypt.genSalt(10)
        newUser.password = await bcrypt.hash(password, salt)


        await newUser.save()
        //return jsonwebtoken
        const payload = {
            user: {
                id: newUser.id
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