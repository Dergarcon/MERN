const express = require('express')
const router = express.Router()
const request = require('request')
const config = require('config')
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const { check, validationResult } = require('express-validator/check')

// @route   GET api/profile/me
// @desc    Get logged in user profile
// access   Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar'])

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' })
        }

        res.send(profile)

    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server error' })
    }
})


// @route   POST api/profile
// @desc    Create or update a profile
// access   Private
router.post('/',
    [auth,
        [
            check('status', 'status is required').not().isEmpty(),
            check('skills', 'skills is required').not().isEmpty()
        ]
    ], async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        //destructuring
        const { company, website, location, status, skills, bio, githubusername, youtube, facebook, twitter, instagram, linkedin, xing } = req.body

        const newProfile = {}
        newProfile.user = req.user.id

        company ? newProfile.company = company : ''
        website ? newProfile.website = website : ''
        location ? newProfile.location = location : ''
        status ? newProfile.status = status : ''
        skills ? newProfile.skills = skills.split(',').map(skill => skill.trim()) : ''
        bio ? newProfile.bio = bio : ''
        githubusername ? newProfile.githubusername = githubusername : ''

        newProfile.social = {}
        youtube ? newProfile.social.youtube = youtube : ''
        twitter ? newProfile.social.twitter = twitter : ''
        facebook ? newProfile.social.facebook = facebook : ''
        linkedin ? newProfile.social.linkedin = linkedin : ''
        instagram ? newProfile.social.instagram = instagram : ''
        xing ? newProfile.social.xing = xing : ''
        try {
            let profile = await Profile.findOne({ user: req.user.id })

            if (profile) {
                // update
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: newProfile },
                    { new: true }
                )
                return res.json(profile)
            }

            // create
            profile = new Profile(newProfile)

            await profile.save()
            res.json(newProfile)

        } catch (err) {
            console.error(err.message)
            res.status(500).json({ msg: 'Server error' })
        }
    })


// @route   GET api/profile
// @desc    Get all Profiles
// access   Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])

        if (!profiles) {
            return res.status(400).json({ msg: 'No profiles found' })
        }

        res.json(profiles)

    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server error' })
    }
})


// @route   GET api/profile/user/:userId
// @desc    Get profile by userId
// access   Public
router.get('/user/:userId', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.userId }).populate('user', ['name', 'avatar'])

        if (profile == null) return res.status(400).json({ msg: 'No profile found' })

        res.json(profile)

    } catch (err) {
        console.error(err.message)
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'No profile found' })
        }

        console.error(err.message)
        res.status(500).json({ msg: 'Server error' })
    }
})


// @route   DELETE api/profile/me
// @desc    Delete logged in users profile and user (later also posts)
// access   Private
router.delete('/', auth, async (req, res) => {
    try {
        await Profile.findOneAndDelete({ user: req.user.id })
        await User.findOneAndDelete({ _id: req.user.id })


        res.json({ msg: 'Profile deleted' })

    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server error' })
    }
})


// @route   PUT api/profile/experience
// @desc    Add profile experience
// access   Private
router.put('/experience',
    [auth,
        [
            check('title', 'title is required').not().isEmpty(),
            check('company', 'company is required').not().isEmpty(),
            check('location', 'location is required').not().isEmpty(),
            check('from', 'from date is required').not().isEmpty()
        ]
    ], async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        //destructuring
        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body

        const newExp = {}

        title ? newExp.title = title : ''
        company ? newExp.company = company : ''
        location ? newExp.location = location : ''
        from ? newExp.from = from : ''
        to ? newExp.to = to : ''
        current ? newExp.current = current : ''
        description ? newExp.description = description : ''

        try {
            const profile = await Profile.findOne({ user: req.user.id })


            profile.experience.unshift(newExp)

            await profile.save()
            return res.json(profile)

        } catch (err) {
            console.error(err.message)
            res.status(500).json({ msg: 'Server error' })
        }
    })


// @route   DELETE api/profile/experience/:expId
// @desc    Remove an experience from profile
// access   Private
router.delete('/experience/:expId',
    auth,
    async (req, res) => {

        try {
            const profile = await Profile.findOne({ user: req.user.id })

            const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.expId)

            profile.experience.splice(removeIndex, 1)

            await profile.save()

            return res.json(profile)

        } catch (err) {
            console.error(err.message)
            res.status(500).json({ msg: 'Server error' })
        }
    })


// @route   PUT api/profile/education
// @desc    Add profile education
// access   Private
router.put('/education',
    [auth,
        [
            check('school', 'school is required').not().isEmpty(),
            check('degree', 'degree is required').not().isEmpty(),
            check('fieldofstudy', 'fieldofstudy is required').not().isEmpty(),
            check('from', 'from date is required').not().isEmpty()
        ]
    ], async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        //destructuring
        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        } = req.body

        const newEdu = {}

        school ? newEdu.school = school : ''
        degree ? newEdu.degree = degree : ''
        fieldofstudy ? newEdu.fieldofstudy = fieldofstudy : ''
        from ? newEdu.from = from : ''
        to ? newEdu.to = to : ''
        current ? newEdu.current = current : ''
        description ? newEdu.description = description : ''

        try {
            const profile = await Profile.findOne({ user: req.user.id })


            profile.education.unshift(newEdu)

            await profile.save()
            return res.json(profile)

        } catch (err) {
            console.error(err.message)
            res.status(500).json({ msg: 'Server error' })
        }
    })


// @route   DELETE api/profile/education/:eduId
// @desc    Remove an education from profile
// access   Private
router.delete('/education/:eduId',
    auth,
    async (req, res) => {

        try {
            const profile = await Profile.findOne({ user: req.user.id })

            const removeIndex = profile.education.map(item => item.id).indexOf(req.params.eduId)

            profile.education.splice(removeIndex, 1)

            await profile.save()

            return res.json(profile)

        } catch (err) {
            console.error(err.message)
            res.status(500).json({ msg: 'Server error' })
        }
    })


// @route   GET api/profile/github/:githubusername
// @desc    get Githubrepos of user
// access   Public
router.get('/github/:githubusername', async (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.githubusername}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        }

        request(options, (error, response, body) => {
            if (error) console.error(error)

            if (response.statusCode !== 200) {
                return response.status(404).json({ msg: 'no github profile found' })
            }
            res.json(JSON.parse(body))
        })

    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server error' })
    }
})







module.exports = router