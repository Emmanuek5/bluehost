const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    res.render('web/index.ejs')
})
module.exports = router;