const { Router } = require('express')
const router = Router();

router.get('/', (req, res) =>{
    res.send("landing page")
})

module.exports = router;