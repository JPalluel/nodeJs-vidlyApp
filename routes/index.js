const express = require ('express');
const router = new express.Router();

router.get('/', (req, res) =>{
    res.render("index", { title: "Hello", message:"How are you"})
})

module.exports = router;