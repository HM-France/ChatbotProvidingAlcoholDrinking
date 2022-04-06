const express = require('express')
const router = express.Router();
const {userDB} = require('../firebase')
router.get('/', (req, res) => {
    return res.json({
        message: 'site online...'
    })
})

router.get('/home', (req, res) => {
    return res.render('index')
})

router.get('/dashboard', async (req, res) => {
    const user = await userDB.get('U1974dfd0db58f41a60db4fb2507f7be4');
    const data = [
        { name: 'item 1' },
        { name: 'item 2' },
        { name: 'item 3' },
        { name: 'item 4' },
        { name: 'item 5' },
    ]
    return res.render('dashboard', { data,user })
})

module.exports = router;