const router = require('express').Router()
const { User, Friend } = require('../../models')

router.get('/', async (req, res) => {
    try {
        const friends = await User.findOne({ _id: req.params.userId})
            .select('')
    } catch(err) {
        console.log(err)
        res.status(500)
    }
})